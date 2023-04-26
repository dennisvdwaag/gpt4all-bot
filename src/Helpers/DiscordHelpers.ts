import { EmbedBuilder } from 'discord.js';

export enum EmbedVariant {
    SUCCESS = 'success',
    INFO = 'info',
    DANGER = 'danger'
}

class DiscordHelpers
{
    createEmbed(title: string, description: string, variant: EmbedVariant = EmbedVariant.INFO) {
        let color = 0x0099FF;
        switch (variant) {
            case EmbedVariant.DANGER:
                color = 0xE74C3C;
                break;
            
            case EmbedVariant.SUCCESS:
                color = 0x2ECC71;
                break;

            case EmbedVariant.INFO:
                color = 0x0099FF;
                break;             
        }

        const attachmentEmbed = new EmbedBuilder()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
        ;

        return attachmentEmbed.data;
    }
}

export default DiscordHelpers;
