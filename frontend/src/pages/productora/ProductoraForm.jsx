import { useState, useEffect } from 'react';

const ProductoraForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'activo',
    slogan: '',
    descripcion: ''
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
    if (!formData.slogan.trim() || !formData.descripcion.trim()) {
      setError('El slogan y la descripción son requeridos.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{initialData ? 'Editar Productora' : 'Nueva Productora'}</h3>
      {error && <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2">
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slogan</label>
          <input type="text" name="slogan" value={formData.slogan} onChange={handleChange} className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border border-gray-300 p-2" />
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">Cancelar</button>
          <button type="submit" className="px-4 py-2 border border-transparent rounded-md text-white bg-[#c8102e] hover:bg-[#a00c24]">{initialData ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  );
};
export default ProductoraForm;
