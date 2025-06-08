import { MeansOfDeath } from "Domain/Enum/MeansOfDeath"

export interface IAdministratorRepository {
  getTotalKills(gameId: string): number;
  getKillsByMeansOfDeath(gameId: string): Record<MeansOfDeath, number>;
  getKillsByWorld(gameId: string): number;
}
