import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { users } from '../data/users';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function UserDetails({ favorites, setFavorites }) {
  const { id } = useParams();
  const user = users.find((item) => item.id === Number(id));
  const isFavorite = user ? favorites.includes(user.id) : false;

  useEffect(() => {
    document.title = user ? `${user.name} | Team Directory` : 'Member not found | Team Directory';
  }, [user]);

  if (!user) {
    return (
      <main className="page detail-page">
        <section className="empty-state">
          <span className="empty-icon" aria-hidden="true">?</span>
          <h1>Member not found</h1>
          <p>This profile may have moved or the address may be incorrect.</p>
          <Link className="button button-primary" to="/users">Return to the directory</Link>
        </section>
      </main>
    );
  }

  const toggleFavorite = () => {
    setFavorites((previous) =>
      previous.includes(user.id)
        ? previous.filter((favoriteId) => favoriteId !== user.id)
        : [...previous, user.id],
    );
  };

  return (
    <main className="page detail-page">
      <Link className="back-link" to="/users"><span aria-hidden="true">←</span> All team members</Link>

      <section className="profile-card">
        <div className="profile-heading">
          <div className="profile-avatar">{getInitials(user.name)}</div>
          <div className="profile-title">
            <span className="eyebrow">TEAM MEMBER / PROFILE</span>
            <h1>{user.name}</h1>
            <p>{user.role}</p>
          </div>
          <Button
            className={`profile-favorite${isFavorite ? ' is-favorite' : ''}`}
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
          >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
            {isFavorite ? 'Saved to favorites' : 'Add to favorites'}
          </Button>
        </div>

        <div className="profile-divider" />

        <div className="profile-details-grid">
          <div className="profile-detail">
            <span>Organization</span>
            <strong>{user.company}</strong>
          </div>
          <div className="profile-detail">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
          <div className="profile-detail">
            <span>Email</span>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>
      </section>

      <section className="profile-contact">
        <div>
          <span className="eyebrow">START A CONVERSATION</span>
          <h2>Want to connect with {user.name.split(' ')[0]}?</h2>
        </div>
        <a className="button button-primary" href={`mailto:${user.email}`}>
          Email {user.name.split(' ')[0]} <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}

export default UserDetails;
