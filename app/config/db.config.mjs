
import sequelize from "sequelize"
import 'dotenv/config'

export const dbConfig = new sequelize(
  'minhas_tarefa_DW2S6_db',
  'root',
  'rootroot',
  {
    dialect: 'mysql',
    host: 'localhost',
    logging: true
  }
)