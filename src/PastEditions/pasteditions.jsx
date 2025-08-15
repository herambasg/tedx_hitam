import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './pasteditions.css';

// === Data Arrays ===
const infinitySpeakerData = [
    { 
        name: 'Mr. Sai Prasad Vishwanathan',
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2023/saiprasad.jpg',
        bio: "Live a life that leaves a lasting impact on thousands of other people. SPV has explored the world physically and philosophically in ways that can only be cherished by means of his talks." 
    },
    { 
        name: 'Ms. Jhanvi Narang', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2023/jhanvinarang.jpg', 
        bio: "Jhanvi is a young face of modern cinema and the industry. An entrepreneur with a dream to make meaningful cinema. An MSc in Business with Marketing from Warwick Business School whose perspectives can only be conveyed through her speeches." 
    },
    { 
        name: 'Maj Gen Chandrashekar Mani', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2023/mani.jpg', 
        bio: "Maj General C Mani, an experienced military leader, has successfully managed ICT infrastructure setup in India's northeastern states. With expertise in cybersecurity, electronic warfare, and IT infrastructure, he has overseen the deployment of a native campus network and led an Electronic Warfare Unit. His current role involves developing anti-drone technologies and systems, bridging user needs with available technology for defense and security forces." 
    },
    { 
        name: 'Mr. Rahul Singh', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2023/rahul.jpg', 
        bio: "A banker by the day and writer by the night, Rahul is an expert at connecting the three Is-idea, insight, and individual, who sums up his life as ABC - Author, Banker, and Community Builder." 
    },
    { 
        name: 'Mr. Sai Satish', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2023/satish.jpg', 
        bio: "He's An author, CEO of Indian Servers and administrator of Andhra Hackers, he has worked with and was rewarded by various state governments for pentesting of govt. sites. He is also a cyber cops' trainer and cyber security expert who conducted many hacking awareness programs across India." 
    },
    { 
        name: 'Mrs. Lavanya Patnala', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2023/lavanya.jpg', 
        bio: "Lavanya is a Hyderabad native, holds a Master's in Commerce with 26+ years of experience. Starting as an administration assistant, she progressed to administration manager. Currently, an HR Operations Manager, she completed successful projects, received accolades, and embraces personal and professional growth with enthusiasm." 
    }
];

const rrSpeakerData = [
    { 
        name: 'Dr. Chandrashekar', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2024/chandrashekar.jpg', 
        bio: "Dr. ChandraSheKar (CSK) has spoken to more than 50,000 people throughout 4 continents and is ranked in the top 1% of a group of 300 leading professional speakers in India. For 20 years, he has worked at the intersection of education and entrepreneurship to enable successful ecosystems. Currently, he serves as the CEO of JGI Schools, India. \n\nCSK has coached more than 54 business leaders and entrepreneurs and delivered innumerable presentations to audiences of all sizes, sharing great strategies on business growth, efficiency, impact, reach, reputation, & balance. An Alumnus of the IIM, Lucknow, he has a Ph.D from University of Milan, Italy and was ranked among the TIMES 40under40 game changes in 2020. CSK is a Bangalorean by birth and a true Hyderabadi by heart. He currently resides in Hyderabad with his wife and parents." 
    },
    { 
        name: 'Dr. Rajdeep Manwani', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2024/rajdeepmanwani.jpg', 
        bio: "Dr. Rajdeep Manwani is an accomplished academician, motivational speaker, and life coach with over 25 years of experience in education and corporate training. He currently serves as a professor and Head of Academic Research at Sindhi College. A triple post-graduate with a PhD, Dr. Manwani has been recognized for his contributions to education and social empowerment, including receiving the National Award as a Role Model for Empowerment of Persons with Disabilities from the President of India.\n\nHe is a distinguished Toastmaster, having won numerous awards for his eloquence and public speaking. Passionate about empowering youth and creating inclusive environments, he has mentored over 21,500 students and professionals, making a significant impact across various sectors. His life's motto, \"Touching lives, making a difference,\" reflects his dedication to uplifting others and driving positive change." 
    },
    { 
        name: 'Mr. Uday Krishna Peddireddi', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2024/udaykrishna.jpg', 
        bio: "Uday Krishna Peddireddi established the non-profit Vata Foundation, an environmental group committed to preserving India's urban greenery. Since its establishment in 2015, the foundation has made major contributions to the Tippeshwar Wildlife Sanctuary and successfully transplanted over 2,000 trees and fostered 50,000 more throughout India.\n\nWidely acclaimed for its impactful Tree Rehabilitation Program, Vata Foundation continues to lead initiatives that combat the loss of urban trees and promote ecological sustainability. Uday Krishna Peddireddi, recognized as the \"Tree Man of India,\" was honored as the Best Environmentalist of 2022 for his exceptional efforts in environmental conservation." 
    },
    { 
        name: 'Mr. Vinay Singh', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2024/vinaysingh.jpg', 
        bio: "Vinay Singh leads the Education Vertical at Aon, where he has worked for over 12 years, specializing in psychometric assessments. He has collaborated with more than 500 universities and institutions, helping them with admission processes and preparing students for the industry.\n\nWith a B.Tech degree from JNTU Hyderabad and schooling from Kendriya Vidyalaya, Vinay is also passionate about marathon running, having completed 18,500 km, and traveling, covering 320 cities across India. As a member of India's IT Cluster and the Velocity Network Foundation, he is actively involved in leveraging blockchain technology to digitize and globalize career credentials." 
    },
    { 
        name: 'Ms. Prachi Shevgaonkar', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2024/prachi.jpg', 
        bio: "Prachi Shevgaonkar, a renowned climate innovator, is the founder of Cool The Globe, an app driving climate action with users from over 110 countries. Her impactful work has earned her prestigious accolades, including Forbes 30 Under 30 Asia Class of 2024, a Shark Tank India deal, and the Young Change-maker of the Year award from India's finance minister.\n\nAs the Climate Change Advisor to Tata Power, Prachi has led global initiatives, inspiring over 25 million people and saving 5 million kg of greenhouse gas emissions. She's the youngest Indian to be appointed to the Climate Leadership Coalition's advisory board and a strong advocate for youth-led solutions to global challenges, with her campaigns empowering citizens to create a sustainable future." 
    },
    { 
        name: 'Ms. Vidya Sivalenka', 
        image: 'https://tedxhitam.com/assets/pasteditions/tedx2024/vidyashivlenka.jpg', 
        bio: "Vidya Sivalenka-a media personality, entrepreneur, and music enthusiast. With experience as an RJ at Red FM and producer of films like Yashoda and Sammohanam, Vidya has explored multiple facets of the media industry, including acting.\n\nFormerly the band manager for Capricio, she now serves as Managing Partner at Band Merakee and curates Micless with Merakee, a platform connecting music lovers across cities. Prepare to be inspired by her diverse journey in media and music!" 
    },
];

