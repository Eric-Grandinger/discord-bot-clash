const { Events, MessageFlags, ButtonBuilder, ButtonStyle } = require('discord.js');
const channelId = process.env.DISCORD_CHANNEL_ID;
let client;

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
