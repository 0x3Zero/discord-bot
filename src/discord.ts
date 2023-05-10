import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

export enum CustomEvents {
	NewTransactions = 'CE_New_Transactions',
}

const discord = new Client({ intents: GatewayIntentBits.Guilds });

const CHANNELS_TO_SEND_MESSAGE = ['first-bot-testroom'];

discord.on(
	`${CustomEvents.NewTransactions}`,
	async (timestamp: string | null) => {
		CHANNELS_TO_SEND_MESSAGE.forEach((name) => {
			let found = discord.guilds.client.channels.cache.find(
				//@ts-ignore
				(channel) => channel.name === name
			);

			if (!found) return;

			const channel = discord.channels.cache.get(found.id);

			//@ts-ignore
			channel.send(`hi@${timestamp}`);
		});
	}
);

discord.once(Events.ClientReady, async (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

discord.login(process.env.DISCORD_BOT_TOKEN);

export default discord;
