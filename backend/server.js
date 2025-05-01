const fastify = require('fastify')({ logger: true });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Configuração de CORS
fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Rotas para os animais
// GET /animals - Listar todos os animais
fastify.get('/animals', async (request, reply) => {
  try {
    const animals = await prisma.animal.findMany();
    return animals;
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao buscar animais' });
  }
});

// GET /animals/:id - Buscar um animal específico
fastify.get('/animals/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: Number(id) },
    });
    
    if (!animal) {
      reply.status(404).send({ error: 'Animal não encontrado' });
      return;
    }
    
    return animal;
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao buscar animal' });
  }
});

// POST /animals - Criar novo animal
fastify.post('/animals', async (request, reply) => {
  const { name, species, age } = request.body;
  
  // Validação simples
  if (!name || !species || age === undefined) {
    reply.status(400).send({ error: 'Nome, espécie e idade são obrigatórios' });
    return;
  }
  
  try {
    const animal = await prisma.animal.create({
      data: {
        name,
        species,
        age: Number(age),
      },
    });
    
    reply.status(201).send(animal);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar animal' });
  }
});

// PUT /animals/:id - Atualizar um animal existente
fastify.put('/animals/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, species, age } = request.body;
  
  // Validação simples
  if (!name || !species || age === undefined) {
    reply.status(400).send({ error: 'Nome, espécie e idade são obrigatórios' });
    return;
  }
  
  try {
    const animal = await prisma.animal.update({
      where: { id: Number(id) },
      data: {
        name,
        species,
        age: Number(age),
      },
    });
    
    return animal;
  } catch (error) {
    if (error.code === 'P2025') {
      reply.status(404).send({ error: 'Animal não encontrado' });
    } else {
      reply.status(500).send({ error: 'Erro ao atualizar animal' });
    }
  }
});

// DELETE /animals/:id - Remover um animal
fastify.delete('/animals/:id', async (request, reply) => {
  const { id } = request.params;
  
  try {
    await prisma.animal.delete({
      where: { id: Number(id) },
    });
    
    reply.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      reply.status(404).send({ error: 'Animal não encontrado' });
    } else {
      reply.status(500).send({ error: 'Erro ao remover animal' });
    }
  }
});

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Servidor rodando em ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();