import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.config.mjs"
import 'dotenv/config'

export const Usuario = dbConfig.define(
    "usuario",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(100),
        },
        sobrenome: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true
        },
        senha: {
            type: DataTypes.STRING(256),
        },
        ativo: {
            type: DataTypes.BOOLEAN,
        }
    },
    { freezeTableName: true, timestamps: false }
)