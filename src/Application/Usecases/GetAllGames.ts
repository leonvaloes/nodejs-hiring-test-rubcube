import { IGameRepository } from "Domain/Interface/IGameRepository";
import { GameRepository } from "Infrastructure/Repository/GameRepository";
import { Game } from "Domain/Model/Game";
import { RedisRepository } from "Infrastructure/Repository/RedisRepository";
import { IRedisRepository } from "Infrastructure/Repository/Interface/IRedisRepository";
import logger from "Infrastructure/Config/Logger";

export class GetAllGames {
  private gameRepository: IGameRepository;
  private redisRepository: IRedisRepository;
  private readonly cacheKey = "games-getall";

  constructor(
    redisRepository: IRedisRepository = new RedisRepository(),
    gameRepository: IGameRepository = new GameRepository()
  ) {
    this.redisRepository = redisRepository;
    this.gameRepository = gameRepository;
  }

  async execute(): Promise<Game[]> {
    logger.info("Iniciando execução de GetAllGames");

    logger.debug("Buscando jogos no cache Redis com a chave %s", this.cacheKey);
    const cached = await this.redisRepository.get<Game[]>(this.cacheKey);

    if (cached) {
      logger.info("Jogos encontrados no cache Redis. Total: %d", cached.length);
      return cached;
    }

    logger.info("Cache vazio para a chave %s. Buscando no arquivo de log...", this.cacheKey);

    const games = await this.gameRepository.GetAll();

    if (!games) {
      logger.error("Nenhum jogo encontrado no arquivo de log");
      throw new Error("No games found");
    }

    logger.info("Jogos carregados do arquivo de log. Total: %d", games.length);

    await this.redisRepository.set(this.cacheKey, games, 300);
    logger.info("Jogos salvos no cache Redis com TTL de %d segundos", 300);

    return games;
  }
}
