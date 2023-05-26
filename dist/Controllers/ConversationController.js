import { GPT4All } from "gpt4all";
class ConversationController {
    async startConversation() {
        const conversation = new GPT4All('gpt4all-lora-unfiltered-quantized', true); // Default is 'gpt4all-lora-quantized' model
        // Initialize and download missing files
        await conversation.init();
        // Open the connection with the model
        await conversation.open();
        // Return the open conversation
        return conversation;
    }
    async sendPromp(conversation, prompt) {
        // Add new prompt to conversation
        return await conversation.prompt(prompt);
    }
    async closeConversation(conversation) {
        // Close conversation
        conversation.close();
    }
}
export default ConversationController;
//# sourceMappingURL=ConversationController.js.map