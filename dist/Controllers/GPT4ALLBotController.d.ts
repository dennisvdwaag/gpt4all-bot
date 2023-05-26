declare class GPT4ALLBotController {
    private client;
    private ws;
    private rest;
    private messageController;
    private llamaService;
    constructor(botToken?: string, clientId?: string);
    init(): Promise<void>;
}
export default GPT4ALLBotController;
