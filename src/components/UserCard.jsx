import { Link } from 'react-router-dom';
import Button from './Button';

const avatarThemes = ['sage', 'mint', 'peach', 'blue', 'lavender', 'sand'];

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function UserCard({ user, isFavorite, onToggleFavorite }) {
  const avatarTheme = avatarThemes[(user.id - 1) % avatarThemes.length];

  return (
    <article className="team-card">
      <div className="team-card-top">
        <div className={`team-avatar ${avatarTheme}`} aria-hidden="true">
          {getInitials(user.name)}
        </div>
        <Button
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          onClick={() => onToggleFavorite(user.id)}
          aria-label={isFavorite ? `Remove ${user.name} from favorites` : `Add ${user.name} to favorites`}
          aria-pressed={isFavorite}
        >
          <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
        </Button>
      </div>

      <span className="team-company">{user.company}</span>
      <h2 className="team-name">{user.name}</h2>
      <p className="team-role">{user.role}</p>

      <div className="team-card-footer">
        <a href={`mailto:${user.email}`} className="email-link">{user.email}</a>
        <Link className="details-link" to={`/users/${user.id}`} aria-label={`View ${user.name}'s profile`}>
          View profile <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default UserCard;
