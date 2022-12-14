/**
*@swagger
*   definitions:
*       CreateUser:
*           type: object
*           properties:
*               nome:
*                   type: string
*                   description: Nome do usuário.
*                   example: string
*               sobrenome:
*                    type: string
*                    description: Sobrenome do usuário
*                    example: string
*               email:
*                    type: string
*                    description: E-mail do usuário.
*                    example: string
*               senha:
*                    type: string
*                    description: Senha do usuário.
*                    example: string
*       Login:
*           type: object
*           properties:
*               email:
*                    type: string
*                    description: E-mail do usuário.
*                    example: string
*               senha:
*                    type: string
*                    description: Senha do usuário.
*                    example: string
*       AtualizarUsuario:
*           type: object
*           properties:
*               nome:
*                    type: string
*                    description: Nome do usuário.
*                    example: string
*               sobrenome:
*                    type: string
*                    description: Sobrenome do usuário
*                    example: string 
*               senha:
*                    type: string
*                    description: Senha do usuário.
*                    example: string
*/