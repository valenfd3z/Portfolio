import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Import components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

// Import styles
import './styles/theme.css';
import './App.css';

// Add icons to library
library.add(fas, fab);

// Main app component

function App() {
  const [theme, setTheme] = useState('dark');

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Add class to body for global styles
    document.body.classList.add('app-body');
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('app-body');
    };
  }, []);

  // Toggle between light/dark theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      
      <main style={{ marginTop: '80px' }}> {/* Add margin to account for fixed navbar */}
        <Routes>
          <Route path="/" element={
              <>
                <Home />
                <Skills />
                <Projects />
                <Blog />
                <Contact />
              </>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
