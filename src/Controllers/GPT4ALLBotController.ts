import { Client, GatewayDispatchEvents, GatewayIntentBits } from '@discordjs/core';
import { WebSocketManager } from '@discordjs/ws';
import { REST } from 'discord.js';
import dotenv from 'dotenv';
import MessageController from './MessageController';

class GPT4ALLBotController
{
    private client: Client;
    private ws: WebSocketManager;
    private rest: REST;
    private messageController: MessageController;

    constructor(botToken?: string, clientId?: string) {
        dotenv.config();

        if (!botToken) {
            console.error('No bot token declared in .env file.');
            return;
        }
        
        if (!clientId) {
            console.error('No client ID declared in .env file.');
            return;
        }

        this.rest = new REST({ version: '10' }).setToken(botToken);
        this.ws = new WebSocketManager({
            token: botToken,
            intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent | GatewayIntentBits.GuildMessageReactions,
            rest: this.rest,
        });

        this.client = new Client({
            rest: this.rest,
            ws: this.ws,
        });

        this.messageController = new MessageController(this.client, clientId);
    }

    async init() {
        this.client.once(GatewayDispatchEvents.Ready, () => console.log('Týr is up and running!'));
        this.messageController.listener();
        this.ws.connect();
    }
}

export default GPT4ALLBotController;
