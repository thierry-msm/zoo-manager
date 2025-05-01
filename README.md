# 🦁 Sistema de Gerenciamento de Animais para Zoológico

Um aplicativo web completo para gerenciar o cadastro de animais em um zoológico, com funcionalidades CRUD (Create, Read, Update, Delete).

## 📋 Visão Geral

Este projeto é uma aplicação fullstack que consiste em:

- **Backend**: API REST usando Fastify e Prisma ORM conectado a um banco de dados PostgreSQL
- **Frontend**: Interface de usuário responsiva em React com Next.js e estilização com TailwindCSS

## 🚀 Funcionalidades

- Listar todos os animais cadastrados
- Visualizar detalhes de um animal específico
- Adicionar novos animais ao sistema
- Editar informações de animais existentes
- Remover animais do registro

## 🔧 Tecnologias Utilizadas

### Backend
- [Fastify](https://www.fastify.io/) - Framework web rápido e de baixa sobrecarga
- [Prisma](https://www.prisma.io/) - ORM moderno para Node.js e TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript

### Frontend
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [Next.js](https://nextjs.org/) - Framework React com renderização do lado do servidor
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário

## 📁 Estrutura do Projeto

```
zoo-management/
├── backend/                # Código do servidor
│   ├── prisma/             # Schema e migrações do Prisma
│   ├── .env                # Variáveis de ambiente
│   ├── package.json        # Dependências do backend
│   └── server.js           # Aplicação Fastify
│
└── frontend/               # Código da interface de usuário
    ├── components/         # Componentes React reutilizáveis
    │   ├── AnimalForm.js   # Formulário para adicionar/editar animais
    │   └── AnimalList.js   # Lista de animais
    ├── pages/              # Páginas da aplicação
    │   ├── _app.js         # Configuração do Next.js
    │   └── index.js        # Página principal
    ├── services/           # Serviços para chamadas de API
    │   └── animalService.js # Funções para interagir com a API
    ├── styles/             # Estilos globais
    ├── package.json        # Dependências do frontend
    ├── tailwind.config.js  # Configuração do TailwindCSS
    └── postcss.config.js   # Configuração do PostCSS
```

## 🛠️ Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL
- NPM ou Yarn

## ⚙️ Configuração e Instalação

### Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o arquivo `.env` com a URL de conexão do seu banco de dados PostgreSQL:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/zoodb"
   ```

4. Execute as migrações do Prisma para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

O servidor estará rodando em `http://localhost:3001`.

### Frontend

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

O frontend estará disponível em `http://localhost:3000`.

## 🔄 Uso da API

### Endpoints disponíveis

- `GET /animals` - Retorna todos os animais
- `GET /animals/:id` - Retorna um animal específico
- `POST /animals` - Cria um novo animal
- `PUT /animals/:id` - Atualiza um animal existente
- `DELETE /animals/:id` - Remove um animal

### Exemplo de requisição para criar um animal

```bash
curl -X POST http://localhost:3001/animals \
  -H "Content-Type: application/json" \
  -d '{"name":"Simba","species":"Leão","age":5}'
```

## 📱 Interface de Usuário

A interface permite que os usuários:

1. Visualizem uma lista de todos os animais cadastrados
2. Adicionem novos animais através de um formulário
3. Editem animais existentes
4. Removam animais do sistema
