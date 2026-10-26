import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AcademicPage from './AcademicPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AcademicPage />
  </StrictMode>,
);
