import { Game } from "Domain/Model/Game";

export interface IGameRepository {
  GetAll(): Promise<Game[]>;
  GetByID(id: number): Promise<Game >;
}
