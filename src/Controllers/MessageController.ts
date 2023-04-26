import { GatewayDispatchEvents, Client } from '@discordjs/core';
import DiscordHelpers, { EmbedVariant } from '../Helpers/DiscordHelpers';

class MessageController
{
    private client: Client;
    private clientId: string;
    private discordHelpers: DiscordHelpers;

    constructor(client: Client, clientId: string) {
        this.client = client;
        this.clientId = clientId;
        this.discordHelpers = new DiscordHelpers();
    }

    listener() {
        this.client.on(GatewayDispatchEvents.MessageCreate, async ({ data: { attachments, channel_id, author, ...rest }, api }) => {
            // If message is send by Tyr, ignore.
            if (author.id === this.clientId) return;

            console.log(rest);

            // Check if there are attachments
            if (attachments.length === 0) {
                await api.channels.createMessage(channel_id, { embeds: [
                    this.discordHelpers.createEmbed(
                        'Oops, something went wrong!',
                        'No attachment found, please add your .PBO file(s).',
                        EmbedVariant.DANGER,
                    )
                ] });
                return;
            }
        });
    }
}

export default MessageController;
