import { useState, useEffect } from 'react';
import productoraService from '../../services/productoraService';
import ProductoraList from './ProductoraList';
import ProductoraForm from './ProductoraForm';

const ProductoraPage = () => {
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProductora, setEditingProductora] = useState(null);

  useEffect(() => { fetchProductoras(); }, []);

  const fetchProductoras = async () => {
    setLoading(true); setErrorMsg('');
    try { const data = await productoraService.getAll(); setProductoras(data); }
    catch (error) { setErrorMsg('Error al conectar con el servidor.'); }
    finally { setLoading(false); }
  };

  const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 4000); };

  const handleCreateOrUpdate = async (formData) => {
    setLoading(true); setErrorMsg('');
    try {
      if (editingProductora) { await productoraService.update(editingProductora._id, formData); showSuccess('Registro actualizado correctamente'); }
      else { await productoraService.create(formData); showSuccess('Registro creado correctamente'); }
      setShowForm(false); setEditingProductora(null); fetchProductoras();
    } catch (error) { setErrorMsg(error.response?.data?.message || 'Error al guardar el registro'); setLoading(false); }
  };

  const handleEdit = (prod) => { setEditingProductora(prod); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este registro?')) return;
    setLoading(true);
    try { await productoraService.remove(id); showSuccess('Registro eliminado correctamente'); fetchProductoras(); }
    catch (error) { setErrorMsg('Error al conectar al intentar eliminar.'); setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gestión de Productoras</h1>
        </div>
        {!showForm && (<button onClick={() => { setEditingProductora(null); setShowForm(true); }} className="w-full md:w-auto px-5 py-2.5 bg-[#c8102e] text-white font-medium rounded-md shadow hover:bg-[#a00c24] transition-colors">+ Nueva Productora</button>)}
      </div>
      {errorMsg && <div className="mb-6 p-4 rounded-md bg-red-50 border-l-4 border-red-500 shadow-sm"><p className="text-sm font-medium text-red-800">{errorMsg}</p></div>}
      {successMsg && <div className="mb-6 p-4 rounded-md bg-green-50 border-l-4 border-green-500 shadow-sm"><p className="text-sm font-medium text-green-800">{successMsg}</p></div>}
      {showForm && <ProductoraForm initialData={editingProductora} onSubmit={handleCreateOrUpdate} onCancel={() => { setShowForm(false); setEditingProductora(null); }} />}
      {loading && !showForm ? (<div className="flex justify-center items-center py-20"><div className="animate-pulse flex flex-col items-center"><div className="h-10 w-10 border-4 border-slate-200 border-t-[#c8102e] rounded-full animate-spin mb-4"></div><p className="text-gray-500 text-lg font-medium">Cargando datos...</p></div></div>) : (<ProductoraList productoras={productoras} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};
export default ProductoraPage;
