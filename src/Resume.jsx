import React from 'react';
import { CONTACT_EMAIL, Nav, careerPages, experiences, SKILL_GROUPS, RESUME } from './App.jsx';

// Résumé page (resume.html). Experience bullets come from careerPages in App.jsx,
// so the résumé and the career pages stay in sync.
const SUMMARY = 'Mechanical engineer with 6+ years of experience designing hardware for robotic systems in cell-therapy manufacturing, warehouse automation, and consumer robotics. I specialize in injection-molded and machined consumables and robot-facing interfaces built for mass manufacturability and reliable human and robotic operation.';

const EDUCATION = [
  { title: 'B.S. in Engineering, Major in Mechanical Engineering', detail: 'Miami University · Oxford, OH', date: '2016 – 2020' },
];
const CERTS = [
  { title: 'GD&T Certification', detail: '2-B Quality · ASME Y14.5-2009 · Toronto, ON' },
];
const MAILTO = 'mailto:' + CONTACT_EMAIL;
const LINKS = [
  ['Portfolio', 'https://williamnuveen.github.io/portfolio/', 'williamnuveen.github.io/portfolio'],
  ['LinkedIn', 'https://www.linkedin.com/in/williamnuveen/', 'linkedin.com/in/williamnuveen'],
  ['GitHub', 'https://github.com/williamnuveen', 'github.com/williamnuveen'],
  CONTACT_EMAIL && ['Email', MAILTO, CONTACT_EMAIL],
].filter(Boolean);

// Split "Senior Robotics HW Engineer · May 2026 – Present" into title and dates
const roleParts = (group, page) => {
  if (group.heading === 'Highlights') return [page.role, page.dates];
  const [title, dates] = group.heading.split(' · ');
  return [title, dates];
};

const Row = ({ left, right, as: Tag = 'div', className }) => (
  <div className="rs-row"><Tag className={className}>{left}</Tag>{right && <span className="rs-date">{right}</span>}</div>
);

const ResumePage = () => {
  const toHome = id => { window.location.href = './#' + id; };
  const toCareer = key => { window.location.href = './#career-' + key; };
  return (
    <div>
      <a className="skip" href="#main">Skip to content</a>
      <Nav onCareer={toCareer} goTo={toHome} homeHref="./" page="resume" />
      <main id="main">
        <header className="rs-hero">
          <div className="rs-wrap">
            <div className="label on-dark">Résumé</div>
            <h1 className="rs-name">William F. Nuveen</h1>
            <p className="rs-meta">
              Senior Robotics Hardware Engineer · Consumables R&amp;D · San Francisco, CA<br />
              {CONTACT_EMAIL && <><a href={MAILTO}>{CONTACT_EMAIL}</a> · </>}<a href="https://www.linkedin.com/in/williamnuveen/" target="_blank" rel="noopener noreferrer">linkedin.com/in/williamnuveen</a>
            </p>
            <div className="rs-actions">
              <a className="btn btn-gold" href={RESUME} target="_blank" rel="noopener noreferrer">Download PDF ↗</a>
              <a className="btn btn-ghost" href="./#portfolio">See my projects</a>
            </div>
          </div>
        </header>

        <div className="rs-body">
          <div className="rs-wrap">
            <section className="rs-sec">
              <h2>Summary</h2>
              <p className="rs-summary">{SUMMARY}</p>
            </section>

            <section className="rs-sec">
              <h2>Professional experience</h2>
              {experiences.filter(job => job.pageKey !== 'kohler').map(job => {
                const page = careerPages[job.pageKey];
                return (
                  <article key={job.pageKey} className="rs-co">
                    <Row as="h3" className="rs-co-name" left={page.resumeCompany || page.company} right={page.location} />
                    {(page.highlights || []).map(g => {
                      const [title, dates] = roleParts(g, page);
                      return (
                        <div key={title} className="rs-role">
                          <Row as="h4" left={title} right={dates} />
                          <ul>{g.items.map(i => <li key={i}>{i}</li>)}</ul>
                        </div>
                      );
                    })}
                    <a className="rs-more" href={'./#career-' + job.pageKey}>The full story at {page.company} →</a>
                  </article>
                );
              })}
            </section>

            <section className="rs-sec">
              <h2>Education</h2>
              {EDUCATION.map(e => (
                <div key={e.title} className="rs-line">
                  <Row left={e.title} right={e.date} as="b" />
                  <span>{e.detail}</span>
                </div>
              ))}
            </section>

            <section className="rs-sec">
              <h2>Certifications</h2>
              {CERTS.map(c => (
                <div key={c.title} className="rs-line"><b>{c.title}</b><span>{c.detail}</span></div>
              ))}
            </section>

            <section className="rs-sec">
              <h2>Technical skills</h2>
              <dl className="rs-skills">
                {SKILL_GROUPS.map(([g, items]) => (
                  <React.Fragment key={g}>
                    <dt>{g}</dt>
                    <dd>{items.map(s => <span key={s} className="rs-tag">{s}</span>)}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>

            <section className="rs-sec" style={{ marginBottom: 0 }}>
              <h2>Profiles &amp; contact</h2>
              <ul className="rs-links">
                {LINKS.map(([l, h, d]) => (
                  <li key={l}><a href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{l}</a>{d}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2026 William Nuveen. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {CONTACT_EMAIL && <a href={MAILTO}>Email</a>}
          <a href="https://github.com/williamnuveen" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/williamnuveen/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default ResumePage;
