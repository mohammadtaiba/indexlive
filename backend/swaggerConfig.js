import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'IndexLive - REST API',
            version: '1.0.0',
            description: 'Finance - Website, 29-06-2024, Mohammad Taiba',
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default { swaggerUi, specs };