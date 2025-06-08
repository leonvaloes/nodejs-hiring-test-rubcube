import { GameRanking } from "Domain/Model/GameRanking";

export interface IRankService {
  GetAllRank(): Promise<GameRanking[]>;
}
