import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import { createTarefa, deleteOne, finishOne, getAll, getAllByData, getAllByUsuarioId, getOne, updateOne } from "../controllers/tarefa.controller.mjs";

const router = express.Router();

/**
 * @swagger
 * /tarefa:
 *    post:
 *      tags: ['Tarefa']
 *      summary: Criar um nova tarefa.
 *      description: Criar um nova tarefa.
 *      parameters:
 *          - in: body
 *            name: Tarefa
 *            schema:
 *               $ref: '#/definitions/CriarTarefa'
 *      responses:
 *          201:
 *              description: Criando um novo tarefa.
 *          401:
 *              description: O título da tarefa é obrigatório.
 *          404:
 *              description: O título informado já está em uso.
*/
router.post('/', verifyToken, createTarefa);

/**
 * @swagger
 * /tarefa/all:
 *   get:
 *     tags: ['Tarefa']
 *     summary: Recebe todas as tarefas.
 *     description: Recebe todas as tarefas.
 *     responses:
 *       200:
 *         description: Recebeu todas as tarefas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *       404:
 *         description: Nenhuma tarefa cadastrada.
*/
router.get('/all', verifyToken, getAll);

/**
* @swagger
* /tarefa/all/{usuario_id}:
*   get:
*     tags: ['Tarefa']
*     summary: Recebe todas as tarefas de um usuário.
*     description: Recebe todas as tarefas de um usuário.
*     parameters:
*       - in: path
*         name: usuario_id
*         required: true
*         description: O número do ID de um usuário.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Recebeu todas as tarefas de um usuário.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID do usuário.
*                       example: 0
*       404:
*         description: Nenhuma tarefa cadastrada.
*/
router.get('/all/:usuario_id', verifyToken, getAllByUsuarioId);

/**
 * @swagger
 * /tarefa/all_data/{usuario_id}/{data_limite}:
 *    get:
 *      tags: ['Tarefa']
 *      summary: Recebe todas as tarefas por usuário e data .
 *      description: Recebe todas as tarefas por usuário e data.
 *      parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         description: O número do ID de um usuário.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: data_limite
 *         required: true
 *         description: Data da realização da tarefa.
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description: Recebeu todas as tarefas por usuário e data.
 *          401:
 *              description: Nada a fazer nesta data.
 *          404:
 *              description: Usuário inválido.
*/
router.get('/all_data/:usuario_id/:data_limite', verifyToken, getAllByData);

/**
 * @swagger
 * /tarefa/{id}:
 *   get:
 *     tags: ['Tarefa']
 *     summary: Atualizar as informações de uma tarefa.
 *     description: Atualiza nome e sobrenome de uma tarefa.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID da tarefa.
 *           schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Tarefa atualizada.
*/
router.get('/:id', verifyToken, getOne);

/**
 * @swagger
 * /tarefa/atualizar/{id}:
 *   put:
 *     tags: ['Tarefa']
 *     summary: Atualizar as informações de uma tarefa.
 *     description: Atualiza nome e sobrenome de uma tarefa.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID da tarefa.
 *           schema:
 *              type: integer
 *         - in: body
 *           name: atualizarTarefa
 *           schema:
 *              $ref: '#/definitions/AtualizarTarefa'
 *     responses:
 *       200:
 *         description: Tarefa atualizada.
*/
router.put("/atualizar/:id", verifyToken, updateOne)

/**
 * @swagger
 * /tarefa/concluir/{id}:
 *   patch:
 *     tags: ['Tarefa']
 *     summary: Define a tarefa como inativo.
 *     description: Define a tarefa da tarefa.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID de um usuário.
 *           schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Definiu a tarefa como concluída.
 *       404:
 *         description: A tarefa já foi concluída.
*/
router.patch("/concluir/:id", verifyToken, finishOne)

/**
 * @swagger
 * /tarefa/excluir/{id}:
 *   delete:
 *     tags: ['Tarefa']
 *     summary: Exclui uma tarefa.
 *     description: Exclui uma tarefa.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID da tarefa.
 *           schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Excluiu uma tarefa.
*/
router.delete("/excluir/:id", verifyToken, deleteOne)

export const tarefaRoutes = router;