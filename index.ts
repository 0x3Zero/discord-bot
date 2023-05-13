import express from 'express';
import cron from 'node-cron';
import redis from './src/redis.js';
import discord, { CustomEvents } from './src/discord.js';
import dotenv from 'dotenv';
import '@fluencelabs/js-client.node';
import { Fluence } from '@fluencelabs/js-client.api';
dotenv.config();

import {
	get_success_transactions,
	get_node_clock,
} from './src/_aqua/transactions.js';

export enum REDIS_KEY {
	PREVIOUS_TIMETAMP = 'rk_previous_timestamp',
}

const app = express();
const PORT = process.env.PORT;

await connectToFluence();

// set initial timestamp on start server
setCurrentTimestamp();

// every 10 seconds
cron.schedule('*/10 * * * * *', async () => {
	let { clock, successful_txs } = await get_transactions();
	await redis.set(REDIS_KEY.PREVIOUS_TIMETAMP, clock.timestamp);

	let newTxs = successful_txs.transactions.length > 0;

	if (newTxs)
		discord.emit(
			`${CustomEvents.NewTransactions}`,
			successful_txs.transactions
		);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

async function get_transactions() {
	let clock = await get_node_clock();

	let cached = await redis.get(REDIS_KEY.PREVIOUS_TIMETAMP);

	let success_tx = await get_success_transactions(
		parseInt(`${cached}`),
		clock.timestamp
	);

	return { clock, successful_txs: success_tx };
}

async function connectToFluence() {
	await Fluence.connect({
		multiaddr: process.env.FLUENCE_NODE_MULTIADDRESS as any,
		peerId: process.env.FLUENCE_NODE_PEERID as any,
	});
}

async function setCurrentTimestamp() {
	await redis.set(REDIS_KEY.PREVIOUS_TIMETAMP, Date.now());
}
