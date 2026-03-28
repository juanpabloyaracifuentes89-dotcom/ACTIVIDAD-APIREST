import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GeneroPage from './pages/genero/GeneroPage';
import DirectorPage from './pages/director/DirectorPage';
import ProductoraPage from './pages/productora/ProductoraPage';
import TipoPage from './pages/tipo/TipoPage';
import MediaPage from './pages/media/MediaPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/medias" replace />} />
            <Route path="/medias" element={<MediaPage />} />
            <Route path="/generos" element={<GeneroPage />} />
            <Route path="/directores" element={<DirectorPage />} />
            <Route path="/productoras" element={<ProductoraPage />} />
            <Route path="/tipos" element={<TipoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
