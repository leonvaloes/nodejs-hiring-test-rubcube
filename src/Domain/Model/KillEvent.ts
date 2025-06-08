import { MeansOfDeath } from "Domain/Enum/MeansOfDeath";

export class KillEvent {
  killerId: number;
  killedBy: string;
  victimId: number;
  victimName: string;
  cause: MeansOfDeath;

  constructor(
    killerId: number,
    killedBy: string,
    victimId: number,
    victimName: string,
    cause: MeansOfDeath
  ) {
    this.killerId = killerId;
    this.killedBy = killedBy;
    this.victimId = victimId;
    this.victimName = victimName;
    this.cause = cause;
  }
}
