import { AdministratorResponse } from "Application/DTO/AdministratorResponse";
import { IAdministratorService } from "Application/Interface/IAdministratorService";
import { GetAllGames } from "Application/Usecases/GetAllGames";
import { AdministratorMapper } from "Application/Mapper/AdministratorMapper";
import { Game } from "Domain/Model/Game";
import { ValidatorIDGame } from "Application/Usecases/ValidatorIDGame";
import { GetGameByID } from "Application/Usecases/GetGameByID";

export class AdministratorService implements IAdministratorService {

    private getAllGames: GetAllGames;
    private getGameByID: GetGameByID;

    private mapper: AdministratorMapper;
    private validatorIDGame: ValidatorIDGame;


    constructor() {
        this.getAllGames = new GetAllGames()
        this.getGameByID = new GetGameByID()
        this.mapper = new AdministratorMapper()
        this.validatorIDGame = new ValidatorIDGame()
    }

    async GetAdminInformation(): Promise<AdministratorResponse> {
        const games = await this.getAllGames.execute();
        const totalKills = this.CountTotalKills(games);
        const worldDeaths = this.CountWorldDeaths(games);
        return this.mapper.GameModelToAdministratorResponse(games, totalKills, worldDeaths);
    }

    async GetAdminInformationById(id: number): Promise<AdministratorResponse> {

        this.validatorIDGame.execute(id)
        const game = await this.getGameByID.execute(id)
        const totalKills = game?.kills.length;
        const worldDeaths = game?.kills.filter(kill => kill.killerId == 1022).length;
        return this.mapper.GameModelToAdministratorResponseById(game, totalKills, worldDeaths);
    }

    private CountTotalKills(games: Game[]): number {
        return games.reduce((acc, game) => acc + game?.kills.length, 0);
    }

    private CountWorldDeaths(games: Game[]): number {
        return games.reduce((acc, game) => acc + game?.kills.filter(kill => kill.killerId == 1022).length, 0);
    }
}
