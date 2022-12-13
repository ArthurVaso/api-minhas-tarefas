import 'dotenv/config'
import jsonwebtoken from "jsonwebtoken";

const tokenList = {}

export const authentication = (usuario_id) => {
    const token = jsonwebtoken.sign({id: usuario_id}, process.env.SECRET, {expiresIn: process.env.TOKEN_LIFE})

    return token;
}

export const refreshAuthentication = (usuario_id) => {
    const refreshToken = jsonwebtoken.sign({id: usuario_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_LIFE})

    return refreshToken;
}

export const verifyToken = (req, res, next) => {
    const refreshToken = req.headers['x-access-token']
    
    if(!refreshToken) return res.status(403).send({ auth: false, message: "Não foi fornecido um token de acesso." })
    
    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, decoded) {
        if(err) return res.status(401).send({ auth: false, message: "Falha ao autenticar o token." })

        req.decoded = decoded
        next();
    })
}

export const logout = (req, res, next) => {
    res.json({ token: null, refreshToken: null })
}