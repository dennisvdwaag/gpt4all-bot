import GPT4ALLBotController from './Controllers/GPT4ALLBotController';
import * as dotenv from 'dotenv';

dotenv.config();

const GPT4ALLBot = new GPT4ALLBotController(process.env.BOT_TOKEN, process.env.CLIENT_ID);
GPT4ALLBot.init();