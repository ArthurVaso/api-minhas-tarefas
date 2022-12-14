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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        data_limite: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        concluida: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    { freezeTableName: true, timestamps: false }
)