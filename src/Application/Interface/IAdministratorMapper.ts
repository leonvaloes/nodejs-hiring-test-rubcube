import { AdministratorResponse } from "Application/DTO/AdministratorResponse";
import { Game } from "Domain/Model/Game";

export interface IAdministratorMapper {
    GameModelToAdministratosEntity(game: Game[], totalKills: number, worldKills: number): AdministratorResponse;
}
