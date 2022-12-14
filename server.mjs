import express from "express";
import 'dotenv/config'
import cors from "cors";
import { usuarioRoutes } from './app/routes/usuario.routes.mjs'
import { tarefaRoutes } from "./app/routes/tarefa.routes.mjs";
import { Tarefa } from "./app/models/tarefa.mjs";
import { Usuario } from "./app/models/usuario.mjs";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
        title: "Minhas Tarefas API",
        description: "Minhas Tarefas API information",
        contact: {
            name: "Arthur Vaso"
        },
        servers: [
            "http://localhost:3000/v1"
        ]
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'x-access-token',
            scheme: 'bearer',
            in: 'header',
        },
    },
    security: [{ bearerAuth: [] }],
    tags: [
        {
            name: "Usuario",
            description: "Endpoints Usuário"
        },
        {
            name: "Tarefa",
            description: "Endpoints Tarefa"
        }
    ],
},
apis: [
    './app/routes/usuario.routes.mjs',
    './app/routes/tarefa.routes.mjs',
    './app/swagger/models.js'
]
}
const swaggerFile = swaggerJsDoc(swaggerOptions);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/usuario", usuarioRoutes);
app.use("/tarefa", tarefaRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

Tarefa.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));