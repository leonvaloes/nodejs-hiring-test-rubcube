import { Game } from "Domain/Model/Game";

export interface IGetAdminInformation {
    execute(): Promise<Game[]>
}