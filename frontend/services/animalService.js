const API_URL = 'http://localhost:3001';

// Buscar todos os animais
export const getAnimals = async () => {
  const response = await fetch(`${API_URL}/animals`);
  
  if (!response.ok) {
    throw new Error('Falha ao buscar animais');
  }
  
  return response.json();
};

// Buscar um animal específico
export const getAnimalById = async (id) => {
  const response = await fetch(`${API_URL}/animals/${id}`);
  
  if (!response.ok) {
    throw new Error('Falha ao buscar animal');
  }
  
  return response.json();
};

// Criar um novo animal
export const createAnimal = async (animalData) => {
  const response = await fetch(`${API_URL}/animals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(animalData),
  });
  
  if (!response.ok) {
    throw new Error('Falha ao criar animal');
  }
  
  return response.json();
};

// Atualizar um animal existente
export const updateAnimal = async (id, animalData) => {
  const response = await fetch(`${API_URL}/animals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(animalData),
  });
  
  if (!response.ok) {
    throw new Error('Falha ao atualizar animal');
  }
  
  return response.json();
};

// Deletar um animal
export const deleteAnimal = async (id) => {
  const response = await fetch(`${API_URL}/animals/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Falha ao deletar animal');
  }
  
  return true;
};