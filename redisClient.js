// redisClient.js
const { createClient } = require("redis");

async function initializeRedis() {
	const client = createClient({
		password: process.env.REDIS_PASSWORD,
		socket: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		},
	});

	client.on("error", (err) => {
		console.error("Redis Client Error", err);
	});

	await client.connect();

	return client;
}

const redisClientPromise = initializeRedis();

module.exports = redisClientPromise;
