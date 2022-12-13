import express from "express";
import 'dotenv/config'
import cors from "cors";
import { usuarioRoutes } from './app/routes/usuario.routes.mjs'
import { tarefaRoutes } from "./app/routes/tarefa.routes.mjs";
import { Tarefa } from "./app/models/tarefa.mjs";
import { Usuario } from "./app/models/usuario.mjs";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

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

