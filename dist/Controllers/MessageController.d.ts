import { Client, API } from '@discordjs/core';
import * as discord_api_types_v10 from 'discord-api-types/v10';
declare class MessageController {
    private client;
    private clientId;
    private conversationController;
    private openThreads;
    constructor(client: Client, clientId: string);
    listeners(): void;
    newMessageListener(): void;
    threadConversation(thread: discord_api_types_v10.APIThreadChannel, api: API): Promise<void>;
    deleteThreadListener(): void;
}
export default MessageController;
