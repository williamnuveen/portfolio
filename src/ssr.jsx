import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { portfolioItems } from './App.jsx';
import ResumePage from './Resume.jsx';
import { ProjectPage, ProjectsIndex } from './Projects.jsx';

export const renderHome = () => renderToString(<App />);
export const renderResume = () => renderToString(<ResumePage />);
export const renderProjects = () => renderToString(<ProjectsIndex />);
export const renderProject = slug => renderToString(<ProjectPage slug={slug} />);
export { portfolioItems };
