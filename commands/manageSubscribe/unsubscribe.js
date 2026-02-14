const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { readJson, writeToJson } = require('../../utils/jsonUtils.js');
const path = 'utils/test.json'; // TOOD make it work in multiple guilds
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('unsubscribe').setDescription('Stop receiving notifications'),
	async execute(interaction) {
		const result = await readJson(path);
		if (!result.exists || !result.data.includes(interaction.user.id)) {
			message = 'You are already unsubscribed';
		}
		else if (result.data.includes(interaction.user.id)) {
			const index = result.data.indexOf(interaction.user.id);
			if (index > -1) {
				result.data.splice(index, 1);
			}
			message = await writeToJson(path, result.data) ? 'You are now unsubscribed' : 'There was an error writing to the file';
		}
		return interaction.reply({
			content: message,
			flags: MessageFlags.Ephemeral,
		});
	},
};
