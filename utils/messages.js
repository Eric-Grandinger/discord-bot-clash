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
		const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const clashData = await getTournamentData(idOfClash);
		const d = new Date(clashData.startTime);

		const registrationTime = new Date(clashData.registrationTime).toLocaleTimeString();
		const startTime = d.toLocaleTimeString();
		const weekdayOfClash = weekday[d.getDay()];
		const clashDate = d.toLocaleDateString();

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

		);
		const embed = new EmbedBuilder()
			.setColor(0x5865f2)
			.addFields(
				{ name: 'Day / Date', value: weekdayOfClash + ' : ' + clashDate, inline: true },
				{ name: 'Lock in starts / ends', value: `${registrationTime} → ${startTime}`, inline: true },
				{ name: 'Notifying', value: mentions, inline: false },
			)
			.setTitle(clashData.nameKey)
			.setImage('https://oyster.ignimgs.com/wordpress/stg.ign.com/2018/05/LOL-Clash.png')// TODO Use theam id to get a URL or stored image. If no id use this image
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
