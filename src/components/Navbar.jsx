import { NavLink } from 'react-router-dom';
import Button from './Button';

function Navbar({ darkMode, toggleDarkMode, favoritesCount }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
        <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Users</NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
      </div>

      <div className="nav-actions">
        <span className="favorites-count">Favorites: {favoritesCount}</span>
        <Button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
