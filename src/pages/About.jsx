import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    number: '01',
    title: 'Find teammates',
    description: 'Search people by name, role, email, or organization and narrow the list with filters.',
  },
  {
    number: '02',
    title: 'Get the details',
    description: 'Open a profile to see a teammate’s contact information, role, and organization.',
  },
  {
    number: '03',
    title: 'Keep favorites',
    description: 'Star the people you work with most and filter the directory to see them quickly.',
  },
];

function About() {
  useEffect(() => {
    document.title = 'Team Directory | About';
  }, []);

  return (
    <main className="page about-page">
      <section className="about-hero">
        <span className="eyebrow">ABOUT THIS PROJECT</span>
        <h1 className="page-title">Better connected,<br />better together.</h1>
        <p className="page-description">
          Team Directory is a small people-finder built to make it easier to
          discover who is on the team, what they do, and how to reach them.
        </p>
        <Link className="button button-primary" to="/users">
          Browse team members <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="about-feature-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>Everything you need to find your people.</h2>
          </div>
        </div>

        <div className="about-feature-grid">
          {features.map((feature) => (
            <article className="about-feature-card" key={feature.number}>
              <span className="about-feature-number">{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-lab-note">
        <div className="note-mark" aria-hidden="true">TD</div>
        <div>
          <span className="eyebrow">THE LAB</span>
          <h2>Built with React</h2>
          <p>
            This project brings together reusable components, client-side
            routing, local team data, and React state and effects.
          </p>
        </div>
        <Link className="text-link" to="/">Back to overview <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}

export default About;
