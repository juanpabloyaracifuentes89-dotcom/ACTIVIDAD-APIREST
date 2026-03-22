import { useState, useEffect } from 'react';
import tipoService from '../../services/tipoService';
import TipoList from './TipoList';
import TipoForm from './TipoForm';

const TipoPage = () => {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTipo, setEditingTipo] = useState(null);

  useEffect(() => { fetchTipos(); }, []);

  const fetchTipos = async () => {
    setLoading(true); setErrorMsg('');
    try { const data = await tipoService.getAll(); setTipos(data); }
    catch (error) { setErrorMsg('Error al conectar con el servidor.'); }
    finally { setLoading(false); }
  };

  const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 4000); };

  const handleCreateOrUpdate = async (formData) => {
    setLoading(true); setErrorMsg('');
    try {
      if (editingTipo) { await tipoService.update(editingTipo._id, formData); showSuccess('Registro actualizado correctamente'); }
      else { await tipoService.create(formData); showSuccess('Registro creado correctamente'); }
      setShowForm(false); setEditingTipo(null); fetchTipos();
    } catch (error) { setErrorMsg(error.response?.data?.message || 'Error al guardar el registro'); setLoading(false); }
  };

  const handleEdit = (tipo) => { setEditingTipo(tipo); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este registro?')) return;
    setLoading(true);
    try { await tipoService.remove(id); showSuccess('Registro eliminado correctamente'); fetchTipos(); }
    catch (error) { setErrorMsg('Error al conectar al intentar eliminar.'); setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gestión de Tipos</h1>
        </div>
        {!showForm && (<button onClick={() => { setEditingTipo(null); setShowForm(true); }} className="px-5 py-2.5 bg-[#c8102e] text-white font-medium rounded-md shadow hover:bg-[#a00c24] transition-colors">+ Nuevo Tipo</button>)}
      </div>
      {errorMsg && <div className="mb-6 p-4 rounded-md bg-red-50 border-l-4 border-red-500 shadow-sm"><p className="text-sm font-medium text-red-800">{errorMsg}</p></div>}
      {successMsg && <div className="mb-6 p-4 rounded-md bg-green-50 border-l-4 border-green-500 shadow-sm"><p className="text-sm font-medium text-green-800">{successMsg}</p></div>}
      {showForm && <TipoForm initialData={editingTipo} onSubmit={handleCreateOrUpdate} onCancel={() => { setShowForm(false); setEditingTipo(null); }} />}
      {loading && !showForm ? (<div className="flex justify-center items-center py-20"><div className="animate-pulse flex flex-col items-center"><div className="h-10 w-10 border-4 border-slate-200 border-t-[#c8102e] rounded-full animate-spin mb-4"></div><p className="text-gray-500 text-lg font-medium">Cargando datos...</p></div></div>) : (<TipoList tipos={tipos} onEdit={handleEdit} onDelete={handleDelete} />)}
    </div>
  );
};
export default TipoPage;
