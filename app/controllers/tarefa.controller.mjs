import { Tarefa } from '../models/tarefa.mjs';

export const createTarefa = async (req, res) => {
    try {
        if(!req?.body?.titulo) {
            return res.status(401).json({ message: "O título da tarefa é obrigatório." })
        }

        const tarefaQuery = await Tarefa.findOne({
            where: {
                titulo: req.body.titulo,
                usuario_id: req.body.usuario_id
            }
        })

        if(tarefaQuery) {
            return res.status(404).json({ message: "O título informado já está em uso." })
        }

        req.body.concluida = false;

        const tarefa = await Tarefa.create(req.body);

        return res.status(201).json(tarefa);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getOne = async (req, res) => {
    try {
        const tarefa = await Tarefa.findOne({
            where: {
                id: req.params.id
            }
        })

        return tarefa !== null ? res.status(200).json(tarefa) : res.status(404).json({ message: "Tarefa ou não existe ou foi apagada." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllByUsuarioId = async (req, res) => {
    try {
        const tarefa = await Tarefa.findAll({
            where: {
                usuario_id: req.params.usuario_id
            }
        })

        if(tarefa.length == 0) {
            return res.status(404).json({ message: "Nenhuma tarefa cadastrada." })
        }

        return tarefa !== null ? res.status(200).json(tarefa) : res.status(404).json({ message: "Usuário inválido." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllByData = async (req, res) => {
    try {
        const tarefa = await Tarefa.findAll({
            where: {
                usuario_id: req.params.usuario_id,
                data_limite: req.params.data_limite
            }
        })

        if(tarefa.length == 0) {
            return res.status(401).json({ message: "Nada a fazer nesta data." })
        }

        return tarefa !== null ? res.status(200).json(tarefa) : res.status(404).json({ message: "Usuário inválido." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAll = async (req, res) => {
    try {
       const allTarefas = await Tarefa.findAll();

       if(allTarefas.length == 0) {
           return res.status(404).json({ message: "Nenhuma tarefa cadastrada." })
       }
       
       return allTarefas !== null ? res.status(200).json(allTarefas) : res.status(404).json({ message: "Nenhuma tarefa cadastrada!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateOne = async (req, res) => {
    try {
        delete req.body.id;
        delete req.body.usuario_id;
        delete req.body.concluida;
    
        const usuario = await Tarefa.update(req.body, {
          where:{
            id: req.params.id
          }
        })
    
        return res.status(200).json({ message: "Tarefa atualizada." })
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
}

export const finishOne = async (req, res) => {
    try {
        const [updateRows] = await Tarefa.update({
          concluida: true,
        },
        {
          where: {
            id: req.params.id
          }
        })
    
        if(updateRows) {
          res.status(200).send();
        } else {
          return res.status(404).json({ message: "A tarefa já foi concluída."})
        }
      } catch (error) {
        return res.status(500).json({ message: error.mensagem })
      }
}

export const deleteOne = async (req, res) => {
    try {
        const tarefa = await Tarefa.destroy({
          where: {
            id: req.params.id
          }
        })
    
        return res.status(200).json({ message: "Tarefa excluída." })
      } catch (error) {
        return res.status(500).json( {message: error.message} )
      }
}