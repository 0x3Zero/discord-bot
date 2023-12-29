import express from 'express';
import cron from 'node-cron';
import redis from './src/redis.js';
import discord, { CustomEvents } from './src/discord.js';
import dotenv from 'dotenv';
import '@fluencelabs/js-client.node';
import { Fluence } from '@fluencelabs/js-client.api';
dotenv.config();


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

	let txs = successful_txs.transactions.filter((el: any) => el.meta_contract_id === process.env.COLLABEAT_META_CONTRACT_ID)

	if (txs.length > 0) 
		discord.emit(
			`${CustomEvents.NewTransactions}`,
			successful_txs.transactions
		);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

const URL = `${process.env.LINEAGE_NODE_URL}/api/v0/json-rpc`

async function get_transactions() {
	let res_clock = await fetch(URL, {
		method: "POST",
		body: JSON.stringify({
			"jsonrpc": "2.0",
			"method": "get_node_clock",
			"id": "string"
		}),
		headers: {
			'Content-Type': "application/json"
		}
	})

	let json_clock = await res_clock.json()
	let clock = json_clock.result

	let cached = await redis.get(REDIS_KEY.PREVIOUS_TIMETAMP);

	let res_txs = await fetch(URL, {
		method: "POST",
		body: JSON.stringify({
			"jsonrpc": "2.0",
			"method": "get_complete_transactions",
			"params": [parseInt(`${cached}`), clock.timestamp], 
			"id": "string"
		}),
		headers: {
			'Content-Type': "application/json"
		}
	})

	const success_tx = await res_txs.json()

	return { clock, successful_txs: success_tx.result };
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
