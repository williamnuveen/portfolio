import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import ResumePage from './Resume.jsx';

export const renderHome = () => renderToString(<App />);
export const renderResume = () => renderToString(<ResumePage />);
