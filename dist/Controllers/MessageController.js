import { GatewayDispatchEvents } from '@discordjs/core';
import { ChannelType } from '../../node_modules/discord-api-types/payloads/v10/index';
import ConversationController from './ConversationController';
class MessageController {
    client;
    clientId;
    conversationController;
    openThreads;
    constructor(client, clientId) {
        this.client = client;
        this.clientId = clientId;
        this.conversationController = new ConversationController();
        this.openThreads = [];
    }
    listeners() {
        this.newMessageListener();
        this.deleteThreadListener();
    }
    newMessageListener() {
        this.client.on(GatewayDispatchEvents.MessageCreate, async ({ data: { channel_id, author, id: messageId }, api }) => {
            // If message is send by bot, ignore.
            if (author.id === this.clientId)
                return;
            // Get current channel
            const currentChannel = await api.channels.get(channel_id);
            // Check if channel type is a public thread, don't open new conversation if exists
            if (currentChannel.type === ChannelType.PublicThread) {
                this.threadConversation(currentChannel, api);
                return;
            }
            // Open thread if one does not exist yet
            const message = await api.channels.getMessage(channel_id, messageId);
            const thread = await api.threads.create(channel_id, { name: message.content, type: ChannelType.PublicThread }, messageId);
            await this.threadConversation(thread, api);
        });
    }
    async threadConversation(thread, api) {
        // Check if thread has a last message, since this can be undefined.
        if (!thread.last_message_id)
            return;
        // Show the bot typing, so the user knows it's doing something
        api.channels.showTyping(thread.id);
        // Get first message and define the conversation variable
        const existingThread = this.openThreads.find((openThread) => openThread.threadId === thread.id);
        let conversation;
        // If this thread is not in the openThreads variable yet, open new conversation and save to the memory array.
        // Else just load the existing conversation
        if (!existingThread) {
            conversation = await this.conversationController.startConversation();
            this.openThreads.push({
                threadId: thread.id,
                conversation: conversation,
            });
        }
        else {
            conversation = existingThread.conversation;
        }
        // Get last message in thread and set answer variable
        const lastMessage = await api.channels.getMessage(thread.id, thread.last_message_id);
        let answer;
        // If the last message author ID is equal to the bot client ID, it means the thread has just been openen. Get the reference message content
        // Else, get the content of the actual message
        if (lastMessage.author.id === this.clientId && lastMessage.referenced_message) {
            answer = await this.conversationController.sendPromp(conversation, lastMessage.referenced_message.content);
        }
        else {
            answer = await this.conversationController.sendPromp(conversation, lastMessage.content);
        }
        await api.channels.createMessage(thread.id, { content: answer });
    }
    deleteThreadListener() {
        this.client.on(GatewayDispatchEvents.ThreadDelete, async ({ data: { id: threadId } }) => {
            const openThread = this.openThreads.find((openThread) => openThread.threadId === threadId);
            if (!openThread)
                return;
            const openThreadIndex = this.openThreads.indexOf(openThread);
            // Close conversation with GPT4ALL
            await this.conversationController.closeConversation(openThread.conversation);
            // Remove open thread from memory array
            this.openThreads.splice(openThreadIndex, 1);
        });
    }
}
export default MessageController;
//# sourceMappingURL=MessageController.js.map