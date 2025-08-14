// OPTIMIZATION: Imported React.memo, useState, and useCallback for performance improvements.
import React, { memo, useState, useCallback } from 'react';
// OPTIMIZATION: Removed 'framer-motion' as it's no longer used for animation, reducing bundle size.
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

// OPTIMIZATION: Wrapped the component in React.memo to prevent re-renders unless its props change.
const About = memo(function About() {
  const duplicatedImages = [...campusImages, ...campusImages];
  const [selectedImg, setSelectedImg] = useState(null);

  // OPTIMIZATION: Used useCallback to memoize the function, preventing it from being recreated on every render.
  const closeLightbox = useCallback(() => {
    setSelectedImg(null);
  }, []);

  const openLightbox = useCallback((src) => {
    setSelectedImg(src);
  }, []);

  return (
    <div className="about-page-container">

      {/* 1. About HITAM */}
      <div className="about-section about-hitam">
        <img
          src="https://tedxhitam.com/assets/about/hitam.jpg"
          alt="HITAM Main Building with lush green surroundings"
          className="about-section-image"
          // OPTIMIZATION: Lazy loading defers loading of off-screen images.
          loading="lazy"
        />
        <div className="about-section-text">
          <h1>About HITAM</h1>
          <p>
            As we proudly celebrate <b>25 years of excellence</b>, <b>Hyderabad Institute of Technology and Management (HITAM)</b> continues to shine as a beacon of transformative engineering education. Nestled in a serene, eco-conscious campus in Hyderabad, HITAM is dedicated to delivering a high-quality, holistic learning experience.
          </p>
          <p>
            Our unique <b>Doing Engineering</b> approach ensures that every student graduates with real-world skills, a spirit of innovation and the confidence to lead in a rapidly evolving global landscape. For a quarter of a century, we have empowered future engineers to be industry-ready, socially conscious, and future-focused.
          </p>
          <a href="https://hitam.org/" target="_blank" rel="noopener noreferrer" className="explore-btn">
            Explore more
          </a>
        </div>
      </div>

      {/* 2. Campus Gallery */}
      <div className="campus-gallery-container">
        {/* OPTIMIZATION: Replaced motion.div with a standard div. */}
        <div className="scrolling-wrapper">
          {duplicatedImages.map((src, index) => (
            <img 
              // OPTIMIZATION: A more unique key for better rendering performance.
              key={`${src}-${index}`}
              src={src} 
              // FIX: Removed the redundant word "photo" for better accessibility.
              alt={`HITAM campus ${index + 1}`}
              className="gallery-image"
              onClick={() => openLightbox(src)}
            />
          ))}
        </div >
      </div>

      {/* 3. About TEDxHITAM */}
      <div className="about-section about-tedx-hitam">
        <div className="about-section-text">
          <h1>About TEDxHITAM</h1>
          <p>
            At TEDxHITAM, we believe an idea is the most powerful catalyst for change. Our stage is a launchpad for thoughts that challenge the status quo, inspire new perspectives, and provoke action. Since our journey began, we've been committed to amplifying these powerful voices.
          </p>
        </div>
        <img
          src="https://tedxhitam.com/assets/about/tedx_hitam.jpg"
          alt="A speaker on the TEDxHITAM stage during an event"
          className="about-section-image"
          loading="lazy"
        />
      </div>

      {/* 4. About TEDx */}
      <div className="about-section about-tedx">
        <img
          src="https://tedxhitam.com/assets/about/tedx.jpg"
          alt="The official red circular TEDx logo on a black background"
          className="about-section-image"
          loading="lazy"
        />
        <div className="about-section-text">
          <h1>About TEDx</h1>
          <p>
            TEDx is an initiative to promote 'ideas worth spreading' in local communities across the world. Steered by passionate individuals, TEDx events aim to infuse the spirit of TED at the grassroot level through a series of independently organised events. These events are aimed at bringing new ideas and stories to the society so as to inspire and spark meaningful conversations. These events, under the umbrella of TED, adhere to set of prescribed guidelines provided along with the license. More than 3000 events are held as part of TEDx each year.
          </p>
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
            Centered around topics like compact disks, e-books, and fractal mapping of coastlines, TED (Technology, Entertainment, and Design) has evolved into a global beacon of creativity and intellect. Initially featuring a narrow range of panelists, TED gradually broadened its scope to include business magnates, scientists, and philosophers. TED has since embraced inclusivity, welcoming all into its fold and continually inspiring progress.
          </p>
          <a href="https://www.ted.com/" target="_blank" rel="noopener noreferrer" className="explore-btn">
            Explore more
          </a>
        </div>
        <img
          src="https://tedxhitam.com/assets/about/ted.jpg"
          alt="The official red TED logo on a stage during a conference"
          className="about-section-image"
          loading="lazy"
        />
      </div>

      {/* --- Lightbox for Enlarged Image --- */}
      {selectedImg && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImg} alt="Enlarged campus view" className="lightbox-img" />
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
          </div>
        </div>
      )}

    </div>
  );
});

export default About;