const infinityPhotoData = [
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/1.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/2.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/3.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/4.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/5.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/6.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/7.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/8.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/9.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/10.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/11.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/12.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/13.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2023/gallery/14.jpg"
];

const rrPhotoData = [
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/1.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/2.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/3.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/4.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/5.jpg", 
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/6.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/7.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/8.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/9.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/10.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/11.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/12.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/13.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/14.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/15.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/16.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/17.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/18.jpg",
    "https://tedxhitam.com/assets/pasteditions/tedx2024/gallery/19.jpg"
];

const tabs = [
    { id: 'rr', label: 'TEDx HITAM 2.0: Ripple & Resonate (2024)' },
    { id: 'infinity', label: 'TEDx HITAM 1.0: Infinity (2023)' }
];

// === Animation Variants ===
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } };
const modalVariants = { hidden: { y: "-50vh", opacity: 0 }, visible: { y: "0", opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } } };

// === Reusable Components ===
const SectionHeading = ({ children }) => (
    <h2 className="section-heading">
        {children}
        <div className="section-underline"><span className="dot dot-lg"></span><span className="dot dot-md"></span><span className="dot dot-sm"></span></div>
    </h2>
);

const SpeakerCard = ({ speaker, onSelect, className }) => (
    <motion.div className={`speaker-card ${className || ''}`} variants={itemVariants} onClick={() => onSelect(speaker)}>
        <div className="image-container"><img src={speaker.image} alt={speaker.name} className="speaker-image" /></div>
        <div className="speaker-name"><h3>{speaker.name}</h3></div>
    </motion.div>
);

const PhotoCard = ({ src, onSelect }) => (
    <div className="photo-card" onClick={() => onSelect(src)}>
        <img src={src} alt="TEDxHITAM event moment" className="gallery-photo" />
    </div>
);

