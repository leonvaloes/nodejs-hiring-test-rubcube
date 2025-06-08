import { KillEvent } from "./KillEvent";
import { Player } from "./Player";

export class Game {
  id: number;
  kills: KillEvent[] = [];
  players: Player[] = [];

  constructor(id: number) {
    this.id = id;
  }

  updatePlayerScore(playerId: number, delta: number) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      player.addScore(delta);
    }
  }
  
  addKill(event: KillEvent) {
    this.kills.push(event);
  }

  existsPlayer(id: number) {
    return this.players.some(player => player.id === id);
  }

  registerPlayer(id: number, name: string) {
    this.players.push(new Player(id, name));
  }

  updateNamePlayer(id: number, newName: string) {
    const player = this.players.find(p => p.id === id);
    if (player) {
      player.changeName(newName);
    }
  }

  deathsByCause() {
    return this.kills.reduce((acc, kill) => {
      const cause = kill.cause;
      acc[cause] = (acc[cause] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
