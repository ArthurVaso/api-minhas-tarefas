# api-minhas-tarefas

## Commandos uteis

    criar a .env

        npm run env

    para preencher a .env

    PORT={porta a qual irá rodar a api}


    SECRET={palavra ou frase usada para gerar o token}
    TOKEN_LIFE={60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms"). [jwt]{https://www.npmjs.com/package/jsonwebtoken}}

    REFRESH_TOKEN_SECRET={palavra ou frase usada para gerar o refresh token}
    REFRESH_TOKEN_LIFE={mesmo exemplo do TOKEN_LIFE}

    inicializar a api

        npm start