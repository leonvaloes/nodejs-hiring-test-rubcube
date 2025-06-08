import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import api from './Incoming/Http/Routes/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './Incoming/Config/Swagger/Swagger';
import logger from './Infrastructure/Config/Logger';
import { logRequests } from './Incoming/Config/Middleware/LogRequest';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware para logar requisições
app.use(logRequests);

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de API
app.use('/api', api);

// Middleware 404
app.use((req, res) => {
  logger.warn("Rota não encontrada: %s %s", req.method, req.url);
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de erro
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error("Erro interno capturado: %o", err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  logger.info("Servidor rodando na porta %s", PORT);
});
