import { Usuario } from "../models/usuario.mjs"

import bcrypt from 'bcrypt'
import { authentication, logout, refreshAuthentication } from "../config/jwt.mjs";

export const createUsuario = async (req, res) => {
  try {
    const senha = req.body.senha;
    const padraoEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

    if(!senha || !req.body.senha || !padraoEmail.test(req.body.email)) {
      return res.status(500).json({ message: "Email e/ou senha inválido(s)!" });
    }

    const usuarioExiste = await Usuario.findOne({
      where: {
        email: req.body.email
      }
    })

    if(usuarioExiste) {
      return res.status(500).json({ message: "O e-mail informado já está sendo usado." });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(senha, salt);
    req.body.senha = hash

    req.body.ativo = false;

    const usuario = await Usuario.create(req.body);
    const token = authentication(usuario.id);
    const refreshToken = refreshAuthentication(usuario.id);

    return res.status(201).json({
      refreshToken,
      token,
      usuario
    })
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError') {
      return res.status(500).json({ message: "O e-mail já esta sendo usado." });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const login = async (req, res) => {
  try {
    const {email, senha} = req.body;

    const usuarioCheck = await Usuario.findOne({
      where: {
        email: email
      }
    })

    if(!usuarioCheck) {
      return res.status(500).json({ message: "Email e/ou senha inválido(s)!" })
    }

    const isValid = await bcrypt.compare(senha.toString(), usuarioCheck.senha.toString())

    if(!isValid) {
      return res.status(500).json({ message: "Email e/ou senha inválido(s)!" })
    }

    if(!usuarioCheck.ativo) {
      await Usuario.update({
        ativo: true,
      },
      {
        where: {
          email: email
        }
      })
    }

    const usuario = await Usuario.findOne({
      where: {
        email: email
      }
    })

    const token = authentication(usuario.id);
    const refreshToken = refreshAuthentication(usuario.id);

    return res.status(200).json({
      refreshToken,
      token,
      usuario
    })
  } catch (error) {
    return res.status(500).json({ mensagem: err.message })
}
}

export const getOne = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: req.params.id
      }
    });

    return usuario !== null ? res.status(200).json(usuario) : res.status(404).json({ message: "Usuário não existe." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAll = async (req, res) => {
  try {
    const usuario = await Usuario.findAll({
      where: {
        ativo: true
      },
      atributes: ['id', 'nome', 'sobrenome', 'email', 'ativo']
    });
    
    return usuario !== null ? res.status(200).json(usuario) : res.status(404).json({ message: "Não existem usuários ativos." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateOne = async (req, res) => {
  try {
    delete req.body.id;
    delete req.body.email;
    delete req.body.senha;

    const usuario = await Usuario.update(req.body, {
      where:{
        id: req.params.id
      }
    })

    return res.status(200).json({ message: "Usuário atualizado." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const inactiveOne = async (req, res) => {
  try {
    const [updateRows] = await Usuario.update({
      ativo: false,
    },
    {
      where: {
        id: req.params.id
      }
    })

    if(updateRows) {
      res.status(200).send();
    } else {
      return res.status(404).json({ message: "Usuário não encontrado."})
    }
  } catch (error) {
    return res.status(500).json({ message: error.mensagem })
  }
}

export const deleteOne = async (req, res) => {
  try {
    const usuario = await Usuario.destroy({
      where: {
        id: req.params.id
      }
    })

    return res.status(200).json({ message: "Obrigado por usar nosso sistema." })
  } catch (error) {
    return res.status(500).json( {message: error.message} )
  }
}