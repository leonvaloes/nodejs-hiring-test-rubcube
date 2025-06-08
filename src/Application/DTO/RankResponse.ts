import { Player } from "Domain/Model/Player";

export class RankResponse {
    idGame: number;
    players: Player[];

    constructor(idGame: number, players: Player[]) {
        this.idGame = idGame;
        this.players = players;
    }
}