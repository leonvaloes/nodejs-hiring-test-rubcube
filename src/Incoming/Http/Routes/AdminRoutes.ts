import { Router } from 'express';
import { AdministratorController } from 'Incoming/Http/Controllers/AdministratorController';
import { AdministratorService } from 'Application/Service/AdministratorService';

const router = Router();
const administratorController = new AdministratorController(new AdministratorService());

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Ações administrativas para logs de jogos
 */

/**
 * @swagger
 * /admin/log/game:
 *   get:
 *     summary: Retorna todos os logs de jogos
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de jogos com eventos de morte e jogadores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 games:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       players:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 2
 *                             currentName:
 *                               type: string
 *                               example: Isgalamido
 *                             score:
 *                               type: integer
 *                               example: -7
 *                       kills:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             killerId:
 *                               type: integer
 *                               example: 1022
 *                             killedBy:
 *                               type: string
 *                               example: "<world>"
 *                             victimId:
 *                               type: integer
 *                               example: 2
 *                             victimName:
 *                               type: string
 *                               example: Isgalamido
 *                             cause:
 *                               type: string
 *                               example: MOD_TRIGGER_HURT
 *                 totalKills:
 *                   type: integer
 *                   example: 11
 *                 worldKills:
 *                   type: integer
 *                   example: 8
 */
router.get('/log/game', (req, res) => administratorController.GetAdminInformation(req, res));

/**
 * @swagger
 * /admin/log/game/{id}:
 *   get:
 *     summary: Retorna os logs de um jogo específico por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: Informações do jogo e eventos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameLog'
 * components:
 *   schemas:
 *     GameLog:
 *       type: object
 *       properties:
 *         games:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     currentName:
 *                       type: string
 *                       example: Isgalamido
 *                     score:
 *                       type: integer
 *                       example: -7
 *               kills:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     killerId:
 *                       type: integer
 *                       example: 1022
 *                     killedBy:
 *                       type: string
 *                       example: "<world>"
 *                     victimId:
 *                       type: integer
 *                       example: 2
 *                     victimName:
 *                       type: string
 *                       example: Isgalamido
 *                     cause:
 *                       type: string
 *                       example: MOD_TRIGGER_HURT
 *         totalKills:
 *           type: integer
 *           example: 11
 *         worldKills:
 *           type: integer
 *           example: 8
 */
router.get('/log/game/:id', (req, res) => administratorController.GetAdminInformationById(req, res));

export default router;
