import { createClient } from 'redis';

const redis = createClient();

redis.on('error', (err) => console.log('Redis Client Error', err));

redis.on('connect', function () {
	console.log('Redis client connected');
});

await redis.connect();

export default redis;
