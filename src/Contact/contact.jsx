import React from 'react';
import './contact.css'; // Import the new CSS file
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Recommended: use an icon library

const ContactUs = () => {
  return (
    // Main wrapper to fix header overlap and constrain content width
    <div className="contact-page">
      <div className="contact-container">

        {/* --- Hero Section --- */}
        <section className="contact-hero">
          <h1>Get In <span>Touch</span></h1>
          <p>Have a question, feedback, or a partnership inquiry? We'd love to hear from you. Reach out through the form below or contact us directly.</p>
        </section>

        {/* --- Main Content Grid (Form + Details) --- */}
        <div className="contact-grid">
          
          {/* --- Contact Form --- */}
          <div className="contact-form-container">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name <span>*</span></label>
                  <input type="text" id="name" placeholder="Enter your full name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address <span>*</span></label>
                  <input type="email" id="email" placeholder="Enter your email address" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input type="tel" id="mobile" placeholder="Enter your mobile number" />
                </div>
                <div className="form-group">
                  <label htmlFor="queryType">Query Type <span>*</span></label>
                  <input type="text" id="queryType" placeholder="e.g., Sponsorship, Ticketing" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message <span>*</span></label>
                <textarea id="message" placeholder="Type your message here..." required></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit Message</button>
            </form>
          </div>

          {/* --- Contact Details --- */}
          <div className="contact-details-container">
            <div className="contact-detail-card">
              <div className="icon-wrapper"><FaEnvelope /></div>
              <h4>Email Us</h4>
              <p>For all inquiries, please email us:</p>
              <a href="mailto:tedxhitam@hitam.org">tedxhitam@hitam.org</a>
            </div>

            <div className="contact-detail-card">
              <div className="icon-wrapper"><FaPhoneAlt /></div>
              <h4>Contact Organizers</h4>
              <p>For urgent matters, reach out to:</p>
              <a href="tel:+916309809060">+91 6309809060</a>
              <a href="tel:+917013838701">+91 7013838701</a>
              <a href="tel:+919550716210">+91 9550716210</a>
            </div>

            <div className="contact-detail-card">
              <div className="icon-wrapper"><FaMapMarkerAlt /></div>
              <h4>Venue Address</h4>
              <p>
                Hyderabad Institute of Technology and Management (HITAM),
                Gowdavelly, Medchal, Hyderabad, Telangana 501401
              </p>
            </div>
          </div>

        </div>

        {/* --- Map Section --- */}
        <section className="map-section">
          <h2>Our Location</h2>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3614.970095574191!2d78.4500113!3d17.5957711!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb85bba91858e7%3A0x399eba977f842b82!2sHyderabad%20Institute%20of%20Technology%20and%20Management!5e1!3m2!1sen!2sin!4v1754844088580!5m2!1sen!2sin" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="Hyderabad Institute of Technology and Management Location Map">
          </iframe>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContactUs;