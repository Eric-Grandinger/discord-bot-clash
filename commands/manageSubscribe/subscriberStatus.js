const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { readJson } = require('../../utils/jsonUtils.js');

const path = 'utils/test.json'; // TOOD make it work in multiple guilds
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('subscriber-status').setDescription('Get your subscriber status'),
	async execute(interaction) {
		const result = await readJson(path);
		return interaction.reply({
			content:result.data.includes(interaction.user.id) ? 'You are subscribed 🟩' : 'You are not subscribed 🟥',
			flags: MessageFlags.Ephemeral,
		});
	},
};
