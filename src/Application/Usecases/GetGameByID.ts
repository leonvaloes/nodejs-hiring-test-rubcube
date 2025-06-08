import { IGameRepository } from "Domain/Interface/IGameRepository";
import { GameRepository } from "Infrastructure/Repository/GameRepository";
import { Game } from "Domain/Model/Game";
import { RedisRepository } from "Infrastructure/Repository/RedisRepository";
import { IRedisRepository } from "Infrastructure/Repository/Interface/IRedisRepository";
import logger from "Infrastructure/Config/Logger";

export class GetGameByID {
  private gameRepository: IGameRepository;
  private redisRepository: IRedisRepository;
  private readonly cacheKey = "games-getById";

  constructor(
    redisRepository: IRedisRepository = new RedisRepository(),
    gameRepository: IGameRepository = new GameRepository(),
  ) {
    this.redisRepository = redisRepository;
    this.gameRepository = gameRepository;
  }

  async execute(id: number): Promise<Game> {
    const cacheKey = `${this.cacheKey}-${id}`;
    logger.info("Iniciando execução de GetGameByID para ID: %d", id);

    logger.debug("Buscando jogo no cache Redis com a chave %s", cacheKey);
    const cached = await this.redisRepository.get<Game>(cacheKey);

    if (cached) {
      logger.info("Jogo encontrado no cache Redis para ID: %d", id);
      return cached;
    }

    logger.info("Cache vazio para a chave %s. Buscando no repositório...", cacheKey);

    const game = await this.gameRepository.GetByID(id);

    if (!game) {
      logger.error("Jogo com ID %d não encontrado", id);
      throw new Error("Jogo não encontrado");
    }

    await this.redisRepository.set(cacheKey, game, 300);
    logger.info("Jogo com ID %d salvo no cache Redis com TTL de %d segundos", id, 300);

    return game;
  }
}
