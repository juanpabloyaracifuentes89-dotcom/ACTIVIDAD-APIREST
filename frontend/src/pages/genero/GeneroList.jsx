const GeneroList = ({ generos, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {generos.map((genero) => (
            <tr key={genero._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{genero.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${genero.estado?.toLowerCase() === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {genero.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{genero.descripcion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                <button onClick={() => onEdit(genero)} className="text-[#0b1c2c] hover:text-[#c8102e] transition-colors font-semibold">
                  Editar
                </button>
                <button onClick={() => onDelete(genero._id)} className="text-red-600 hover:text-red-900 transition-colors font-semibold">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {generos.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500 bg-gray-50">
                No hay géneros registrados en el sistema.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default GeneroList;
