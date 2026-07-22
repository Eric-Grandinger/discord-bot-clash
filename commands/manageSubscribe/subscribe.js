const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { signeUpForNotifications, isUserSignedUpForNotifications } = require('../../database/db.js');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('subscribe').setDescription('Subscribe to get notified about upcoming events'),
	async execute(interaction) {
		let message;
		if (await (isUserSignedUpForNotifications(interaction.user.id))) {
			message = 'you are already subscribed';
		}
		else {
			await signeUpForNotifications(interaction.user.id);
			message = 'you are now subscribed';
		}
		return interaction.reply({
			content: message,
			flags: MessageFlags.Ephemeral, // Only the user whom sent can see this response
		});
	},
};
