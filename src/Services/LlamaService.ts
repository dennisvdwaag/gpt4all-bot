import type { LLama, LlamaInvocation } from '@llama-node/llama-cpp';
import type { LLM } from 'llama-node';
import type { LoadConfig, TokenizeArguments } from 'llama-node/dist/llm/llama-cpp';

class LlamaService
{
    private model = '../files/models/ggml-vic7b-uncensored-q5_1.bin';
    private llama: LLM<LLama, LoadConfig, LlamaInvocation, LlamaInvocation, TokenizeArguments>;
    private config = {
        path: this.model,
        enableLogging: true,
        nCtx: 1024,
        nParts: -1,
        seed: 0,
        f16Kv: false,
        logitsAll: false,
        vocabOnly: false,
        useMlock: false,
        embedding: false,
        useMmap: true,
    };

    async initLlama() {
        const { LLamaCpp } = await import('llama-node/dist/llm/llama-cpp.cjs');
        const { LLM } = await import('llama-node');

        this.llama = new LLM(LLamaCpp);
        await this.llama.load(this.config);
    }

    async addPrompt() {
        const template = `How are you?`;
        const prompt = `Who is Donald Trump?`;

        await this.llama.createCompletion(
            {
                nThreads: 8,
                nTokPredict: 2048,
                topK: 40,
                topP: 0.1,
                temp: 0.2,
                repeatPenalty: 1,
                prompt,
            },
            (response) => {
                process.stdout.write(response.token);
            }
        );
    }
}

export default LlamaService;
