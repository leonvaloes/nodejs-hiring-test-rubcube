import fs from "fs/promises";
import path from "path";
import { IGameRepository } from "Domain/Interface/IGameRepository";
import { Game } from "Domain/Model/Game";
import { LogParser } from "./ParserLogs/LogParser";
import logger from "../Config/Logger";

export class GameRepository implements IGameRepository {
  private readonly logPath = path.join(process.cwd(), "games.log");

  async GetAll(): Promise<Game[]> {
    logger.info("Iniciando leitura do arquivo de log em %s", this.logPath);

    try {
      const content = await fs.readFile(this.logPath, "utf-8");
      logger.debug("Arquivo lido com sucesso, iniciando parse");

      const parser = new LogParser();
      const games = parser.parse(content);

      logger.info("Parse finalizado com sucesso, %d jogos retornados", games.length);
      return games;
    } catch (error) {
      logger.error("Erro ao ler/parsar arquivo de log: %o", error);
      throw error;
    }
  }

  async GetByID(id: number): Promise<Game> {
    logger.info("Iniciando busca de jogo por ID: %d", id);

    try {
      const content = await fs.readFile(this.logPath, "utf-8");
      logger.debug("Arquivo lido com sucesso, iniciando parse");

      const parser = new LogParser();
      const games = parser.parseByID(content, id);
      
      if (!games) {
        logger.warn("Jogo com ID %d não encontrado", id);
        throw new Error(`Jogo com ID ${id} não encontrado`);
      }

      return games;
    } catch (error) {
      logger.error("Erro ao buscar jogo por ID: %o", error);
      throw error;
    }
  }
}
