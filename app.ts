import express from 'express';
import cron from 'node-cron';
import redis from './redis.js';
import discord, { CustomEvents } from './discord.js';
import dotenv from 'dotenv';
dotenv.config();

export enum REDIS_KEY {
	LATEST_TIMESTAMP = 'rk_latest_timestamp',
}

const app = express();
const PORT = process.env.PORT;

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

async function setCurrentTimestamp() {
	await redis.set(REDIS_KEY.LATEST_TIMESTAMP, Date.now());
}
