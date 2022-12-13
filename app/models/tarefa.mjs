import { DataTypes } from "sequelize";
import { dbConfig } from "../config/db.config.mjs";
import 'dotenv/config'

export const Tarefa = dbConfig.define(
    "tarefa", 
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        usuario_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING(100)
        },
        descricao: {
            type: DataTypes.STRING(100)
        },
        data_limite: {
            type: DataTypes.STRING(256)
        },
        concluida: {
            type: DataTypes.BOOLEAN
        }
    },
    { freezeTableName: true, timestamps: false }
)