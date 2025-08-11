import React from 'react';
import './card.css';
// REMOVED: Unnecessary import of team.css which was causing style conflicts.
import { LinkedinFilled } from '@ant-design/icons';

/**
 * A reusable card component for team members.
 * @param {object} props
 * @param {string} props.img
 * @param {string} props.name
 * @param {string} props.des
 * @param {string} props.linkedin
 */
function Card(props) {
  const { img, name, des, linkedin } = props;

  return (
    <div className="team-col-box">
      <img src={`https://tedxhitam.com/assets/${img}`} className="team-img" alt={name} />
      
      <div className="team-col-box-info">
        <div className="overlay"></div>
        
        <div className="team-col-box-details">
          
          <div className="team-name-container">
            <h6>{name}</h6>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" onClick={(e) => e.stopPropagation()}>
                <LinkedinFilled />
              </a>
            )}
          </div>

          <p>{des}</p>

        </div>
      </div>
    </div>
  );
}

export default Card;