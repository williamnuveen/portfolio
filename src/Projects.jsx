import React, { useState } from 'react';
import { CONTACT_EMAIL, Nav, careerPages, portfolioItems, ProjectCard, Gallery, Footer, FadeUp, projectHref } from './App.jsx';

// Project pages (projects/<slug>/) and the all-projects page (projects/).
// These pages sit in sub-folders, so the template adds a <base> tag that makes
// every relative link, image and script resolve from the site root.
const toHome = id => { window.location.href = './#' + id; };
const toCareer = key => { window.location.href = './#career-' + key; };

const ContactBand = () => (
  <section className="pp-contact">
    <div className="wrap">
      <h2 className="serif">Working on something similar?</h2>
      <p>Open to consulting on product design, consumables engineering, and robotics hardware.</p>
      <div className="pp-contact-btns">
        {CONTACT_EMAIL && <a className="btn btn-gold" href={`mailto:${CONTACT_EMAIL}?subject=Consulting%20inquiry`}>Email William</a>}
        <a className="btn btn-ghost" href="https://www.linkedin.com/in/williamnuveen/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
    </div>
  </section>
);

export const ProjectPage = ({ slug }) => {
  const idx = portfolioItems.findIndex(p => p.slug === slug);
  const p = portfolioItems[idx];
  const prev = portfolioItems[(idx - 1 + portfolioItems.length) % portfolioItems.length];
  const next = portfolioItems[(idx + 1) % portfolioItems.length];
  const career = careerPages[p.career];
  return (
    <div>
      <a className="skip" href={projectHref(p) + '#main'}>Skip to content</a>
      <Nav onCareer={toCareer} goTo={toHome} homeHref="./" page="project" />
      <main id="main">
        <header className="pp-hero">
          <div className="wrap pp-narrow">
            <nav className="pp-crumbs" aria-label="Breadcrumb">
              <a href="./">Home</a><span aria-hidden="true">/</span><a href="projects/">Projects</a>
            </nav>
            <div className="label on-dark">{p.company}</div>
            <h1 className="serif">{p.title}</h1>
            <p>{p.shortDescription}</p>
          </div>
        </header>

        <div className="wrap pp-narrow pp-body">
          <Gallery images={p.images} title={p.title} />

          <div className="pp-cols">
            <section>
              <h2 className="pp-h2">Overview</h2>
              {p.longDescription.split('\n\n').map((t, i) => <p key={i} className="body">{t}</p>)}
            </section>
            {p.results.length > 0 && (
              <section className="pp-results">
                <h2 className="pp-h2">Results</h2>
                <ul className="hl">{p.results.map(r => <li key={r}>{r}</li>)}</ul>
              </section>
            )}
          </div>

          {career && (
            <a className="pp-career" href={'./#career-' + p.career}>
              <span className="label">Experience</span>
              <span>Read about my time at {career.company} →</span>
            </a>
          )}

          <nav className="pp-pager" aria-label="More projects">
            <a href={projectHref(prev)}><span className="label">← Previous</span><span>{prev.title}</span></a>
            <a href="projects/" className="pp-pager-all">All projects</a>
            <a href={projectHref(next)} className="pp-next"><span className="label">Next →</span><span>{next.title}</span></a>
          </nav>
        </div>
        <ContactBand />
      </main>
      <Footer />
    </div>
  );
};

export const ProjectsIndex = () => {
  const [filter, setFilter] = useState('All');
  const companies = ['All', ...Array.from(new Set(portfolioItems.map(p => p.company)))];
  const shown = filter === 'All' ? portfolioItems : portfolioItems.filter(p => p.company === filter);
  return (
    <div>
      <a className="skip" href="projects/#main">Skip to content</a>
      <Nav onCareer={toCareer} goTo={toHome} homeHref="./" page="projects" />
      <main id="main">
        <header className="pp-hero">
          <div className="wrap">
            <nav className="pp-crumbs" aria-label="Breadcrumb"><a href="./">Home</a></nav>
            <div className="label on-dark">Mechanical design</div>
            <h1 className="serif">All projects</h1>
            <p>Consumables, robotics hardware and consumer products, from first prototype to mass production.</p>
          </div>
        </header>
        <section className="section" style={{ paddingTop: 56 }}>
          <div className="wrap">
            <div className="filters" role="group" aria-label="Filter projects by company">
              {companies.map(c => <button key={c} className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>)}
            </div>
            <div className="cards">
              {shown.map((p, i) => <FadeUp key={p.slug} delay={i * 40}><ProjectCard p={p} /></FadeUp>)}
            </div>
          </div>
        </section>
        <ContactBand />
      </main>
      <Footer />
    </div>
  );
};
