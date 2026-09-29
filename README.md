Aplicação Full Stack de painel administrativo para gerenciamento de usuários, ainda em estágio inicial e é parte da avaliação da disciplina de Desenvolvimento Web III.

## O que já está funcionando

- Cadastro de novos usuários (nome, e-mail e senha)
- Listagem de todos os usuários cadastrados
- Busca de usuário por ID
- Edição e exclusão de usuários
- Alternância entre tema claro e escuro
- Navegação lateral entre o Dashboard e a página de Usuários

## Tecnologias

**Backend**

- Node.js + Express
- Sequelize (ORM)
- MySQL
- bcrypt
- CORS
- dotenv

**Frontend**

- React 19
- Vite
- React Router
- Axios
- Lucide React

## Estrutura do projeto

```
.
├── backend
│   └── src
│       ├── config        # Configuração do banco de dados para o sequelize-cli
│       ├── controllers   # Tratamento das requisições e respostas
│       ├── instances     # Conexão com o MySQL
│       ├── migrations    # Criação e versionamento das tabelas
│       ├── models        # Modelos do Sequelize
│       ├── routes        # Definição das rotas da API
│       ├── services      # Regras de negócio e acesso aos dados
│       └── server.js
└── frontend
    └── src
        ├── pages         # Páginas Home e Usuarios
        ├── services      # Comunicação com a API
        ├── App.jsx
        └── main.jsx
```

O back-end tem uma arquitetura em camadas (rota, controller, service e model), com o objetivo de separar responsabilidades e facilitar a manutenção do código.

