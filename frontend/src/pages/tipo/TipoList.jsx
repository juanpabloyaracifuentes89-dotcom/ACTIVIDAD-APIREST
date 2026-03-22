const TipoList = ({ tipos, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tipos.map((tipo) => (
            <tr key={tipo._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tipo.nombre}</td>
              <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-sm">{tipo.descripcion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                <button onClick={() => onEdit(tipo)} className="text-[#0b1c2c] hover:text-[#c8102e] transition-colors font-semibold">Editar</button>
                <button onClick={() => onDelete(tipo._id)} className="text-red-600 hover:text-red-900 transition-colors font-semibold">Eliminar</button>
              </td>
            </tr>
          ))}
          {tipos.length === 0 && (
            <tr>
              <td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500 bg-gray-50">No hay tipos registrados en el sistema.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default TipoList;
