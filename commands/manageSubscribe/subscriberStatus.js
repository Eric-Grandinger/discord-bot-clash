const fs = require('fs');
const path = './subscribers.json';
const { SlashCommandBuilder, userMention } = require('discord.js');
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder().setName('subscriber-status').setDescription('Get your subscriber status'),
	async execute(interaction) {
		// TODO
		// retrieve name
		// check if the name is contained in json file
		// if not
		  // You are not subscribing
		// if TURE
		  // You are subscribing
		// send message to confirm
		await interaction.reply(userMention(interaction.user.id));
		// const temp = false;
		 // temp ? await interaction.reply(userMention(interaction.user.id)) : await interaction.reply(userMention(interaction.user.id));
	},
};
