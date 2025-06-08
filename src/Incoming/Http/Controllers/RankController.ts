import { Request, Response } from "express";
import logger from 'Infrastructure/Config/Logger';
import { IRankService } from "Application/Interface/IRankService";

export class RankController {
    constructor(private rankService: IRankService) {}
  

  async RankController(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.rankService.GetAllRank()
      res.status(200).json(stats);
    } catch (error) {
      logger.error('Erro ao buscar estatísticas: %o', error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
