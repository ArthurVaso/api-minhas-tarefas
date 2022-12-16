import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import { alterarSenha, createUsuario, deleteOne, getAll, getOne, inactiveOne, login, updateOne } from "../controllers/usuario.controller.mjs";

const router = express.Router();

/**
 * @swagger
 * /usuario/create:
 *    post:
 *      tags: ['Usuario']
 *      summary: Criar um novo usuário.
 *      description: Criar um novo usuário.
 *      parameters:
 *          - in: body
 *            name: Usuario
 *            schema:
 *               $ref: '#/definitions/CriarUsuario'
 *      responses:
 *          201:
 *              description: Criando um novo usuário.
*/
router.post("/create", createUsuario);

/**
 * @swagger
 * /usuario/login:
 *    post:
 *      tags: ['Usuario']
 *      summary: Login de um usuário.
 *      description: Login um usuário e definição do token e refresh token.
 *      parameters:
 *          - in: body
 *            name: Usuario
 *            schema:
 *               $ref: '#/definitions/Login'
 *      responses:
 *          201:
 *              description: Logando um usuário.
*/
router.post("/login", login)

/**
 * @swagger
 * /usuario/todos:
 *   get:
 *     tags: ['Usuario']
 *     summary: Recebe todos os usuários.
 *     description: Recebe todos os usuários ativos.
 *     responses:
 *       200:
 *         description: Recebeu todos os usuários.
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
 *         description: Não existem usuários ativos.
*/
router.get("/todos", verifyToken, getAll)

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     tags: ['Usuario']
 *     summary: Recebe um usuários.
 *     description: Recebe um usuários.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O número do ID de um usuário.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recebeu o usuários.
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
 *         description: Usuário não existe.
*/
router.get("/:id", verifyToken, getOne)

/**
 * @swagger
 * /usuario/atualizar/{id}:
 *   put:
 *     tags: ['Usuario']
 *     summary: Atualizar as informações do usuário.
 *     description: Atualiza nome e sobrenome do usuário.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID de um usuário.
 *           schema:
 *              type: integer
 *         - in: body
 *           name: atualizarUsuario
 *           schema:
 *              $ref: '#/definitions/AtualizarUsuario'
 *     responses:
 *       200:
 *         description: Atualizou as informações.
*/
router.put("/atualizar/:id", verifyToken, updateOne)

/**
 * @swagger
 * /usuario/atualizar_senha/{id}:
 *   patch:
 *     tags: ['Usuario']
 *     summary: Atualizar senha do usuário.
 *     description: Atualizar senha do usuário.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID de um usuário.
 *           schema:
 *              type: integer
 *         - in: body
 *           name: atualizarSenha
 *           schema:
 *              $ref: '#/definitions/AtualizarSenha'
 *     responses:
 *       200:
 *         description: Senha Atualizada!.
*/
router.patch("/atualizar_senha/:id", verifyToken, alterarSenha)

/**
 * @swagger
 * /usuario/deletar/{id}:
 *   patch:
 *     tags: ['Usuario']
 *     summary: Define o usuário como inativo.
 *     description: Define o usuário como inativo.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID de um usuário.
 *           schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Definiu o usuário como inativo.
 *       404:
 *         description: Usuário não encontrado.
*/
router.patch("/deletar/:id", verifyToken, inactiveOne)

/**
 * @swagger
 * /usuario/excluir/{id}:
 *   delete:
 *     tags: ['Usuario']
 *     summary: Exclui um usuário.
 *     description: Exclui um usuário.
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: O número do ID de um usuário.
 *           schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Excluiu um usuário.
*/
router.delete("/excluir/:id", verifyToken, deleteOne)

export const usuarioRoutes = router;
