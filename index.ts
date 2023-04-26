import TyrController from './src/Controllers/TyrController';
import * as dotenv from 'dotenv';

dotenv.config();

const tyr = new TyrController(process.env.BOT_TOKEN, process.env.CLIENT_ID, process.env.VIKING_GUILD_ID);
tyr.init();