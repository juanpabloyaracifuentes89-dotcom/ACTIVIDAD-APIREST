const MediaList = ({ medias, onEdit, onDelete, generos, directores, productoras, tipos }) => {
  const getNombre = (idOrObj, list) => {
    if (!idOrObj) return 'N/A';
    if (typeof idOrObj === 'object' && idOrObj.nombre) return idOrObj.nombre;
    const found = list.find(item => item._id === idOrObj);
    return found ? found.nombre : 'N/A';
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Portada</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Serial</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Título & Año</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Clasificación Básica</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(medias) && medias.map((media) => (
            <tr key={media._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                {media.imagen ? (
                  <img src={media.imagen} alt={media.titulo} className="h-14 w-10 rounded object-cover border shadow-sm" />
                ) : (
                  <div className="h-14 w-10 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-[10px] text-center border">Sin Img</div>
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{media.serial}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                <p className="font-bold text-[#0b1c2c]">{media.titulo}</p>
                <p className="text-gray-500 text-xs">Estreno: {media.anioEstreno}</p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-700">
                <p className="mb-0.5"><span className="font-semibold text-gray-900">G:</span> {getNombre(media.genero, generos)} / <span className="font-semibold text-gray-900">T:</span> {getNombre(media.tipo, tipos)}</p>
                <p className="mb-0.5"><span className="font-semibold text-gray-900">D:</span> {getNombre(media.director, directores)}</p>
                <p><span className="font-semibold text-gray-900">P:</span> {getNombre(media.productora, productoras)}</p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium space-x-3">
                <button onClick={() => onEdit(media)} className="text-[#0b1c2c] hover:text-[#c8102e] font-bold transition-colors">Editar</button>
                <button onClick={() => onDelete(media._id)} className="text-red-600 hover:text-red-900 font-bold transition-colors">Eliminar</button>
              </td>
            </tr>
          ))}
          {Array.isArray(medias) && medias.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 bg-gray-50">No hay contenido media registrado en el catálogo.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default MediaList;
