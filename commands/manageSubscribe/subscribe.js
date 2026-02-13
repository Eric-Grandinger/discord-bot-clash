const fs = require('fs');
const path = './subscribers.json';
const { SlashCommandBuilder, userMention } = require('discord.js');
const { readJson, writeToJson } = require('../../utils/jsonUtils.js');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('subscribe').setDescription('Subscribe to get notified about upcoming events'),
	async execute(interaction) {
		const config = require(path);
		// TODO
		// retrieve name
		// check if the name is contained in json file
		// if not write it to the jason file
		// send message to confirm
		const result = await readJson('../../utils/test.json');
		// await interaction.reply(userMention(interaction.user.id));
		await interaction.reply(result);
	},
};
