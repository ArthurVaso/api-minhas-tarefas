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
    return res.status(500).json({ mensagem: error.message })
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
    delete req.body.ativo;

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

export const alterarSenha = async (req, res) => {
  try{
    const email = req.body.email;
    const senha_atual = req.body.senha_atual;
    const nova_senha = req.body.nova_senha;

    const padraoEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

    if(!email) {
      return res.status(500).json({ message: "O e-mail é obrigatório." })
    }

    if(!padraoEmail) {
      return res.status(500).json({ message: "E-mail inválido." })
    }

    const usuario = await Usuario.findOne({
      where: {
        email: email
      }
    })

    if(!senha_atual) {
      return res.status(500).json({ message: " A senha atual é obrigatória." })
    }

    if(!nova_senha) {
      return res.status(500).json({ message: " A nova senha é obrigatória." })
    }

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(nova_senha, salt);

    const isValid = await bcrypt.compare(senha_atual, usuario.senha.toString());

    if(!isValid) {
      return res.status(500).json({ message: "Senha inválida."})
    }

    req.body = {"senha": hash};

    const atualizarUsuario = await Usuario.update(req.body, {
      where: {
        email: email
      }
    })

    return atualizarUsuario >= 1 ? res.status(200).json({ message: "Senha Atualizada!"}) : res.status(500).json({ message: "Ocorreu um erro ao tentar atualizar a senha." })
  }catch(error) {
    return res.status(500).json({ message: error.message });
  }
}