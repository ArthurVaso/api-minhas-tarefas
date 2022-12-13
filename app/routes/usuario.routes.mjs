import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import { createUsuario, deleteOne, getAll, getOne, inactiveOne, login, updateOne } from "../controllers/usuario.controller.mjs";

const router = express.Router();


router.post("/", createUsuario);


router.post("/login", login)


router.get("/todos", verifyToken, getAll)


router.get("/:id", verifyToken, getOne)


router.put("/atualizar/:id", verifyToken, updateOne)


router.patch("/deletar/:id", verifyToken, inactiveOne)


router.delete("/excluir/:id", verifyToken, deleteOne)

export const usuarioRoutes = router;
/*
// Retrieve all usuarios
router.get("/", usuarios.findAll);

// Retrieve all published usuarios
router.get("/published", usuarios.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", usuarios.findOne);

// Update a Tutorial with id
router.put("/:id", usuarios.update);

// Delete a Tutorial with id
router.delete("/:id", usuarios.delete);

// Delete all usuarios
router.delete("/", usuarios.deleteAll);

app.use('/api/usuarios', router);
*/
