import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock components that might cause issues in tests
jest.mock('./components/BackToTop/BackToTop', () => () => <div data-testid="back-to-top"></div>);
jest.mock('./components/ThemeToggle/ThemeToggle', () => () => <div data-testid="theme-toggle"></div>);

describe('App Component', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  };

  test('renders Navbar component', () => {
    renderApp();
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  test('renders Home section', () => {
    renderApp();
    const homeSection = screen.getByTestId('home-section');
    expect(homeSection).toBeInTheDocument();
  });

  test('renders Skills section', () => {
    renderApp();
    const skillsSection = screen.getByTestId('skills-section');
    expect(skillsSection).toBeInTheDocument();
  });

  test('renders Projects section', () => {
    renderApp();
    const projectsSection = screen.getByTestId('projects-section');
    expect(projectsSection).toBeInTheDocument();
  });

  test('renders Blog section', () => {
    renderApp();
    const blogSection = screen.getByTestId('blog-section');
    expect(blogSection).toBeInTheDocument();
  });

  test('renders Contact section', () => {
    renderApp();
    const contactSection = screen.getByTestId('contact-section');
    expect(contactSection).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    renderApp();
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
