import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import { createTarefa, deleteOne, finishOne, getAll, getAllByData, getAllByUsuarioId, getOne, updateOne } from "../controllers/tarefa.controller.mjs";

const router = express.Router();

router.post('/', verifyToken, createTarefa);

router.get('/all', verifyToken, getAll);

router.get('/all/:usuario_id', verifyToken, getAllByUsuarioId);

router.get('/all_data', verifyToken, getAllByData);

router.get('/:id', verifyToken, getOne);

router.put("/atualizar/:id", verifyToken, updateOne)

router.patch("/concluir/:id", verifyToken, finishOne)

router.delete("/excluir/:id", verifyToken, deleteOne)

export const tarefaRoutes = router;