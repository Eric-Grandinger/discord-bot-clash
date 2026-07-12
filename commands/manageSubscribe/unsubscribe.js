const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { optOutForNotifications, isUserSignedUpForNotifications } = require('../../database/db.js');
let message;
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('unsubscribe').setDescription('Stop receiving notifications'),
	async execute(interaction) {
		if (await (isUserSignedUpForNotifications(interaction.user.id))) {
			await optOutForNotifications(interaction.user.id);
			message = 'you are now unsubscribed';
		}
		else {
			message = 'you are already unsubscribed';
		}
		return interaction.reply({
			content: message,
			flags: MessageFlags.Ephemeral,
		});
	},
};
