import React from 'react';
import './agenda.css';

// Simple inline SVG icons

const IconClock = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);


const IconUser = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const IconTeam = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="9" cy="7" r="4"/>
    <circle cx="17" cy="7" r="4"/>
    <path d="M2 22c0-4 4-6 7-6s7 2 7 6" />
    <path d="M10 16c2 0 6 2 6 6" />
  </svg>
);

const IconTrophy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M8 21h8M12 17c2 0 4-2 4-4V3H8v10c0 2 2 4 4 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M4 5h4v2c0 2-2 4-4 4V5zM20 5h-4v2c0 2 2 4 4 4V5z" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const IconSound = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M9 9v6h4l5 5V4l-5 5H9z" />
  </svg>
);

const IconCoffee = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 8h2a3 3 0 0 1 0 6h-2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M2 8h16v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M6 2v2M10 2v2M14 2v2" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

// Utility to create safe class names
const slug = (str) => str.toLowerCase().replace(/\s+/g, '-');

const Timeline = () => {
  const eventData = {
    title: "TEDx HITAM",
    coordinator: "Dr. K Bindu Madhavi",
    date: "20/09/2025",
    venue: "HITAM Campus",
    contact: "tedx@hitam.ac.in"
  };

const scheduleItems = [
{ id: 1, time: '09:00', endTime: '09:30', title: 'Speakers Interaction with Leadership', description: 'Initial interaction and briefing session for speakers with the organizing team and leadership.', category: 'Preparation', icon: <IconTeam /> },
{ id: 2, time: '09:30', endTime: '10:00', title: 'Assembling Participants', description: 'Registration and check-in process for all attendees and participants.', category: 'Registration', icon: <IconUser /> },
{ id: 3, time: '10:00', endTime: '10:15', title: 'Lamp Lighting Ceremony', description: 'Traditional lamp lighting by Director, Principal, Registrar, and Chief Mentor.', category: 'Opening', icon: <IconTrophy /> },
{ id: 4, time: '10:15', endTime: '10:20', title: 'Song by Tejal', description: 'Welcome performance to set the tone for the event.', category: 'Performance', icon: <IconSound /> },
{ id: 5, time: '10:20', endTime: '10:25', title: 'Welcome Note by Ishita Roy', description: 'Official welcome address to all attendees and participants.', category: 'Opening', icon: <IconUser /> },
{ id: 6, time: '10:25', endTime: '10:35', title: 'Welcome Dance by Varsha and Team', description: 'Cultural performance to energize the audience.', category: 'Performance', icon: <IconSound /> },
{ id: 7, time: '10:35', endTime: '10:50', title: 'TEDx Speaker - 1', description: 'First inspiring talk of the day.', category: 'Speaker', icon: <IconUser /> },
{ id: 8, time: '10:50', endTime: '11:05', title: 'TEDx Speaker - 2', description: 'Second thought-provoking presentation.', category: 'Speaker', icon: <IconUser /> },
{ id: 9, time: '11:05', endTime: '11:20', title: 'TEDx Speaker - 3', description: 'Third inspiring talk sharing innovative ideas.', category: 'Speaker', icon: <IconUser /> },
{ id: 10, time: '11:20', endTime: '11:35', title: 'Break - TED Talk', description: 'Networking break with light refreshments.', category: 'Break', icon: <IconCoffee /> },
{ id: 11, time: '11:35', endTime: '11:50', title: 'TEDx Speaker - 4', description: 'Fourth engaging presentation.', category: 'Speaker', icon: <IconUser /> },
{ id: 12, time: '11:50', endTime: '12:05', title: 'TEDx Speaker - 5', description: 'Fifth inspiring talk of the day.', category: 'Speaker', icon: <IconUser /> },
{ id: 13, time: '12:05', endTime: '12:20', title: 'TEDx Speaker - 6', description: 'Sixth thought-provoking presentation.', category: 'Speaker', icon: <IconUser /> },
{ id: 14, time: '12:20', endTime: '12:30', title: "Curator's Note by Rahil Hussain", description: 'Special message from the event curator.', category: 'Special', icon: <IconUser /> },
{ id: 15, time: '12:30', endTime: '12:40', title: 'Volunteer Recognition', description: 'Appreciation and recognition of dedicated volunteers.', category: 'Special', icon: <IconTrophy /> },
{ id: 16, time: '12:40', endTime: '12:50', title: 'Vote of Thanks by Pravallika Sayyaparaju', description: 'Formal gratitude to all participants and supporters.', category: 'Closing', icon: <IconUser /> },
{ id: 17, time: '13:00', endTime: '14:00', title: 'Lunch for Audience & Volunteers', description: 'Networking lunch for all attendees and volunteers (250 members).', category: 'Break', icon: <IconCoffee /> },
{ id: 18, time: '14:00', endTime: '15:00', title: 'Lunch for Speakers and Leadership', description: 'Special lunch session for speakers and organizing committee.', category: 'Break', icon: <IconCoffee /> }
];

  return (
    <div className="timeline-container">
      <header className="timeline-header">
        <div className="tedx-logo">
          <span className="ted">TED</span>
          <span className="x">x</span>
          <span className="event">HITAM</span>
        </div>
        <h1 className="event-title">Event Schedule</h1>
        <div className="event-meta">
          <p>📅 {eventData.date} • 📍 {eventData.venue}</p>
          <p>👤 Coordinator: {eventData.coordinator}</p>
        </div>
      </header>

      <main className="timeline-main">
        <div className="timeline-line" aria-hidden></div>

        {scheduleItems.map((item, index) => {
          const side = index % 2 === 0 ? 'left' : 'right';
          const catClass = `cat-${slug(item.category)}`;

          return (
            <article key={item.id} className={`timeline-item ${side}`}>
              <div className={`timeline-dot ${catClass}`} aria-hidden>
                <span className="dot-icon">{item.icon}</span>
              </div>

              <div className={`timeline-card ${side}`}>
                <div className="card-top">
                  <div className={`time-badge ${catClass}`}>
                    <IconClock />
                    <time>{item.time} – {item.endTime}</time>
                  </div>
                  <div className={`category-badge ${catClass}`}>{item.category}</div>
                </div>

                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.description}</p>
              </div>
            </article>
          );
        })}
      </main>

      <footer className="timeline-footer">
        <div className="footer-inner">
          <section>
            <h4>TEDxHITAM</h4>
            <p>Independently organized TED event.</p>
            <p>© 2025 TEDxHITAM — Licensed by TED.</p>
          </section>
          <section>
            <h4>Details</h4>
            <p>📍 {eventData.venue}</p>
            <p>📅 {eventData.date}</p>
            <p>✉️ {eventData.contact}</p>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default Timeline;
