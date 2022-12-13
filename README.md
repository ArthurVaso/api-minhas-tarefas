# <h1> <img src="https://user-images.githubusercontent.com/101563304/207380402-0dbd9eb1-0843-4703-8c7a-bcdf05abbf7e.gif" alt="api-minhas-tarefas" width="80"/> <strong>api-minhas-tarefas</strong> </h1> 

## Comandos úteis

### Instalar todos os arquivo necessários
     npm install

### Criar a .env
     npm run env

### Para preencher a .env

<p>PORT={porta a qual irá rodar a api}

DB_USER={nome do usuário que está usando no mysql}<br>
DB_PWD={senha que está usando no mysql}<br>
DB_NAME={nome que quer adotar para o banco. Ex.: minhas_tarefa_DW2S6_db}<br>
DB_HOST={endereço ip do bando. Ex.: localhost}<br>
DB_PORT={porta a qual o banco se conecta. Ex.: 3306}<br>
DB_DIALECT=mysql {tem de ser mysql}

SECRET={palavra ou frase usada para gerar o token}<br>
TOKEN_LIFE={60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").} - ver mais sobre [Json Web Token (JWT)](https://www.npmjs.com/package/jsonwebtoken)

REFRESH_TOKEN_SECRET={palavra ou frase usada para gerar o refresh token}<br>
REFRESH_TOKEN_LIFE={mesmo exemplo do TOKEN_LIFE}</p>


### Criar Banco e Tabela

###### Criar o Banco
        npm run db:create

###### Criar as Tabelas
        db:up

###### Dropar as Tabelas (cuidado ao usar este comando, pois apagara tudo que foi inserido)
        db:down
        
###    Inicializar a api
        npm start
