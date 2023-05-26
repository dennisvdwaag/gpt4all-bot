import { GPT4All } from "gpt4all";
declare class ConversationController {
    startConversation(): Promise<GPT4All>;
    sendPromp(conversation: GPT4All, prompt: string): Promise<string>;
    closeConversation(conversation: GPT4All): Promise<void>;
}
export default ConversationController;
