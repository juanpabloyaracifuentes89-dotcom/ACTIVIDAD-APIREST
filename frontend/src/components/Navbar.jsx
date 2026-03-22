import { Link, useLocation } from 'react-router-dom';
import { FiFilm, FiUsers, FiVideo, FiTag, FiPlayCircle } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Catálogo Media', path: '/medias', icon: <FiPlayCircle className="mr-2" /> },
    { name: 'Géneros', path: '/generos', icon: <FiTag className="mr-2" /> },
    { name: 'Directores', path: '/directores', icon: <FiUsers className="mr-2" /> },
    { name: 'Productoras', path: '/productoras', icon: <FiVideo className="mr-2" /> },
    { name: 'Tipos', path: '/tipos', icon: <FiFilm className="mr-2" /> },
  ];

  return (
    <nav className="bg-[#0b1c2c] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl tracking-tight text-white">StreamingIUD</span>
            </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
