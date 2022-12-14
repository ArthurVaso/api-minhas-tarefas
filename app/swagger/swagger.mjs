import swaggerAutogen from 'swagger-autogen';

const outputFile = './app/swagger/swagger_output.json '
const endpoints = [
    './app/routes/usuario.routes.mjs',
    './app/routes/tarefa.routes.mjs'
]

swaggerAutogen(outputFile, endpoints);