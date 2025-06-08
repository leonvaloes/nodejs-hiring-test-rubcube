import { Game } from "Domain/Model/Game"

export class AdministratorResponse
{
    games : Game[]
    worldKills : number
    totalKills : number

    constructor() {
        this.games = []
        this.worldKills = 0
        this.totalKills = 0
    }
}