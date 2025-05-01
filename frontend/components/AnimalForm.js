import { useState } from 'react';

export default function AnimalForm({ animal, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: animal?.name || '',
    species: animal?.species || '',
    age: animal?.age || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    }
    
    if (!formData.species.trim()) {
      newErrors.species = 'A espécie é obrigatória';
    }
    
    if (!formData.age) {
      newErrors.age = 'A idade é obrigatória';
    } else if (isNaN(formData.age) || Number(formData.age) < 0) {
      newErrors.age = 'A idade deve ser um número positivo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        age: Number(formData.age),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
          Espécie
        </label>
        <input
          type="text"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.species ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.species && <p className="mt-1 text-sm text-red-500">{errors.species}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Idade
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {animal ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}