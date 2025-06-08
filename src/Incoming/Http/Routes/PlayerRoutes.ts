import { Router } from 'express';
import { RankController } from '../Controllers/RankController';
import { RankService } from 'Application/Service/RankService';
const router = Router();

const PlayerRoutes = new RankController(new RankService());

/**
 * @swagger
 * /player/rank/games:
 *   get:
 *     summary: Retorna o ranking de jogadores por jogo
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: Lista de jogos com jogadores e pontuação
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idGame:
 *                     type: integer
 *                     example: 1
 *                   players:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         score:
 *                           type: integer
 *                           example: -1
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         currentName:
 *                           type: string
 *                           example: Mocinha
 */
router.get('/rank/games', (req, res) => PlayerRoutes.RankController(req, res));

export default router;
