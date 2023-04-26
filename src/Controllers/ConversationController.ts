import { GPT4All } from "gpt4all";

class ConversationController
{
    async startConversation() {
        const conversation = new GPT4All('gpt4all-lora-unfiltered-quantized', true); // Default is 'gpt4all-lora-quantized' model
  
        // Initialize and download missing files
        await conversation.init();
        
        // Open the connection with the model
        await conversation.open();

        // Return the open conversation
        return conversation;
    }

    async sendPromp(conversation: GPT4All, prompt: string) {
        // Add new prompt to converstion
        return await conversation.prompt(prompt);
    }

    async closeConversation(conversation: GPT4All) {
        // Close conversation
        conversation.close();
    }
}

export default ConversationController;
