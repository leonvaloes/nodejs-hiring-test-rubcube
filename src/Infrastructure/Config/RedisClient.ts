import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

const redisUrl = `redis://${redisHost}:${redisPort}`;

const redisClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

redisClient.connect()
    .then(() => console.log(`Conectado ao Redis em ${redisUrl}`))
    .catch((err) => console.error("Erro ao conectar ao Redis:", err));

export default redisClient;
