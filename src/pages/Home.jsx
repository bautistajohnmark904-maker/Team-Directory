import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { users } from '../data/users';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Home({ favorites }) {
  const companies = new Set(users.map((user) => user.company)).size;
  const featuredMembers = users.slice(0, 3);

  useEffect(() => {
    document.title = 'Team Directory | Overview';
  }, []);

  return (
    <main className="page home-page">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <span className="eyebrow">TEAM DIRECTORY / OVERVIEW</span>
          <h1>Your people,<br />all in one place.</h1>
          <p>
            Find teammates, learn what they do, and keep the people you work
            with most close at hand.
          </p>
          <Link className="button button-primary" to="/users">
            Explore the directory <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-initials">TD</div>
          <span className="orbit-tag tag-one">People</span>
          <span className="orbit-tag tag-two">Together</span>
          <span className="orbit-tag tag-three">Teams</span>
        </div>
      </section>

      <section className="overview-stats" aria-label="Directory overview">
        <article className="overview-stat">
          <span className="stat-icon">01</span>
          <div><strong>{users.length}</strong><span>Team members</span></div>
        </article>
        <article className="overview-stat">
          <span className="stat-icon">02</span>
          <div><strong>{companies}</strong><span>Organizations</span></div>
        </article>
        <article className="overview-stat">
          <span className="stat-icon">03</span>
          <div><strong>{favorites.length}</strong><span>Your favorites</span></div>
        </article>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GET TO KNOW THE TEAM</span>
            <h2>Meet a few members</h2>
          </div>
          <Link className="text-link" to="/users">View everyone <span aria-hidden="true">→</span></Link>
        </div>

        <div className="member-preview-grid">
          {featuredMembers.map((user, index) => (
            <Link className="member-preview" to={`/users/${user.id}`} key={user.id}>
              <div className={`member-avatar avatar-${index + 1}`}>{getInitials(user.name)}</div>
              <div className="member-preview-copy">
                <span className="member-company">{user.company}</span>
                <h3>{user.name}</h3>
                <p>{user.role}</p>
              </div>
              <span className="preview-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-bottom-callout">
        <div>
          <span className="eyebrow">BUILT FOR EASY DISCOVERY</span>
          <h2>Looking for someone?</h2>
          <p>Search by name, role, or organization in the team directory.</p>
        </div>
        <Link className="button button-outline" to="/users">Search team <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}

export default Home;
