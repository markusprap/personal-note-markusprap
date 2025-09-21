import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DialogProvider } from './contexts/DialogContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/style.css';

function App() {
  return (
    <ThemeProvider>
      <DialogProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/add" element={<AddNotePage />} />
                <Route path="/archives" element={<ArchivePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
