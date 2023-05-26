const LLamaCppPackage = await import('llama-node/dist/llm/llama-cpp.js');
const LlamaNodePackage = await import('llama-node');
class LlamaService {
    model = '../../files/models/ggml-vic13b-uncensored-q4_2.bin';
    llama = new LlamaNodePackage.LLM(LLamaCppPackage.LLamaCpp);
    config = {
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
    constructor() {
        this.llama.load(this.config);
    }
    addPrompt() {
        const template = `How are you?`;
        const prompt = `A chat between a user and an assistant.
        USER: ${template}
        ASSISTANT:`;
        // this.llama.createCompletion(
        //     {
        //         nThreads: 4,
        //         nTokPredict: 2048,
        //         topK: 40,
        //         topP: 0.1,
        //         temp: 0.2,
        //         repeatPenalty: 1,
        //         prompt,
        //     },
        //     (response) => {
        //         process.stdout.write(response.token);
        //     }
        // );
    }
}
export default LlamaService;
//# sourceMappingURL=LlamaService.js.map