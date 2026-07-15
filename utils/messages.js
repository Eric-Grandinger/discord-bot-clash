const { Events, MessageFlags, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const channelId = process.env.DISCORD_CHANNEL_ID;
const { saveError, getAllSubscribersAsync, getTournamentData } = require('../database/db.js');

let client;
// Creating buttons https://www.mambahost.com/tools/discord-bot/button-builder/
function init(_client) {
	client = _client;
}
async function notifyWeek() {
	try {

		const channel = await client.channels.fetch(channelId);
		await channel.send('this is a strong message ');
	}
	catch (error) {
		console.error('Failed to send ready message:', error);
	}
}
async function notifyhour() {

}
async function notifyNewClash(idOfClash) {
	try {
		const users = await getAllSubscribersAsync();
		const mentions = users.map(user => `<@${user.userId}>`).join(' ');

		const clashData = await getTournamentData(idOfClash);
		const startTime = new Date(clashData.startTime).toLocaleString();
		const registrationTime = new Date(clashData.registrationTime).toLocaleString();

		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder()
				.setCustomId('clash_signup , ' + idOfClash)
				.setLabel('Sign up')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('clash_playersSigneup, ' + idOfClash)
				.setLabel('Who are playing?')
				.setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
				.setCustomId('clash_decline')
				.setLabel('Can\'t make it')
				.setStyle(ButtonStyle.Danger),
		);// Secondary
		const embed = new EmbedBuilder()
			.setColor(0x5865f2)
			.addFields(
				{ name: 'Lock in starts', value: registrationTime, inline: true },
				{ name: 'Lock in ends', value: startTime, inline: true },
				{ name: 'Notifying', value: mentions },
			)
			.setTitle(clashData.nameKey)
			.setImage('https://oyster.ignimgs.com/wordpress/stg.ign.com/2018/05/LOL-Clash.png')
		;
		const channel = await client.channels.fetch(channelId);
		await channel.send({
			components: [row],
			embeds:[embed],
		});
	}
	catch (error) {
		saveError('In scheduler.js notifyNewClash', error);
	}
}
module.exports = {
	init,
	notifyWeek,
	notifyhour,
	notifyNewClash,
};
