# discord-bot-clash
> This project is under development.

A Discord bot that notifies server members about upcoming **League of Legends Clash** tournaments. The bot will accomplish this by utilising the Riot Games API.
If a member chooses to subscribe they will receive:
- A notification one week in advance.
- A reminder one hour before the start of Clash.

To handle subscription status following commands will be utilized.
- /subscribe
  - Receive notifications.
- /unsubscribe
  - Stop receiving notifications.
- /subscriber-status
  - Recive your subscription status.  

Built with **Node.js** and **discord.js**, based on the structure from the official guide:
https://discordjs.guide/legacy/

---
## Stack 
- Node.js 
- Discord.js
- sqlite 
- Riot Games API (League of Legends)
- Environment configuration via dotenv

---
## Environment Variables
To be able to use the bot a .env file needs to be created in the root directory. Copy the following and paste it.
~~~ 
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_id
GUILD_ID=your_test_server_id
RIOT_API_KEY=your_riot_api_key
~~~

