import { useState, useEffect } from 'react';

const MediaForm = ({ initialData, onSubmit, onCancel, generos, directores, productoras, tipos }) => {
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        genero: initialData.genero?._id || initialData.genero || '',
        director: initialData.director?._id || initialData.director || '',
        productora: initialData.productora?._id || initialData.productora || '',
        tipo: initialData.tipo?._id || initialData.tipo || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serial.trim() || !formData.titulo.trim() || !formData.url.trim() || !formData.anioEstreno) {
      setError('Serial, título, url y año de estreno son campos obligatorios.');
      return;
    }
    if (!formData.genero || !formData.director || !formData.productora || !formData.tipo) {
      setError('Las relaciones (género, director, productora y tipo) deben ser seleccionadas.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{initialData ? 'Editar Contenido' : 'Nuevo Contenido en Catálogo'}</h3>
      {error && <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm font-medium text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700">Serial</label>
            <input type="text" name="serial" value={formData.serial} onChange={handleChange} placeholder="M-001" className="mt-1 w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all font-mono text-sm" />
          </div>
          <div className="lg:col-span-3">
            <label className="block text-sm font-semibold text-gray-700">Título</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Interstellar" className="mt-1 w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all text-sm font-medium" />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold text-gray-700">URL del Contenido</label>
            <input type="url" name="url" value={formData.url} onChange={handleChange} placeholder="https://..." className="mt-1 w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all text-sm" />
          </div>
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700">Año de Estreno</label>
            <input type="number" name="anioEstreno" value={formData.anioEstreno} onChange={handleChange} placeholder="2014" className="mt-1 w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all text-sm" />
          </div>
          
          <div className="md:col-span-2 lg:col-span-4">
            <label className="block text-sm font-semibold text-gray-700">Imagen Portada (URL)</label>
            <input type="url" name="imagen" value={formData.imagen} onChange={handleChange} placeholder="https://..." className="mt-1 w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all text-sm" />
          </div>
          
          <div className="md:col-span-2 lg:col-span-4">
            <label className="block text-sm font-semibold text-gray-700">Sinopsis</label>
            <textarea name="sinopsis" value={formData.sinopsis} onChange={handleChange} rows="3" placeholder="Descripción breve de la película/serie..." className="mt-1 w-full rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all text-sm" />
          </div>

          <div className="p-5 bg-gray-50 rounded-lg md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border border-slate-200">
            <div>
              <label className="block text-sm font-bold text-[#0b1c2c] mb-1">Género</label>
              <select name="genero" value={formData.genero} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 shadow-sm text-sm focus:border-[#c8102e]">
                <option value="">Seleccione Género...</option>
                {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0b1c2c] mb-1">Director</label>
              <select name="director" value={formData.director} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 shadow-sm text-sm focus:border-[#c8102e]">
                <option value="">Seleccione Director...</option>
                {directores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0b1c2c] mb-1">Productora</label>
              <select name="productora" value={formData.productora} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 shadow-sm text-sm focus:border-[#c8102e]">
                <option value="">Seleccione Prod...</option>
                {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0b1c2c] mb-1">Tipo</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full rounded border border-gray-300 p-2 shadow-sm text-sm focus:border-[#c8102e]">
                <option value="">Seleccione Tipo...</option>
                {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors">Cancelar</button>
          <button type="submit" className="px-5 py-2.5 border border-transparent rounded-md text-white bg-[#c8102e] hover:bg-[#a00c24] font-bold shadow-md transition-colors">{initialData ? 'Actualizar Contenido' : 'Guardar en Catálogo'}</button>
        </div>
      </form>
    </div>
  );
};
export default MediaForm;
