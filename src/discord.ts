import { Client, Events, GatewayIntentBits } from 'discord.js';
import { Get_success_transactionsResult } from './_aqua/transactions.js';
import dotenv from 'dotenv';
dotenv.config();

export enum CustomEvents {
	NewTransactions = 'CE_New_Transactions',
}

type Transaction = Pick<
	Get_success_transactionsResult,
	'transactions'
>['transactions'][0];

const discord = new Client({ intents: GatewayIntentBits.Guilds });

const CHANNELS_TO_SEND_MESSAGE = ['first-bot-testroom', 'new-beats'];

discord.on(`${CustomEvents.NewTransactions}`, async (tx: Transaction[]) => {
	CHANNELS_TO_SEND_MESSAGE.forEach((name) => {
		let found = discord.guilds.client.channels.cache.find(
			//@ts-ignore
			(channel) => channel.name === name
		);

		if (!found) return;

		const channel = discord.channels.cache.get(found.id);

		let unique: Transaction[] = tx.filter(
			(obj: Transaction, index: number, self: Transaction[]) =>
				index === self.findIndex((t) => t.token_id === obj.token_id)
		);

		unique.forEach((tx) => {
			//@ts-ignore
			channel.send(`New beat has been added to Collabeat #${tx.token_id}`);

			// remixed
			// channel.send(`Sheet ${tx.token_id} has been remixed from Sheet ${tx.token_id} by ${tx.public_key} `)

			// bookmarked
			// channel.send(`Sheet ${tx.token_id} has been bookmarked by ${tx.public_key} `)
		});
	});
});

discord.once(Events.ClientReady, async (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

discord.login(process.env.DISCORD_BOT_TOKEN);

export default discord;
