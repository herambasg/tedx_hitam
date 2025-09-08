import React, { useEffect, useRef } from "react";
import "./Speakers.css";
import S1 from "./1.png";
import S2 from "./2.png";
import S3 from "./3.png";
import S4 from "./4.png";
import S5 from "./5.png";
import S6 from "./6.png";


const SPEAKERS = [
  { 
    img: S6, 
    name: "Dr. Y. Malini Reddy", 
    title: "Head of Sustainability Policy & Strategy at Re Sustainability Ltd",
    topic: "",
    bio: "Dr. Y. Malini Reddy is a thought leader with 27 years of multi-sectoral experience in economics, management, and educational service quality. She has a strong background in waste management, climate finance, and the circular economy across Asia and Africa. As Head of Business Solutions and Strategy and Head of Sustainability Policy, Research, and Advocacy at Re Sustainability Ltd, she focuses on building strategic partnerships and influencing policy. Her expertise lies in creating innovative, sustainable solutions that promote systemic resilience, inclusivity, and gender equality.",
    credentials: "",
    link:"https://www.linkedin.com/in/malinireddyy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"

  },
  { 
    img: S3, 
    name: "Dr. Sohum Sohoni", 
    title: "Director of HITAM",
    topic: "",
    bio: "Dr. Sohum Sohoni, Director of HITAM, brings 26+ years of U.S. academic experience in Computer Engineering and Engineering Education. He со-developed a widely used computer architecture visualization platform, published 40+ peer-reviewed papers, and earned multiple best paper awards from IETE and ASEE, along with the Regents Distinguished Teaching Award (2010). A Senior IEEE member and active ACM/ASEE contributor, he serves on advisory boards of IUCEE and JEET, and as an ABET Program Evaluator, advancing global academic standards.",
    credentials: "",
    link:"https://www.linkedin.com/in/ssohoni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  { 
    img: S4, 
    name: "Dr. Rucha Joshi", 
    title: "Associate Professor at Plaksha University",
    topic: "",
    bio: "Dr. Rucha Joshi, Associate Professor at Plaksha University (formerly at UC Davis & Purdue), specializes in biomedical engineering, biomaterials, drug delivery, and engineering education. She holds two patents, has authored award-winning books, and champions inclusive pedagogy, gamification in STEM, and experiential learning. A former Grand Challenges Scholars Program Director, she has led impactful workshops, held leadership roles in ASEE, and received the IEEE India Council Chhabria Award for Best Woman Professional. Outside academia, she is a national-level badminton player, NAUI-certified SCUBA diver, and state literary award winner.",
    credentials: "",
    link:"https://www.linkedin.com/in/rucha-joshi-49197b36?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  { 
    img: S2, 
    name: "Yagneshwara Dasa", 
    title: "Associate VP of The Akshaya Patra Foundation",
    topic: "",
    bio: "Yagneshwara Dasa, Associate VP of The Akshaya Patra Foundation (Telangana & Andhra Pradesh), is a spiritual mentor and social impact leader who transitioned from fashion design (NIFT, 2000) to large-scale food service. He has designed record-breaking kitchens featured on National Geographic, created a high-speed laddu plant for Yadadri Temple, and oversees meals for millions of school children daily. As Vice President of the Hare Krishna Golden Temple, he mentors missionaries, leads cultural and digital outreach, and inspires youth through Vedic wisdom, embodying a journey from ambition to selfless service.",
    credentials: "",
    link:"https://www.linkedin.com/in/yagneshwara?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  { 
    img: S1, 
    name: "Rubeena Nafees Fatima", 
    title: "Social Entrepreneur",
    topic: "",
    bio: "Rubina Nafees Fatima is a visionary social entrepreneur, TEDx speaker, and the Founder & Director of SAFA, an NGO established in 2008 to empower marginalized communities through education and livelihoods. The work has impacted over 80,000 youth and women, connecting them to skill development programs, welfare schemes, and sustainable income opportunities. Under this leadership, SAFA has successfully established two brands, Artizania and Luqma, aimed at creating sustainable livelihoods for women. With four skill training and livelihood centers in Hyderabad, the focus remains on building inclusive communities and transforming lives.",
    credentials: "",
    link:"https://www.linkedin.com/in/rubina-n-61b1451a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  
  
  
  { 
    img: S5, 
    name: "Sandeep Arora", 
    title: "Telecommunications Industry Leader at Capgemini",
    topic: "",
    bio: "Sandeep Arora believes in the power of technology to transform lives. At Capgemini, he leads Telecommunications Industry Platform, combining global expertise with market insights to help organizations grow through customer-first strategies. His leadership journey spans Verizon, Expedia, and Wipro, where he's built global capability centers, driven large-scale transformations, and launched market-defining initiatives. What fuels him most is a passion for inclusive Innovation: creating ecosystems that empower talent, expand access, and make technology a force for good.",
    credentials: "",
    link:"https://www.linkedin.com/in/sandeep--arora?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  
];


export default function ParallaxShowcase({ headerHeight = 96 }) {
  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    // Set CSS custom property for header height
    document.documentElement.style.setProperty('--header-h', `${headerHeight}px`);

    // Intersection Observer for content animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all content sections
    contentRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Parallax scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      imageRefs.current.forEach((img, index) => {
        if (!img) return;
        
        const section = sectionRefs.current[index];
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionHeight = rect.height;
        
        // Calculate parallax offset
        const parallaxSpeed = 0.5;
        const yPos = -(scrollY - sectionTop) * parallaxSpeed;
        
        // Apply transform
        img.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeight]);

  return (
    <div className="tedx-speakers">
      {/* Hero Section */}
      <section className="tedx-hero">
        <div className="hero-content">
          <h1 className="hero-title">TEDx Speakers</h1>
          <p className="hero-subtitle">Ideas Worth Spreading</p>
          <div className="hero-description">
            Meet our extraordinary lineup of visionaries, innovators, and thought leaders 
            who are shaping the future across diverse fields of human endeavor.
          </div>
        </div>
      </section>

      {/* Speaker Sections */}
      {SPEAKERS.map((speaker, index) => {
        const isReversed = index % 2 === 1;
        
        return (
          <section
            key={index}
            className={`speaker-section ${isReversed ? 'reversed' : ''}`}
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            <div className="speaker-image-container">
              <div
                className="speaker-image"
                ref={(el) => (imageRefs.current[index] = el)}
                style={{ backgroundImage: `url(${speaker.img})` }}
              />
            </div>
            
            <div 
              className="speaker-content"
              ref={(el) => (contentRefs.current[index] = el)}
              data-index={index}
            >
              <div className="speaker-content-inner">
                <div className="speaker-badge">Speaker {String(index + 1).padStart(2, '0')}</div>
                <h2 className="speaker-name1">{speaker.name}</h2>
                <h3 className="speaker-title">{speaker.title}</h3>
                {/* <h4 className="speaker-topic">"{speaker.topic}"</h4> */}
                <p className="speaker-bio">{speaker.bio}</p>
                <div className="speaker-credentials">{speaker.credentials}</div>
                <button className="speaker-cta" onClick={() => window.open(speaker.link, "_blank")}>
                  Learn More
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}