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
            allowNull: false
        },
        sobrenome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    { freezeTableName: true, timestamps: false }
)