const InfiniteScroller = ({ items, renderItem, direction = 'right', speed = 'slow' }) => {
    const duplicatedItems = [...items, ...items];
    const durationMap = { slow: items.length * 5, medium: items.length * 3, fast: items.length * 1.5 };
    
    const animationDuration = `${durationMap[speed]}s`;
    const animationName = `scroll-${direction}`;

    return (
        <div className="scroller-container">
            <div
                className="scroller-wrapper"
                style={{ 
                    '--animation-duration': animationDuration,
                    '--animation-name': animationName
                }}
            >
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="scroller-item">
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

const SpeakerModal = ({ speaker, onClose }) => (
    <motion.div className="modal-backdrop" onClick={onClose} variants={backdropVariants} initial="hidden" animate="visible" exit="hidden">
        <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} variants={modalVariants}>
            <button onClick={onClose} className="modal-close" aria-label="Close"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <div className="text-center"><h3 className="text-3xl font-bold text-white mb-2">{speaker.name}</h3></div>
            <div className="modal-description"><p>{speaker.bio}</p></div>
        </motion.div>
    </motion.div>
);

const PhotoLightbox = ({ photo, onClose }) => (
    <motion.div className="photo-lightbox-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="photo-lightbox-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
            <img src={photo} alt="Enlarged event moment" className="photo-lightbox-img" />
            <button className="photo-lightbox-close" onClick={onClose}>&times;</button>
        </motion.div>
    </motion.div>
);

// === Tab Content Components ===
const InfinityContent = ({ onSpeakerSelect, onPhotoSelect }) => (
    <motion.div key="infinity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-12">
        <section>
            <SectionHeading>
                <div className="flex items-baseline flex-wrap gap-x-3">
                    <span>About the theme: <span className="uppercase">Infinity</span></span><span className="subtitle">beyond Innovation</span>
                </div>
            </SectionHeading>
            <div className="theme-grid">
                <div className="theme-image"><img src={'https://tedxhitam.com/assets/pasteditions/tedx2023/infinity_logo.png'} alt="TEDx HITAM Infinity Logo" className="rounded-lg infinity-logo" /></div>
                <div className="theme-description">
                    <p>The TEDx HITAM theme, <b>"Infinity: Beyond Innovation"</b>, challenges us to move beyond simply improving what already exists. It's a call to transcend conventional boundaries and explore the uncharted territories of imagination and creativity.</p>
                    <p>This theme embraces <b>"Infinity"</b> as a symbol of limitless potential. It's a quest to unveil visionary ideas, foster mindsets that embrace the unknown, and inspire the kind of positive, transformative change that redefines our future.</p>
                </div>
            </div>
        </section>
        <section>
            <SectionHeading>Speakers</SectionHeading>
            <motion.div className="speaker-grid" variants={containerVariants} initial="hidden" animate="visible">
                {infinitySpeakerData.map((speaker, index) => <SpeakerCard key={index} speaker={speaker} onSelect={onSpeakerSelect} className="year-2023" />)}
            </motion.div>
        </section>
        <section>
            <SectionHeading>Event Moments</SectionHeading>
            <InfiniteScroller items={infinityPhotoData} renderItem={(src) => <PhotoCard src={src} onSelect={onPhotoSelect} />} direction="left" speed="slow" />
        </section>
        <section className="video-section">
            <a href="https://www.youtube.com/playlist?list=PL1wyFIFJNFh-Cbp1mUxPcN45gqlQKEjw4" target="_blank" rel="noopener noreferrer" className="watch-button">Watch the Videos</a>
        </section>
    </motion.div>
);

const RippleResonateContent = ({ onSpeakerSelect, onPhotoSelect }) => (
    <motion.div key="rr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-12">
        <section>
            <SectionHeading>
                <div className="flex items-baseline flex-wrap gap-x-3"><span>About the theme: <span className="uppercase">Ripple & Resonate</span></span></div>
            </SectionHeading>
            <div className="theme-grid">
                <div className="theme-image"><img src={'https://tedxhitam.com/assets/pasteditions/tedx2024/RandR_logo.png'} alt="TEDx HITAM Ripple & Resonate Logo" className="rounded-lg randr-logo" /></div>
                <div className="theme-description">
                    <p>"Ripple and Resonate" embodies the concept that even the tiniest of thoughts/ideas, when put into action, can have significant, far-reaching effects that positively impact communities. The ripple effect of ideas refers to how a single idea or action can propagate outward, influencing a broader context and generating further reactions or changes.</p>
                    <p>Similar to how a single pebble causes ripples in a pond, each individual has the power to initiate waves of positive change. In the current digital age where ideas could go viral instantaneously through various Social Media platforms any idea has the potential to lead global transformation.</p>
                </div>
            </div>
        </section>
        <section>
            <SectionHeading>Speakers</SectionHeading>
            <motion.div className="speaker-grid" variants={containerVariants} initial="hidden" animate="visible">
                {rrSpeakerData.map((speaker, index) => <SpeakerCard key={index} speaker={speaker} onSelect={onSpeakerSelect} className="year-2024" />)}
            </motion.div>
        </section>
        <section>
            <SectionHeading>Event Moments</SectionHeading>
            <InfiniteScroller items={rrPhotoData} renderItem={(src) => <PhotoCard src={src} onSelect={onPhotoSelect} />} direction="left" speed="slow" />
        </section>
        <section className="video-section">
            <a href="https://www.youtube.com/playlist?list=PL1wyFIFJNFh8k_-yrg-f59IrWCKO9Spki" target="_blank" rel="noopener noreferrer" className="watch-button">Watch the Videos</a>
        </section>
    </motion.div>
);

// === Main Page ===
export default function PastEditions() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null); 

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className="tab-wrapper">
                    <div className="tab-container">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}>
                                {activeTab === tab.id && <motion.div layoutId="active-pill" className="active-pill" transition={{ type: 'spring', duration: 0.6 }} />}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <main>
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} className="content-box">
                            {activeTab === 'infinity' ? 
                                <InfinityContent onSpeakerSelect={setSelectedSpeaker} onPhotoSelect={setSelectedPhoto} /> : 
                                <RippleResonateContent onSpeakerSelect={setSelectedSpeaker} onPhotoSelect={setSelectedPhoto} />
                            }
                        </motion.div>
                    </AnimatePresence>
                </main>
                <AnimatePresence>
                    {selectedSpeaker && (<SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />)}
                </AnimatePresence>
                <AnimatePresence>
                    {selectedPhoto && (<PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />)}
                </AnimatePresence>
            </div>
        </div>
    );
}
