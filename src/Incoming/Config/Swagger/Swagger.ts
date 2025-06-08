import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Jogos',
      version: '1.0.0',
      description: 'Documentação da API de análise de logs de jogos.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Ambiente local',
      },
    ],
  },
  apis: ['src/Incoming/Http/Routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
