import { Player } from "Domain/Model/Player";

export class PlayerResponse {
    idGame: number;
    players: Player[];

    constructor(idGame: number, players: Player[]) {
        this.idGame = idGame;
        this.players = players;
    }
}