import { useState, useEffect } from 'react';
import AnimalList from '../components/AnimalList';
import AnimalForm from '../components/AnimalForm';
import { getAnimals, createAnimal, updateAnimal, deleteAnimal } from '../services/animalService';

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Buscar a lista de animais ao carregar a página
  useEffect(() => {
    fetchAnimals();
  }, []);

  // Função para buscar todos os animais
  const fetchAnimals = async () => {
    setIsLoading(true);
    try {
      const data = await getAnimals();
      setAnimals(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar a lista de animais');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para adicionar um novo animal
  const handleAddAnimal = async (animalData) => {
    try {
      await createAnimal(animalData);
      setShowForm(false);
      fetchAnimals();
    } catch (err) {
      setError('Erro ao adicionar animal');
      console.error(err);
    }
  };

  // Função para atualizar um animal
  const handleUpdateAnimal = async (animalData) => {
    try {
      await updateAnimal(editingAnimal.id, animalData);
      setEditingAnimal(null);
      setShowForm(false);
      fetchAnimals();
    } catch (err) {
      setError('Erro ao atualizar animal');
      console.error(err);
    }
  };

  // Função para deletar um animal
  const handleDeleteAnimal = async (id) => {
    try {
      await deleteAnimal(id);
      fetchAnimals();
    } catch (err) {
      setError('Erro ao deletar animal');
      console.error(err);
    }
  };

  // Função para iniciar a edição de um animal
  const startEdit = (animal) => {
    setEditingAnimal(animal);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Gerenciamento de Animais do Zoológico
          </h1>
        </header>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => {
              setEditingAnimal(null);
              setShowForm(!showForm);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancelar' : 'Adicionar Animal'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingAnimal ? 'Editar Animal' : 'Adicionar Novo Animal'}
            </h2>
            <AnimalForm 
              animal={editingAnimal}
              onSubmit={editingAnimal ? handleUpdateAnimal : handleAddAnimal}
              onCancel={() => {
                setEditingAnimal(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Carregando...</p>
          </div>
        ) : (
          <AnimalList
            animals={animals}
            onEdit={startEdit}
            onDelete={handleDeleteAnimal}
          />
        )}
      </div>
    </div>
  );
}