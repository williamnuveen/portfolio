import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import ResumePage from './Resume.jsx';

const Page = document.body.dataset.page === 'resume' ? ResumePage : App;
hydrateRoot(document.getElementById('root'), <Page />);
