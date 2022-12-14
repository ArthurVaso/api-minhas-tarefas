/**
*@swagger
*   definitions:
*       CriarUsuario:
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
*       AtualizarSenha:
*           type: object
*           properties:
*               email:
*                    type: string
*                    description: E-mail do usuário.
*                    example: string
*               senha_atual:
*                    type: string
*                    description: Sobrenome do usuário
*                    example: string 
*               nova_senha:
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
*       CriarTarefa:
*           type: object
*           properties:
*               usuario_id:
*                   type: integer
*                   description: ID do usuário.
*                   example: 0
*               titulo:
*                    type: string
*                    description: Título da tarefa
*                    example: string
*               descricao:
*                    type: string
*                    description: descrição da tarefa.
*                    example: string
*               data_limite:
*                    type: date
*                    description: Data da realização da tarefa.
*                    example: 2022-12-12
*       AtualizarTarefa:
*           type: object
*           properties:
*               titulo:
*                    type: string
*                    description: Título da tarefa
*                    example: string
*               descricao:
*                    type: string
*                    description: descrição da tarefa.
*                    example: string
*               data_limite:
*                    type: date
*                    description: Data da realização da tarefa.
*                    example: 2022-12-12
*/