import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={darkMode ? 'app dark' : 'app light'}>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
          favoritesCount={favorites.length}
        />

        <Routes>
          <Route path="/" element={<Home favorites={favorites} />} />
          <Route
            path="/users"
            element={<Users favorites={favorites} setFavorites={setFavorites} />}
          />
          <Route
            path="/users/:id"
            element={
              <UserDetails
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
