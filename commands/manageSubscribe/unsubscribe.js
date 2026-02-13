const fs = require('fs');
const path = './subscribers.json';
const { SlashCommandBuilder, userMention } = require('discord.js');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('unsubscribe').setDescription('Stop receiving notifications'),
	async execute(interaction) {
		const username = interaction.user.username;
		// IMPOIRANT remember to save the id not name
		// TODO
		// retrieve name
		// check if the name is contained in json file
		  // if not do nothing
		  // if true remove the name from the jason-file
		// send message to confirm
		await interaction.reply(userMention(interaction.user.id));
	},
};
