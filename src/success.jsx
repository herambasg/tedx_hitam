import React from 'react';
// Note: Assuming you are using react-router-dom for navigation.
// If not, you can replace the onClick handlers with your navigation logic.
import { useNavigate } from 'react-router-dom';
import { Button, Result, ConfigProvider, Typography } from 'antd';

const { Paragraph } = Typography;

function Success() {
  // Hook for navigation
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/'); // Navigates to the homepage
  };

  const handlePastEditions = () => {
    navigate('/past-editions'); // Navigates to the past editions page
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#e62b1e', // Using the official TEDx red
          colorText: '#ffffff',
          colorTextHeading: '#ffffff',
          colorTextDescription: '#d9d9d9', // A slightly brighter grey for better readability
        },
        components: {
          Result: {
            titleFontSize: 32, // Made title slightly larger
            subtitleFontSize: 16,
            colorTextHeading: '#ffffff',
            colorTextDescription: '#d9d9d9',
          },
          Button: {
            colorPrimary: '#e62b1e',
            colorTextLightSolid: '#ffffff', // Ensures text on primary button is white
            colorPrimaryHover: '#ff473a',
            colorPrimaryActive: '#c01e12',
            defaultColor: '#ffffff',
            defaultBg: 'transparent',
            defaultBorderColor: '#ffffff',
          },
        },
      }}
    >
      <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2rem ' }}>
        <Result
          status="success"
          title="You're In! Welcome to TEDxHITAM."
          subTitle={
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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