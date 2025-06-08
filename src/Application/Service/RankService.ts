import { GetAllGames } from "Application/Usecases/GetAllGames";
import { IRankService } from "Application/Interface/IRankService";
import { RankResponse } from "Application/DTO/RankResponse";
import { Game } from "Domain/Model/Game";
import { RankMapper } from "Application/Mapper/RankMapper";

export class RankService implements IRankService {

    private getAllGames: GetAllGames;
    private mapper: RankMapper;

    constructor() {
        this.getAllGames = new GetAllGames();
        this.mapper = new RankMapper();
    }

    async GetAllRank(): Promise<RankResponse[]> {
        const games = await this.getAllGames.execute();
        this.orderPlayersbyScore(games);
        return this.mapper.GameModelToRankResponse(games);
    }

    private orderPlayersbyScore(games: Game[]) {
        for (const game of games) {
            game.players.sort((a, b) => b.score - a.score);
        }
    }

}
