import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import ResumePage from './Resume.jsx';
import { ProjectPage, ProjectsIndex } from './Projects.jsx';

const { page, slug } = document.body.dataset;
const Page = page === 'resume' ? ResumePage
  : page === 'project' ? () => <ProjectPage slug={slug} />
  : page === 'projects' ? ProjectsIndex
  : App;
hydrateRoot(document.getElementById('root'), <Page />);
