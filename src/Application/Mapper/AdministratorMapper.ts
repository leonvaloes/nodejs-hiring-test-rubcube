import { AdministratorResponse } from "Application/DTO/AdministratorResponse";
import { Game } from "Domain/Model/Game";

export class AdministratorMapper {
    GameModelToAdministratorResponse(game: Game[], totalKills: number, worldKills: number): AdministratorResponse {
        return {
            games: game,
            totalKills: totalKills,
            worldKills: worldKills
        };
    }

    GameModelToAdministratorResponseById(game: Game, totalKills: number, worldKills: number): AdministratorResponse {
        return {
            games: [game],
            totalKills: totalKills,
            worldKills: worldKills
        };
    }
}
