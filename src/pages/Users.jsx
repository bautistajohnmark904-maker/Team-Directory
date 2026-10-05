import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { users } from '../data/users';

function Users({ favorites, setFavorites }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [companyFilter, setCompanyFilter] = useState('All organizations');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    document.title = 'Team directory | Members';
    const timer = setTimeout(() => {
      if (!Array.isArray(users)) {
        setError('The team directory data is unavailable.');
        setLoading(false);
        return;
      }

      setData(users);
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const companies = useMemo(
    () => [...new Set(data.map((user) => user.company))],
    [data],
  );

  const filteredUsers = data.filter((user) => {
    const searchText = search.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      [user.name, user.role, user.company, user.email]
        .some((value) => value.toLowerCase().includes(searchText));
    const matchesCompany =
      companyFilter === 'All organizations' || user.company === companyFilter;
    const matchesFavorite = !favoritesOnly || favorites.includes(user.id);

    return matchesSearch && matchesCompany && matchesFavorite;
  });

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id],
    );
  };

  if (loading) {
    return <main className="page state-page"><Loader /></main>;
  }

  if (error) {
    return <main className="page state-page"><ErrorMessage message={error} /></main>;
  }

  return (
    <main className="page users-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">PEOPLE / DIRECTORY</span>
          <h1 className="page-title">Meet the team.</h1>
          <p className="page-description">
            Browse the people behind the work. Search by name, role, or organization.
          </p>
        </div>
        <div className="intro-count"><strong>{data.length}</strong><span>members</span></div>
      </section>

      <section className="directory-toolbar" aria-label="Search and filter team members">
        <label className="search-field">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <span className="visually-hidden">Search members</span>
          <input
            type="search"
            placeholder="Search name, role, or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button className="clear-search" type="button" onClick={() => setSearch('')} aria-label="Clear search">
              ×
            </button>
          )}
        </label>

        <label className="select-field">
          <span className="visually-hidden">Filter by organization</span>
          <select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)}>
            <option>All organizations</option>
            {companies.map((company) => <option key={company}>{company}</option>)}
          </select>
        </label>

        <button
          className={`filter-toggle${favoritesOnly ? ' selected' : ''}`}
          type="button"
          aria-pressed={favoritesOnly}
          onClick={() => setFavoritesOnly((value) => !value)}
        >
          <span aria-hidden="true">{favoritesOnly ? '★' : '☆'}</span>
          Favorites <span className="filter-count">{favorites.length}</span>
        </button>
      </section>

      <div className="results-heading">
        <p>
          Showing <strong>{filteredUsers.length}</strong> of {data.length} members
          {companyFilter !== 'All organizations' && <> in <strong>{companyFilter}</strong></>}
          {favoritesOnly && <> · favorites only</>}
        </p>
        {(search || companyFilter !== 'All organizations' || favoritesOnly) && (
          <button
            className="reset-filters"
            type="button"
            onClick={() => {
              setSearch('');
              setCompanyFilter('All organizations');
              setFavoritesOnly(false);
            }}
          >
            Reset filters
          </button>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <section className="empty-state">
          <span className="empty-icon" aria-hidden="true">⌕</span>
          <h2>{favoritesOnly && favorites.length === 0 ? 'No favorites yet' : 'No matching teammates'}</h2>
          <p>
            {favoritesOnly && favorites.length === 0
              ? 'Save a teammate with the star button and they will appear here.'
              : 'Try a different search term or clear your filters.'}
          </p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => {
              setSearch('');
              setCompanyFilter('All organizations');
              setFavoritesOnly(false);
            }}
          >
            Show all members
          </button>
        </section>
      ) : (
        <section className="users-grid" aria-label="Team members">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={favorites.includes(user.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}

      <footer className="directory-footer">
        <span>TEAM DIRECTORY</span>
        <Link to="/about">About this project <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  );
}

export default Users;
