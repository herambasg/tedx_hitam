import React from 'react';
import { motion } from 'framer-motion';
import './about.css';

// --- Image Data ---
const campusImages = [
  "https://tedxhitam.com/assets/about/campus/1.jpg",
  "https://tedxhitam.com/assets/about/campus/2.jpg",
  "https://tedxhitam.com/assets/about/campus/3.jpg",
  "https://tedxhitam.com/assets/about/campus/4.jpg",
  "https://tedxhitam.com/assets/about/campus/5.jpg",
  "https://tedxhitam.com/assets/about/campus/6.jpg",
  "https://tedxhitam.com/assets/about/campus/7.jpg",
  "https://tedxhitam.com/assets/about/campus/8.jpg",
];

function About() {
  const duplicatedImages = [...campusImages, ...campusImages];

  return (
    <div className="about-page-container">

      {/* 1. About HITAM */}
      <div className="about-section about-hitam">
        <img
          src="https://tedxhitam.com/assets/about/hitam.jpg"
          alt="HITAM Main Building"
          className="about-section-image"
        />
        <div className="about-section-text">
          <h1>About HITAM</h1>
          <p>
            Hyderabad Institute of Technology and Management (HITAM) is renowned for its lush green campus and commitment to project-based learning. We foster an environment where students can innovate, experiment, and grow into well-rounded professionals ready to tackle real-world challenges.
          </p>
          <a href="https://hitam.org/" target="_blank" rel="noopener noreferrer" className="explore-btn">
            Explore more
          </a>
        </div>
      </div>

      {/* 2. Campus Gallery */}
      <div className="campus-gallery-container">
        <motion.div
          className="scrolling-wrapper"
          animate={{
            x: ['0%', '-100%'],
            transition: {
              ease: 'linear',
              duration: 20,
              repeat: Infinity,
            }
          }}
        >
          {duplicatedImages.map((src, index) => (
            <img key={index} src={src} alt={`Campus life ${index + 1}`} className="gallery-image" />
          ))}
        </motion.div>
      </div>

      {/* 3. About TEDxHITAM (No button needed here) */}
      <div className="about-section about-tedx-hitam">
        <div className="about-section-text">
          <h1>About TEDxHITAM</h1>
          <p>
            At TEDxHITAM, we believe an idea is the most powerful catalyst for change. Our stage is a launchpad for thoughts that challenge the status quo, inspire new perspectives, and provoke action. Since our journey began, we've been committed to amplifying these powerful voices.
          </p>
        </div>
        <img
          src="https://placehold.co/600x400/c70039/ffffff?text=TEDxHITAM+Event"
          alt="TEDxHITAM Event Stage"
          className="about-section-image"
        />
      </div>

      {/* 4. About TEDx */}
      <div className="about-section about-tedx">
        <img
          src="https://placehold.co/600x400/900c3f/ffffff?text=TEDx+Logo"
          alt="Official TEDx Logo"
          className="about-section-image"
        />
        <div className="about-section-text">
          <h1>About TEDx</h1>
          <p>
            TEDx promotes "ideas worth spreading" through independently organized events worldwide. Driven by passionate individuals, these events bring fresh ideas and stories to inspire and spark meaningful conversations. Guided by TED’s principles, TEDx events make a global impact at the grassroots level.
          </p>
          {/* --- ADD THIS BUTTON --- */}
          <a href="https://www.ted.com/about/programs-initiatives/tedx-program" target="_blank" rel="noopener noreferrer" className="explore-btn">
            Explore more
          </a>
        </div>
      </div>

      {/* 5. About TED */}
      <div className="about-section about-ted">
        <div className="about-section-text">
          <h1>About TED</h1>
          <p>
            TED (Technology, Entertainment, and Design) has evolved into a global platform for creativity and innovation. It features a diverse range of voices, from business leaders to scientists. Initiatives like TED-Ed and the TED Prize continue to inspire progress and transformative ideas worldwide.
          </p>
           {/* --- ADD THIS BUTTON --- */}
          <a href="https://www.ted.com/" target="_blank" rel="noopener noreferrer" className="explore-btn">
            Explore more
          </a>
        </div>
        <img
          src="https://placehold.co/600x400/581845/ffffff?text=TED+Stage"
          alt="Official TED Conference Stage"
          className="about-section-image"
        />
      </div>

    </div>
  );
}

export default About;