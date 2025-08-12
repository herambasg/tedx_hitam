import React, { useEffect, useState } from 'react';
import './header.css';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../Assets/Logos/logo-white.png';
import LandingPopup from "../pop";
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //DEFINE NAVIGATION LINKS
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Organizing Team', path: '/team' },
    { name: 'Speakers', path: '/speakers' },
    { name: 'Past Editions', path: 'pasteditions' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <Link to="/" onClick={(e) => e.stopPropagation()}><img src={logo} alt="TEDxHITAM Logo" className="logo" /></Link>

          {/* Desktop navigation */}
          <nav className="nav-desktop desktop-only">
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                {link.name}
                <span className="nav-underline"></span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop "Book Your Ticket" button */}
          <button type="button" className="book-button desktop-only" onClick={(e) => { e.stopPropagation(); setShowPopup(true); }}>
            <span className="ant-btn-icon">
              <span role="img" aria-label="form" className="anticon-form">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="form" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"></path>
                  <path d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"></path>
                </svg>
              </span>
            </span>
            <span>Book Your Ticket Now</span>
          </button>

          {/* Hamburger menu button for mobile */}
          <button onClick={() => setIsMenuOpen(true)} className="menu-button">
            <MenuOutlined style={{ fontSize: '24px' }} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-header">
            <div className="mobile-logo-container">
              <Link to="/"><img src={logo} alt="TEDxHITAM Logo" className="logo" /></Link>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="menu-button" style={{display: 'block'}}>
              <CloseOutlined style={{ fontSize: '24px' }} />
            </button>
          </div>
          <nav className="mobile-nav">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className="mobile-link">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mobile-footer">
            <button type="button" className="book-button" onClick={(e) => { e.stopPropagation(); setShowPopup(true); setIsMenuOpen(false); }}>
              <span className="ant-btn-icon">
                <span role="img" aria-label="form" className="anticon-form">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="form" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"></path>
                    <path d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"></path>
                  </svg>
                </span>
              </span>
              <span>Book Your Ticket Now</span>
            </button>
          </div>
        </div>
      )}

      {showPopup && <LandingPopup open={showPopup} setOpen={setShowPopup} />}
    </>
  );
}