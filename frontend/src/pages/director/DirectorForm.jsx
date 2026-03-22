import { useState, useEffect } from 'react';

const DirectorForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'activo'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || formData.nombre.length < 3) {
      setError('El nombre es requerido y debe tener al menos 3 caracteres.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{initialData ? 'Editar Director' : 'Nuevo Director'}</h3>
      {error && <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Christopher Nolan" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#c8102e] focus:ring-[#c8102e] sm:text-sm p-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#c8102e] focus:ring-[#c8102e] sm:text-sm p-2 border">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">Cancelar</button>
          <button type="submit" className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#c8102e] hover:bg-[#a00c24] transition-colors">{initialData ? 'Actualizar Registro' : 'Guardar Nuevo Registro'}</button>
        </div>
      </form>
    </div>
  );
};
export default DirectorForm;
