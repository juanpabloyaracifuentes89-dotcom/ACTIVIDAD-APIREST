import { useState, useEffect } from 'react';
import mediaService from '../../services/mediaService';
import generoService from '../../services/generoService';
import directorService from '../../services/directorService';
import productoraService from '../../services/productoraService';
import tipoService from '../../services/tipoService';

import MediaList from './MediaList';
import MediaForm from './MediaForm';

const MediaPage = () => {
  const [medias, setMedias] = useState([]);
  
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);

  useEffect(() => { 
    fetchBaseData();
    fetchMedias(); 
  }, []);

  const fetchBaseData = async () => {
    try {
      const [genData, dirData, prodData, tipoData] = await Promise.all([
        generoService.getAll(),
        directorService.getAll(),
        productoraService.getAll(),
        tipoService.getAll()
      ]);
      setGeneros(genData);
      setDirectores(dirData);
      setProductoras(prodData);
      setTipos(tipoData);
    } catch (error) {
      console.error("Error cargando catálogos.", error);
    }
  };

  const fetchMedias = async () => {
    setLoading(true); setErrorMsg('');
    try { const data = await mediaService.getAll(); setMedias(data); }
    catch (error) { setErrorMsg('Error al conectar con el servidor.'); }
    finally { setLoading(false); }
  };

  const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 4000); };

  const handleCreateOrUpdate = async (formData) => {
    setLoading(true); setErrorMsg('');
    try {
      if (editingMedia) { await mediaService.update(editingMedia._id, formData); showSuccess('Contenido actualizado exitosamente'); }
      else { await mediaService.create(formData); showSuccess('Contenido creado correctamente'); }
      setShowForm(false); setEditingMedia(null); fetchMedias();
    } catch (error) { setErrorMsg(error.response?.data?.message || 'Error al guardar el contenido'); setLoading(false); }
  };

  const handleEdit = (media) => { setEditingMedia(media); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar definitivamente este contenido del catálogo?')) return;
    setLoading(true);
    try { await mediaService.remove(id); showSuccess('Contenido eliminado.'); fetchMedias(); }
    catch (error) { setErrorMsg('Error de red al intentar eliminar.'); setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 pb-4 border-b border-gray-200">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-[#c8102e] tracking-tight mb-2">Catálogo Media</h1>
          <p className="text-sm text-gray-500 font-medium">Administración general de películas y series de la plataforma de streaming.</p>
        </div>
        {!showForm && (<button onClick={() => { setEditingMedia(null); setShowForm(true); }} className="w-full md:w-auto px-6 py-3 bg-[#c8102e] text-white font-bold rounded-lg shadow-lg hover:bg-[#a00c24] hover:shadow-xl hover:-translate-y-0.5 transition-all">+ Nueva Publicación</button>)}
      </div>
      
      {errorMsg && <div className="mb-6 p-4 rounded-md bg-red-50 border-l-4 border-red-500 shadow text-sm font-medium text-red-800">{errorMsg}</div>}
      {successMsg && <div className="mb-6 p-4 rounded-md bg-green-50 border-l-4 border-green-500 shadow text-sm font-medium text-green-800">{successMsg}</div>}
      
      {showForm && (
        <MediaForm 
          initialData={editingMedia} 
          onSubmit={handleCreateOrUpdate} 
          onCancel={() => { setShowForm(false); setEditingMedia(null); }} 
          generos={generos}
          directores={directores}
          productoras={productoras}
          tipos={tipos}
        />
      )}
      
      {loading && !showForm ? (
        <div className="flex justify-center items-center py-24"><div className="animate-pulse flex flex-col items-center"><div className="h-12 w-12 border-4 border-slate-200 border-t-[#c8102e] rounded-full animate-spin mb-4"></div><p className="text-gray-500 text-lg font-bold">Cargando catálogo...</p></div></div>
      ) : (
        <MediaList 
          medias={medias} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          generos={generos}
          directores={directores}
          productoras={productoras}
          tipos={tipos}
        />
      )}
    </div>
  );
};
export default MediaPage;
