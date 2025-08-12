import './home.css';
import { useState } from "react";
import Threads from "../ReactBits/threads";
import logo from "../Assets/Logos/logo-white.png";
import logowotext from "../Assets/Logos/invisible-logo-wo-text.png";
import invisible from "../Assets/Logos/invisible-wo-bg.png";
import CountdownTimer from "./countdown";
import LandingPopup from "../pop";

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* --- Main full-screen view --- */}
      <div className="main-screen">
        <div className="bg">
          <Threads amplitude={2.5} distance={0.5} />
        </div>
        <div className="head">
          <img src={logo} alt="TEDx Logo" className="tedx" />
          <img src={invisible} alt="Invisible" className="invisible" />
          <button
            className="reminder-btn"
            onClick={() => { setShowPopup(true); }}
          >
            <svg
              style={{ color: 'aliceblue', justifyContent: 'center' }}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-ticket-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3z" />
            </svg>
            <h6 style={{ margin: '2px 5px 2px 10px', fontSize: '20px', fontWeight: '700' }}>
              Book Your Tickets
            </h6>
          </button>

          {/* Popup */}
          {showPopup && (
            <LandingPopup open={showPopup} setOpen={setShowPopup} />
          )}
        </div>
      </div>

      {/* --- Scroll content --- */}
      <div className="about-section-container">
        <div className="image-container">
          <img
            className="invisible-logo-wo-text"
            src={logowotext}
            alt="Invisible Theme Logo"
          />
        </div>

        <div className="text-content">
          <h1 className="HeadS">About INVISIBLE</h1>
          <p>
            As HITAM celebrates 25 years of excellence, our TEDx theme, 'INVISIBLE', pays tribute to the silent forces behind every great achievement. Success is often seen in the final spotlight, but this theme honors the untold stories, the quiet persistence, and the unseen sacrifices that happen backstage. It's a celebration of the journey itself, the thoughts, choices, and challenges that shape extraordinary outcomes long before they become visible to the world.
          </p>
          <p>
            'INVISIBLE' invites us to shift our focus from the product to the process. We will shine a light on the hidden layers of impact, recognizing that what we don't see is as vital as what we do. This theme is about exploring the backstage of success, celebrating the lesser-known people and overlooked moments that fuel growth and innovation. Join us to honor the powerful, unspoken contributions that truly define greatness.
          </p>
        </div>
      </div>

      <div>
        <CountdownTimer />
      </div>
    </>
  );
}

export default Home;