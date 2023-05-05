# Client Contacts API 🗒️

Client Contacts permite que o usuário crie uma conta e a partir daí consulte, edite e delete sua própria conta. O usuário também pode cadastrar, editar, consultar e deletar contatos conforme atualiza sua lista de contatos. Além disso a aplicação permite uma visão geral de todos os contatos.

## Como executar o projeto

### Setup de ambiente:

- [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
- [Node LTS](https://nodejs.org/en/)

### Como rodar na minha máquina?

- Clone o projeto `https://github.com/felipebravo/clients-contacts-api.git`;
- Execute o comando `yarn install` no diretório do projeto para instalar todas as dependências necessárias;
- Com o PostgreSQL instalado, certifique-se da configuração para a conexão com o banco de dados;
- Execute o comando `yarn prisma migrate dev --name init` para realizar as migrações com o banco de dados;
- Execute o comando `yarn run:dev` no diretório do projeto para rodar a aplicação em modo de desenvolvedor;
- Com o servidor sendo executado a rota [http://localhost:3000](http://localhost:3000) está pronta para receber requisições;\
  **Para conhecer todas as rotas disponíveis acesse [Documentação API](http://localhost:3000/api) com o servidor sendo executado.**
- Pronto 🎉

**Como realizar contribuições para o projeto?**

- Execute o comando `git checkout -b <nome-da-nova-branch> master` no diretório do projeto para criar uma nova branch;
- Realize um commit convencional das alterações realizadas `git commit -m "feat: <descrição-do-commit>`
- Execute o comando `git push origin <sua-branch>` para enviar as contribuições.
- Pronto 🎉

### `yarn run:dev`

Executa a aplicação em modo de desenvolvimento.

## Como o projeto está estruturado

```
clients-contacts-api
├── 📁 node_modules ➡️ Dependências instaladas pelo yarn.
├── 📁 prisma ➡️ Gerenciamento do modelo dos dados junto ao banco de dados.
├── 📂 src ➡️ Código fonte do projeto.
│   ├── 📁 database ➡️ Gerenciamento da conexão com o banco de dados.
│   ├── 📁 modules ➡️ Entidades da API, atualmente User e Contact.
│   ├── app.module.ts ➡️ Módulo principal.
│   ├── main.ts ➡️ Ponto de entrada da aplicação.
├── .env.example ➡️ Exemplo das váriaveis de ambiente.
├── .gitignore ➡️ Arquivo que devem ser ignorados pelo Git.
├── package.json ➡️ Informações do projeto e as dependências utilizadas.
├── README.md ➡️ Documentação do projeto.
├── tsconfig.json ➡️ Configuração do TypeScript.
├── yarn-error.log ➡️ Gerado pelo yarn.
└── yarn.lock ➡️ Gerado pelo yarn.
```

## Tecnologias 💻

- **NestJS**
- **TypeScript**
- **PrismaORM**
- **CORS**
- **JSON Web Token (JWT)**
- **PostgreSQL**
- **Swagger**

## Créditos 👨‍💻

- Felipe Bravo [:octocat:](https://github.com/felipebravo)

## Fullstack

Essa aplicação faz parte de um projeto fullstack, acesse [Client Contacts Frontend](https://github.com/felipebravo/clients-contacts-frontend.git) para aproveitar uma estrutura frontend pronta.

## Saiba mais

Você pode conhecer mais em [NestJS](https://docs.nestjs.com/).

Você pode conhecer mais em [PrismaORM](https://www.prisma.io/docs/getting-started/quickstart).
