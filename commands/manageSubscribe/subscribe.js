const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { readJson, writeToJson } = require('../../utils/jsonUtils.js');

// eslint-disable-next-line no-inline-comments
const path = 'utils/test.json'; // TOOD make it work in multiple guilds
async function write(data) {
	const success = await writeToJson(path, data);
	return success
		? 'you are now subscribed'
		: 'There was an error writing to the file';
}
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('subscribe').setDescription('Subscribe to get notified about upcoming events'),
	async execute(interaction) {
		let message;
		const result = await readJson(path);

		if (!result.exists) {
			message = await write([interaction.user.id]);
		}
		else if (result.data.includes(interaction.user.id)) {
			message = 'you are already subscribed';
		}
		else {
			result.data.push(interaction.user.id);
			message = await write(result.data);
		}
		return interaction.reply({
			content: message,
			flags: MessageFlags.Ephemeral,
		});
	},
};
