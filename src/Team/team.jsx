import React, { useState } from "react";
import Card from "./card";
import Tabs from "./tabs";
import './team.css';
import './tabs.css';

const TABS_DATA = [
    { id: 'team2025', label: 'TEDx HITAM 3.0: Invisible (2025)' },
    { id: 'team2024', label: 'TEDx HITAM 2.0: Ripple & Resonate (2024)' },
    { id: 'team2023', label: 'TEDx HITAM 1.0: Infinity (2023)' }
];

const TEAM_2025_DATA = {
    advisors: [
        { name: 'Dr. Sohum Sohoni', des: 'Director, HITAM', img: 'team/team2025/advisors/1.jpg', url: 'https://www.linkedin.com/in/ssohoni/' },
        { name: 'Dr. S. Aravind', des: 'Principal, HITAM', img: 'team/team2025/advisors/2.jpg' },
        { name: 'Dr. K. Bindu Madhavi', des: 'Assistant Dean Student Engagement, HITAM', img: 'team/team2025/advisors/3.jpg' }
    ],
    core: [
        { name: 'Ishita Roy', des: 'Chair', img: 'team/team2025/core/1.jpg', url: 'https://www.linkedin.com/in/ishitadroy' },
        { name: 'Pravallika Sayyaparaju', des: 'Co-Chair', img: 'team/team2025/core/2.jpg', url: 'https://www.linkedin.com/in/pravallika-sayyapparaju' },
        { name: 'Rahil Hussain', des: 'Curator', img: 'team/team2025/core/3.jpg', url: 'https://www.linkedin.com/in/rahilhussain-04' },
        { name: 'Akshitha Thakur', des: 'Mentor', img: 'team/team2025/core/4.jpeg', url: 'https://www.linkedin.com/in/akshitha-thakur-818788232/' },
        { name: 'Heramba Sai Ganesh', des: 'Organizer', img: 'team/team2025/core/5.png', url: 'https://www.linkedin.com/in/herambasgp/' }
    ],
    executive: [
        { name: 'Alwala Satvika Reddy', des: 'Curator', img: 'team/team2025/excom/1.jpg', url: 'https://www.linkedin.com/in/alwala-satvika-reddy-8a3287256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
        { name: 'G . Sree Varsha', des: 'Event Manager', img: 'team/team2025/excom/2.jpg', url: 'https://www.linkedin.com/in/varsha-g-575b55247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
        { name: 'Zahrah', des: 'Public Relations Head', img: 'team/team2025/excom/3.jpg', url: 'https://www.linkedin.com/in/zahrah-aamaal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
        { name: 'Baavith Reddy Anugu', des: 'Sponsorship & Budget Manager', img: 'team/team2025/excom/4.jpg', url: 'https://www.linkedin.com/in/baavith-reddy-anugu-062655317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
        { name: 'SK. Thouhid Ali', des: 'Logistics Head', img: 'team/team2025/excom/5.jpg', url: 'https://www.linkedin.com/in/thouhid-ali-7ab06b286' },
        { name: 'Kavitha Singh', des: 'Executive Producer', img: 'team/team2025/excom/6.jpg', url: 'https://www.linkedin.com/in/kavitha-singh-65235b261/' },
        { name: 'N Balaji', des: 'Website Manager', img: 'team/team2025/excom/7.jpg', url: 'https://www.linkedin.com/in/balaji-n152004' },
        { name: 'Sai Vyshnavi', des: 'Registrations Head', img: 'team/team2025/excom/8.jpg', url: 'https://www.linkedin.com/in/sai-vyshnavi-kammampati-3a8ba62aa' },
        { name: 'Adari Vishnu', des: 'Designer & Video and Production Lead', img: 'team/team2025/excom/9.jpg', url: 'https://www.linkedin.com/in/adari-vishnu-091131291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' }
    ]
};

const TEAM_2024_DATA = {
    advisors: [
        { name: 'Col. Vikram Subramaniam', des: 'Dean Student Engagement, HITAM', img: 'team/team2024/advisors/1.jpg' },
        { name: 'Dr. K. Bindu Madhavi', des: 'Assistant Dean Student Engagement, HITAM', img: 'team/team2024/advisors/2.jpg' }
    ],
    core: [
        { name: 'Sharath Bhargav', des: 'Chair', img: 'team/team2024/core/1.jpg', url: 'https://www.linkedin.com/in/sharath-bhargav-340255227/' },
        { name: 'B.Shiva Rakshitha', des: 'Co-Chair', img: 'team/team2024/core/2.jpg', url: 'https://www.linkedin.com/in/shiva-rakshitha-224739200/' },
        { name: 'Rahil Hussain', des: 'Curator', img: 'team/team2024/core/3.jpg', url: 'https://www.linkedin.com/in/rahilhussain-04/' },
        { name: 'Shrenik Balaji', des: 'Student Mentor', img: 'team/team2024/core/4.jpg', url: 'https://www.linkedin.com/in/shrenik-balaji-sirimilla-95544b244/' },
        { name: 'Bandaru Uday', des: 'Student Mentor', img: 'team/team2024/core/5.jpg', url: 'https://www.linkedin.com/in/bandaru-uday-024833228/' },
        { name: 'Akshitha Thakur', des: 'Organiser', img: 'team/team2024/core/6.jpg', url: 'https://www.linkedin.com/in/akshitha-thakur-818788232/' },
        { name: 'Ishita Roy', des: 'Organiser', img: 'team/team2024/core/7.jpg', url: 'https://www.linkedin.com/in/ishitadroy/' }
    ],
    executive: [
        { name: 'Kante Hrushitha', des: 'Curator', img: 'team/team2024/excom/1.jpg', url: 'https://www.linkedin.com/in/hrushita-kante-1270ba28b/' },
        { name: 'Pravallika Sayyaparaju', des: 'Event Manager', img: 'team/team2024/excom/2.jpg', url: 'https://www.linkedin.com/in/pravallika-sayyapparaju-9b2650254/' },
        { name: 'Ch. Pravalika Reddy', des: 'Website Manager', img: 'team/team2024/excom/3.jpg', url: 'https://www.linkedin.com/in/pravalika-reddy-29607222a/' },
        { name: 'Neeharika Duvvuru', des: 'PR Head', img: 'team/team2024/excom/4.jpg', url: 'https://www.linkedin.com/in/duvvuru-neeharika-reddy-aa4a94282/' },
        { name: 'Surya Vamsi', des: 'Video & Production Lead', img: 'team/team2024/excom/5.jpg', url: 'https://www.linkedin.com/in/eluri-surya-vamsi-94833b235/' },
        { name: 'Karthik Manda', des: 'Design & Creation Manager', img: 'team/team2024/excom/6.png', url: 'https://www.linkedin.com/in/karthikm2003/' },
        { name: 'Rithin Varma', des: 'Sponsorship & Budget Manager', img: 'team/team2024/excom/7.jpg', url: 'https://www.linkedin.com/in/rithin-varma-4755a5327/' },
        { name: 'Kaushik Naidu', des: 'Event Manager', img: 'team/team2024/excom/8.jpg', url: 'https://www.linkedin.com/in/kaushik-naidu-8274b4227/' },
    ]
};

const TEAM_2023_DATA = {
    advisors: [
        { name: 'Dr. K. Bindu Madhavi', des: 'Assistant Dean Student Engagement, HITAM', img: 'team/team2023/advisors/1.jpg' }
    ],
    core: [
        { name: 'Rahil Hussain', des: 'Chair', img: 'team/team2023/core/1.jpg', url: 'https://www.linkedin.com/in/rahilhussain-04/' },
        { name: 'Shivani', des: 'Co-Chair', img: 'team/team2023/core/2.jpg', url: 'https://www.linkedin.com/in/shivani-singh-a65b6b1b2/' },
        { name: 'Aashrith satya', des: 'Student Mentor', img: 'team/team2023/core/3.jpg', url: 'https://www.linkedin.com/in/aasrithsatya/' },
        { name: 'Shrenik Balaji', des: 'Organiser', img: 'team/team2023/core/4.jpg', url: 'https://www.linkedin.com/in/shrenik-balaji-sirimilla-95544b244/' },
        { name: 'Akshitha Thakur', des: 'Curator', img: 'team/team2023/core/5.jpg', url: 'https://www.linkedin.com/in/akshitha-thakur-818788232/' }
    ],
    executive: [
        { name: 'Sharat bhargav', des: 'Event manager', img: 'team/team2023/excom/1.jpg', url: 'https://www.linkedin.com/in/sharath-bhargav-340255227/' },
        { name: 'Adupa Nithin Sai', des: 'Website Manager', img: 'team/team2023/excom/2.jpg', url: 'https://www.linkedin.com/in/nithinsaiadupa/' },
        { name: 'Anirudh', des: 'Website Manager', img: 'team/team2023/excom/3.jpg', url: 'https://www.linkedin.com/in/anirudh-aakula-641819274/' },
        { name: 'Mouli', des: 'Design manager', img: 'team/team2023/excom/4.jpg', url: 'https://www.linkedin.com/in/mouli-garladinne-591118227/' },
        { name: 'Sriya seethapalli', des: 'Event producer', img: 'team/team2023/excom/5.jpg', url: 'https://www.linkedin.com/in/sriya-seethepalli/' },
        { name: 'Nihal yalla', des: 'sponsorship manager', img: 'team/team2023/excom/6.jpg', url: 'https://www.linkedin.com/in/nihal-yalla-18126852/' },
        { name: 'Poojita', des: 'Video and production lead', img: 'team/team2023/excom/7.jpg', url: '' },
        { name: 'D L Jahnavi', des: 'CEM Director', img: 'team/team2023/excom/8.jpg', url: '' }
    ]
};


function Team() {
    const [activeTab, setActiveTab] = useState(TABS_DATA[0].id);
    const getTeamData = () => {
        switch (activeTab) {
            case 'team2025':
                return TEAM_2025_DATA;
            case 'team2024':
                return TEAM_2024_DATA;
            case 'team2023':
                return TEAM_2023_DATA;
            default:
                return TEAM_2025_DATA;
        }
    };

    const currentTeamData = getTeamData();
    const activeTabInfo = TABS_DATA.find(tab => tab.id === activeTab);
    const year = activeTabInfo ? activeTabInfo.label.match(/\d{4}/)[0] : '2025';


    return (
        <div className="maindivteam">
            <div style={{ textAlign: 'center', padding: '5px 40px' }}>
                <h1><span style={{ color: 'red' }}><b>TEDx</b></span> HITAM {year} TEAM</h1>
                <p style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    maxWidth: '80ch',
                    margin: '0 auto'
                    }}>
                    A passionate tribe of <b>HITAMights</b>, crafting unforgettable <b>TEDx</b> experiences that spark ideas and ignite conversations resonating far beyond the stage.
                </p>
                {/* Render the new Tabs component */}
                <Tabs tabs={TABS_DATA} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div style={{ padding: '5px 40px' }}>
                <h1 className="HeadS">Our Advisors</h1>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                    {currentTeamData.advisors.map((member, index) => (
                        <Card key={index} name={member.name} des={member.des} img={member.img} linkedin={member.url} />
                    ))}
                </div>
            </div>

            {/* Conditionally render team members based on the active tab */}
            <div style={{ padding: '5px 40px' }}>
                <h1 className="HeadS">Core Team</h1>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                    {currentTeamData.core.map((member, index) => (
                        // FIX: Changed props to be lowercase and used 'linkedin' instead of 'url'
                        <Card key={index} name={member.name} des={member.des} img={member.img} linkedin={member.url} />
                    ))}
                </div>
            </div>

            <div style={{ padding: '5px 40px' }}>
                <h1 className="HeadS">Executive Committee</h1>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                    {currentTeamData.executive.map((member, index) => (
                        // FIX: Changed props to be lowercase and used 'linkedin' instead of 'url'
                        <Card key={index} name={member.name} des={member.des} img={member.img} linkedin={member.url} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Team;