import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/components/Header.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Adopt', path: '/pets' },
    { label: 'Support', path: '/support' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="header">
      <h1 className="title">Welcome to Pet Rescue</h1>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
        {navLinks.map(({ label, path }) => (
          <Link key={path} to={path} className="nav-link">{label}</Link>
        ))}
      </nav>
    </header>
  );
}
