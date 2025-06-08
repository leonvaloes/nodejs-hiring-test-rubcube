import { Game } from "Domain/Model/Game";

export interface IGameServices {
  getStatistics(): Promise<Game[]>;
  getStatisticsByGameId(gameId: string): Promise<Game>;
}
