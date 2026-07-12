const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { isUserSignedUpForNotifications } = require('../../database/db.js');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('subscriber-status').setDescription('Get your subscriber status'),
	async execute(interaction) {
		const userIsSignedUp = await isUserSignedUpForNotifications(interaction.user.id);
		return interaction.reply({
			content: userIsSignedUp ? 'You are subscribed 🟩' : 'You are not subscribed 🟥',
			flags: MessageFlags.Ephemeral,
		});
	},
};
