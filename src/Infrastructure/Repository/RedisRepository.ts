import { IRedisRepository } from "./Interface/IRedisRepository";
import redisClient from "../Config/RedisClient";
import logger from "../Config/Logger";

export class RedisRepository implements IRedisRepository {
  async get<T>(key: string): Promise<T | null> {
    logger.debug("Verificando cache Redis para a chave: %s", key);

    try {
      const value = await redisClient.get(key);

      if (value) {
        logger.info("Cache hit para a chave: %s", key);
        return JSON.parse(value) as T;
      }

      logger.info("Cache miss para a chave: %s", key);
      return null;
    } catch (error) {
      logger.error("Erro ao buscar valor do Redis para a chave %s: %o", key, error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const stringified = JSON.stringify(value);

      if (ttlSeconds) {
        await redisClient.set(key, stringified, { EX: ttlSeconds });
        logger.debug("Valor salvo no Redis com TTL de %d segundos para a chave: %s", ttlSeconds, key);
      } else {
        await redisClient.set(key, stringified);
        logger.debug("Valor salvo no Redis sem TTL para a chave: %s", key);
      }

      logger.info("Cache salvo com sucesso para a chave: %s", key);
    } catch (error) {
      logger.error("Erro ao salvar valor no Redis para a chave %s: %o", key, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
      logger.info("Chave removida do Redis: %s", key);
    } catch (error) {
      logger.error("Erro ao remover chave do Redis %s: %o", key, error);
    }
  }
}
