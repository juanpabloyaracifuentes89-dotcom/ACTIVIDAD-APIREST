import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiFilm, FiUsers, FiVideo, FiTag, FiPlayCircle, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Catálogo Media', path: '/medias', icon: <FiPlayCircle className="mr-2" /> },
    { name: 'Géneros', path: '/generos', icon: <FiTag className="mr-2" /> },
    { name: 'Directores', path: '/directores', icon: <FiUsers className="mr-2" /> },
    { name: 'Productoras', path: '/productoras', icon: <FiVideo className="mr-2" /> },
    { name: 'Tipos', path: '/tipos', icon: <FiFilm className="mr-2" /> },
  ];

  return (
    <nav className="bg-[#0b1c2c] text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex justify-between w-full md:w-auto">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl tracking-tight text-white">StreamingIUD</span>
            </div>
            
            {/* Botón menú móvil */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 focus:outline-none"
              >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Menú normal escritorio */}
          <div className="hidden md:flex ml-10 space-x-4 lg:space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-[#c8102e] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b1c2c] border-t border-gray-700 absolute w-full shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-[#c8102e] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
