import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result, ConfigProvider, Typography } from 'antd';
import Threads from './ReactBits/threads.jsx'; // Corrected import path

const { Paragraph } = Typography;

function Success() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  const handlePastEditions = () => {
    navigate('/pasteditions'); // Corrected path
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#e62b1e',
          colorText: '#ffffff',
          colorTextHeading: '#ffffff',
          colorTextDescription: '#d9d9d9',
        },
        components: {
          Result: {
            titleFontSize: 32,
            subtitleFontSize: 16,
            colorTextHeading: '#ffffff',
            colorTextDescription: '#d9d9d9',
          },
          Button: {
            colorPrimary: '#e62b1e',
            colorTextLightSolid: '#ffffff',
            colorPrimaryHover: '#ff473a',
            colorPrimaryActive: '#c01e12',
            defaultColor: '#ffffff',
            defaultBg: 'transparent',
            defaultBorderColor: '#ffffff',
          },
        },
      }}
    >
      <div style={{ position: 'relative', background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Threads />
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              width: '100%',
              left: '50%',
              top: '50%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
              opacity: 0.3,
            }}
          >
            <source src="https://videos.pexels.com/video-files/3248906/3248906-hd.mp4" type="video/mp4" />
          </video>
        </div>
        <Result
          status="success"
          title="You're In! Welcome to TEDxHITAM."
          subTitle={
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <Paragraph>
                Thank you for registering for the 3rd edition of TEDxHITAM! Your booking is confirmed, and we are thrilled to have you join us.
              </Paragraph>
              <Paragraph>
                Your official ticket and event details have been sent to your email. <strong>Please check your inbox!</strong>
              </Paragraph>
              <Paragraph>
                Prepare to be inspired by an amazing lineup of speakers who will explore this year's powerful theme: <strong>Invisible</strong>. We can't wait to share a day of groundbreaking ideas and meaningful connections with you.
              </Paragraph>
              <Paragraph style={{ marginTop: '24px', fontSize: '1.1em', color: '#ffffff', fontWeight: 'bold' }}>
                See you on September 20th at the HITAM Campus!
              </Paragraph>
            </div>
          }
          extra={[
            <Button type="primary" key="home" size="large" onClick={handleReturnHome}>
              Return Home
            </Button>,
            <Button key="past" size="large" onClick={handlePastEditions}>
              Checkout Our Past Editions
            </Button>,
          ]}
        />
      </div>
    </ConfigProvider>
  );
}

export default Success;