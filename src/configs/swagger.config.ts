import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Capstone Pinterest API',
      version: '1.0.0',
      description: 'API Documentation for Pinterest Clone Project'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://capstone-15-04.vercel.app',
        description: 'Production Vercel server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './dist/routes/*.js', './dist/controllers/*.js']
}

export const specs = swaggerJsdoc(options)
