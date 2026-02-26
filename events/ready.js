const { Events } = require('discord.js');
const channelId = process.env.DISCORD_CHANNEL_ID;
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		// TODO should i start the timer for fetch data her
		try {
			const channel = await client.channels.fetch(channelId);
			await channel.send('Bot is online');
		}
		catch (error) {
			console.error('Failed to send ready message:', error);
		}
	},
};
