import React from 'react';
import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoImg from '../Assets/Logos/invisible-wo-bg.png'; // Use import if inside src folder

const Footer = () => {
  return (
    <footer className="tedx-footer">
      <div className="footer-content">
        
        {/* Column 1: About */}
        <div className="footer-section about">
          <img
            className="footer-logo"
            src={logoImg}
            alt="invisible"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://tedxhitam.org/assets/images/invisible-wo-bg.png'; // Fallback image URL
            }}
          />
        </div>

        {/* Column 2: Follow Us & Date */}
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/tedxhitam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
              <span>@tedxhitam</span>
            </a>
          </div>
          <div className="event-date">
            <h4>Event Date</h4>
            <p>September 20th, 2025</p>
          </div>
        </div>

        {/* Column 3: Venue */}
        <div className="footer-section contact">
          <h4>Venue & Contact</h4>
          <p>
            <strong className="venue-name">
              Hyderabad Institute of Technology And Management
            </strong>
          </p>
          <a
            href="https://maps.app.goo.gl/6NBXQp2UY5CvoFPk8"
            target="_blank"
            rel="noopener noreferrer"
            className="address-line"
          >
            <i className="fas fa-map-marker-alt"></i>
            <span>
              Gowdavelly, Medchal,<br />
              Medchal-Malkajgiri (Dist.),<br />
              Telangana, India - 501401
            </span>
          </a>
          <div className="contact-links">
            <a
              href="https://hitam.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HITAM Website"
            >
              <i className="fas fa-globe"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/hitamhyderabad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HITAM on LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.instagram.com/hitamdiaries/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HITAM Diaries on Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} TEDxHITAM. This independent TEDx event is operated under license from TED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
