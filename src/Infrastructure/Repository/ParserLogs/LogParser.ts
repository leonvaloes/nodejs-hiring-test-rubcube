import { KillEvent } from "Domain/Model/KillEvent";
import { Game } from "Domain/Model/Game";
import { MeansOfDeath } from "Domain/Enum/MeansOfDeath";
import logger from "Infrastructure/Config/Logger";

export class LogParser {
    private static readonly USER_INFO_REGEX = /ClientUserinfoChanged: (\d+) .*?n\\([^\\]+)/;
    private static readonly KILL_EVENT_REGEX = /Kill: (\d+) (\d+) (\d+): (.+) killed (.+) by (\S+)/;

    parse(content: string): Game[] {
        logger.info("Iniciando parsing do conteúdo dos logs");
        const lines = content.split("\n");
        const games: Game[] = [];

        let currentGame: Game | null = null;
        let gameId = 0;
        let playerNames: Record<number, string> = {};

        for (const line of lines) {
            if (this.isInitGame(line)) {
                logger.info("Iniciando novo jogo: game_%d", gameId);
                ({ currentGame, playerNames } = this.startNewGame(gameId++));
                continue;
            }

            if (this.isShutdownGame(line) && currentGame) {
                logger.info("Finalizando jogo: game_%d com %d players", currentGame.id, currentGame.players.length);
                games.push(currentGame);
                currentGame = null;
                continue;
            }

            if (this.isUserInfoChange(line) && currentGame) {
                this.processUserInfo(line, currentGame, playerNames);
                continue;
            }

            if (this.isKillEvent(line) && currentGame) {
                this.processKillEvent(line, currentGame);
            }
        }

        return games;
    }
    parseByID(content: string, id: number): Game | null {
        logger.info("Iniciando parsing do conteúdo dos logs para o jogo com ID: %d", id);
        const lines = content.split("\n");
    
        let currentGame: Game | null = null;
        let gameId = -1;
        let playerNames: Record<number, string> = {};
    
        for (const line of lines) {
            if (this.isInitGame(line)) {
                gameId++;
                if (gameId === id) {
                    logger.info("Iniciando jogo com ID correspondente: %d", gameId);
                    ({ currentGame, playerNames } = this.startNewGame(gameId));
                } else {
                    currentGame = null; // ignorar jogos não correspondentes
                }
                continue;
            }
    
            if (!currentGame) continue; // ignorar eventos fora do jogo de interesse
    
            if (this.isUserInfoChange(line)) {
                this.processUserInfo(line, currentGame, playerNames);
            } else if (this.isKillEvent(line)) {
                this.processKillEvent(line, currentGame);
            } else if (this.isShutdownGame(line)) {
                logger.info("Finalizando e retornando jogo com ID: %d", id);
                return currentGame;
            }
        }
    
        logger.warn("Jogo com ID %d não encontrado", id);
        return null;
    }
    


    private isInitGame(line: string): boolean {
        return line.includes("InitGame");
    }

    private isShutdownGame(line: string): boolean {
        return line.includes("ShutdownGame");
    }

    private isUserInfoChange(line: string): boolean {
        return line.includes("ClientUserinfoChanged");
    }

    private isKillEvent(line: string): boolean {
        return line.includes("Kill:");
    }

    private startNewGame(gameId: number): { currentGame: Game; playerNames: Record<number, string> } {
        const game = new Game(gameId);
        return { currentGame: game, playerNames: {} };
    }

    private processUserInfo(line: string, game: Game, playerNames: Record<number, string>): void {
        const match = line.match(LogParser.USER_INFO_REGEX);
        if (!match) {
            logger.warn("Linha de user info inválida ignorada: %s", line);
            return;
        }

        const [, idStr, name] = match;
        const id = parseInt(idStr);

        if (isNaN(id)) {
            logger.warn("ID inválido em user info ignorado: %s", line);
            return;
        }

        playerNames[id] = name;

        if (game.existsPlayer(id)) {
            logger.debug('Atualizando nome do player %d para "%s" no jogo %d', id, name, game.id);
            game.updateNamePlayer(id, name);
        } else {
            logger.debug('Registrando novo player %d com nome "%s" no jogo %d', id, name, game.id);
            game.registerPlayer(id, name);
        }
    }

    private processKillEvent(line: string, game: Game): void {
        const match = line.match(LogParser.KILL_EVENT_REGEX);

        if (!match) {
            logger.warn("Linha de kill inválida ignorada: %s", line);
            return;
        }

        const [, killerIdStr, victimIdStr, , killerNameRaw, victimNameRaw, causeStr] = match;
        const killerId = parseInt(killerIdStr);
        const victimId = parseInt(victimIdStr);

        if (isNaN(killerId) || isNaN(victimId)) {
            logger.warn("IDs inválidos na kill ignorada: %s", line);
            return;
        }

        const killerName = killerNameRaw.trim();
        const victimName = victimNameRaw.trim();
        const cause = causeStr as MeansOfDeath;

        const event = new KillEvent(killerId, killerName, victimId, victimName, cause);
        game.addKill(event);

        this.updateScores(game, killerId, victimId);
    }

    private updateScores(game: Game, killerId: number, victimId: number): void {
        const isWorldKill = killerId === 1022;
        const isSuicide = killerId === victimId;

        if (!isWorldKill || isSuicide) {
            game.updatePlayerScore(killerId, 1);
        }

        game.updatePlayerScore(victimId, -1);
    }
}
