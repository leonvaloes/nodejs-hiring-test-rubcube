import { RankResponse } from "Application/DTO/RankResponse";
import { Game } from "Domain/Model/Game";

export class RankMapper {
    GameModelToRankResponse(games : Game[]) : RankResponse[]{
        let ranks : RankResponse[] = [];
        for (const game of games) {
            ranks.push(new RankResponse(game.id, game.players));
        }
        return ranks;
    }
}
