import express from 'express';
import cron from 'node-cron';
import redis from './src/redis.js';
import discord, { CustomEvents } from './src/discord.js';
import dotenv from 'dotenv';
import '@fluencelabs/js-client.node';
import { Fluence } from '@fluencelabs/js-client.api';
dotenv.config();

import {
	get_success_transansactions,
	get_node_clock,
} from './src/_aqua/transactions.js';

export enum REDIS_KEY {
	LATEST_TIMESTAMP = 'rk_latest_timestamp',
}

const app = express();
const PORT = process.env.PORT;

await connectToFluence();
// await aqua_function_test();

setCurrentTimestamp();

// every 5 seconds
cron.schedule('*/5 * * * * *', async () => {
	setCurrentTimestamp();

	let timestamp = await redis.get(REDIS_KEY.LATEST_TIMESTAMP);
	discord.emit(`${CustomEvents.NewTransactions}`, timestamp);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

async function aqua_function_test() {
	let clock = await get_node_clock();
	console.log('clock', clock);

	let success_tx = await get_success_transansactions(1683096823, Date.now());
	console.log('success_tx', success_tx);
}

async function connectToFluence() {
	await Fluence.connect({
		multiaddr: process.env.FLUENCE_NODE_MULTIADDRESS as any,
		peerId: process.env.FLUENCE_NODE_PEERID as any,
	});
}

async function setCurrentTimestamp() {
	await redis.set(REDIS_KEY.LATEST_TIMESTAMP, Date.now());
}
