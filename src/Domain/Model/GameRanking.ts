import { Player } from "./Player";

export class GameRanking {
  idGame: number;
  players: Player[];

  constructor (idGame: number, players: Player[]) {
    this.idGame = idGame
    this.players = players
  }
}
