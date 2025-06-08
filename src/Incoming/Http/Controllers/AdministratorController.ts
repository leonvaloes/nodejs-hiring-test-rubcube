import { Request, Response } from "express";
import logger from 'Infrastructure/Config/Logger';
import { IAdministratorService } from "Application/Interface/IAdministratorService";

export class AdministratorController {
  constructor(private administratorService: IAdministratorService) { }

  async GetAdminInformation(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.administratorService.GetAdminInformation();
      res.status(200).json(stats);
    } catch (error) {
      logger.error('Erro ao buscar estatísticas: %o', error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  async GetAdminInformationById(req: Request, res: Response): Promise<void> {
    try {
      const gameId = Number(req.params.id);
      const gameStats = await this.administratorService.GetAdminInformationById(gameId);

      if (!gameStats) {
        res.status(404).json({ error: "Jogo não encontrado" });
        return;
      }

      res.status(200).json(gameStats);
    } catch (error) {
      logger.error('Erro ao buscar estatísticas por ID: %o', error);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
