import React, { useState } from "react";
import axios from 'axios';
import { db } from "../firebase";
import { ref, update } from "firebase/database";
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ClickSpark from "../ReactBits/cursor";
import SeatBooking from "../SeatBooking/Seat";
import { message, Upload, Spin } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import QR from "../Assets/Booking/QR_ORG.jpg";
import './external.css'; // This will now use the unified styles
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#000", paper: "#111" },
    primary: { main: "#c71f37", contrastText: "#fff" },
    text: { primary: "#fff", secondary: "#b0b0b0" }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Roboto, sans-serif",
    button: { textTransform: "none", fontWeight: 600, letterSpacing: '0.5px' }
  }
});

const EBooking = () => {
  const [current, setCurrent] = useState(0);
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Designation, setDesignation] = useState("");
  const [TxnID, setTxnID] = useState("");
  const [Seat, setSeat] = useState("");
  const [proofFileList, setProofFileList] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [mnoError, setMnoError] = useState("");

  const isStepOneValid = () => FName && LName && Phone && Email && Organization && Designation && !emailError && !mnoError;
  const isFinalStepValid = () => TxnID && proofFileList.length > 0;

  const handleSeatChange = (selectedSeat) => {
    setSeat(selectedSeat);
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value.toLowerCase();
    setEmail(value);
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(value) && value) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleMnoChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 10) {
      setPhone(value);
      if (value.length !== 10 && value.length > 0) {
        setMnoError("Mobile number must be 10 digits.");
      } else {
        setMnoError("");
      }
    }
  };

  const handleProofFileChange = ({ fileList }) => {
    setProofFileList(fileList.slice(-1));
  };

  const handleSubmit = async () => {
    if (!isFinalStepValid()) {
      return message.error("Please fill out all fields and upload the payment screenshot before submitting.");
    }
    setLoading(true);
    try {
      const seatRef = ref(db, `seats/${Seat}`);
      await update(seatRef, {
        status: "selected",
        roll: Phone, // Using phone number as identifier
        timestamp: null,
      });

      const formData = new FormData();
      formData.append("name", `${FName} ${LName}`);
      formData.append("email", Email);
      formData.append("mobile", Phone);
      formData.append("txnId", TxnID);
      formData.append("userType", "External");
      formData.append("seatNo", Seat);
      formData.append("Designation", Designation);
      formData.append("Organization", Organization);
      formData.append("paymentScreenshot", proofFileList[0].originFileObj);

      await axios.post(
        "https://tedxhitam-bueuc4cph0fhhwdq.eastus-01.azurewebsites.net/api/bookingExternal",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("🎉 Booking successful!");
      navigate("/success");
    } catch (error) {
      console.error("❌ Error submitting booking:", error);
      setErr(error?.response?.data?.error || error?.message || "Something went wrong.");
      message.error("❌ Booking submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const stepContent = [
    // --- Step 1 ---
    <Box display="flex" flexDirection="column" gap={2.5} maxWidth={600} mx="auto">
      <Typography variant="h5" className="step-headline">Welcome! Tell Us About Yourself.</Typography>
      <div className="fullname-container">
        <TextField label="First Name" value={FName} onChange={e => setFName(e.target.value)} fullWidth required />
        <TextField label="Last Name" value={LName} onChange={e => setLName(e.target.value)} fullWidth required />
      </div>
      <TextField 
        label="Email" 
        type="email" 
        value={Email} 
        onChange={handleEmailChange} 
        fullWidth 
        required 
        error={!!emailError}
        helperText={emailError}
      />
      <TextField 
        label="Mobile Number" 
        type="tel" 
        value={Phone} 
        onChange={handleMnoChange} 
        fullWidth 
        required 
        error={!!mnoError}
        helperText={mnoError}
      />
      <TextField label="Organization / Institution Name" value={Organization} onChange={e => setOrganization(e.target.value)} fullWidth margin="normal" required/>
      <TextField label="Designation (e.g., Student, Developer)" value={Designation} onChange={e => setDesignation(e.target.value)} fullWidth margin="normal" required/>
    </Box>,

    // --- Step 2 ---
    <Box>
       <Typography variant="h5" color="primary" className="step-title" sx={{mb: 2}}>Select Your Seat</Typography>
       <SeatBooking RNo={Phone} Name={FName} onSeatChange={handleSeatChange} />
    </Box>,

    // --- Step 3 ---
    <Box>
        <div className="confirmation-grid">
            <div className="details-column">
                <Typography variant="h5" color="primary" className="step-title">Confirm Your Details</Typography>
                <Paper elevation={0} className="confirmation-summary">
                    <div className="summary-grid">
                        <Typography component="strong">Name:</Typography> <Typography>{FName} {LName}</Typography>
                        <Typography component="strong">Mobile:</Typography> <Typography>{Phone}</Typography>
                        <Typography component="strong">Email:</Typography> <Typography>{Email}</Typography>
                        <Typography component="strong">Org:</Typography> <Typography>{Organization}</Typography>
                        <Typography component="strong">Seat No:</Typography> <Typography color="primary" sx={{fontWeight: 'bold'}}>{Seat || 'Not Selected'}</Typography>
                    </div>
                </Paper>
            </div>
            <div className="payment-column">
                <Typography variant="h6" align="center"><strong>Amount to Pay: </strong>₹1000</Typography>
                <img src={QR} alt="QR Code for payment" className="qr-code" />
                <TextField label="Transaction ID" value={TxnID} onChange={(e) => setTxnID(e.target.value.toUpperCase())} fullWidth variant="outlined" required />
                <Upload
                    beforeUpload={() => false}
                    onChange={handleProofFileChange}
                    onRemove={() => setProofFileList([])}
                    fileList={proofFileList}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />} variant="contained" component="span" fullWidth>
                        Upload Payment Proof
                    </Button>
                </Upload>
            </div>
        </div>
        <Box textAlign="center" mt={4}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isFinalStepValid() || loading} sx={{minWidth: '250px'}}>
                Submit Details
            </Button>
            {err && <Typography color="error" mt={2}>❌ {err}</Typography>}
        </Box>
    </Box>
  ];

  return (
    <ThemeProvider theme={theme}>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Spin spinning={loading} fullscreen />
        <Box className="booking-container">
          <Box maxWidth="lg" margin="0 auto" px={2}>
            <Stepper activeStep={current} alternativeLabel>
              {["Details", "Seat Selection", "Confirmation"].map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>
            
            <Box mt={4} p={{xs: 2, sm: 4}} className="form-container">
              {stepContent[current]}
            </Box>

            <Box mt={4} display="flex" justifyContent="center" gap={2}>
              {current > 0 && (
                <Button onClick={() => setCurrent(current - 1)} variant="outlined" color="primary">Previous</Button>
              )}
              {current < stepContent.length - 1 && (
                <Button
                  onClick={() => setCurrent(current + 1)}
                  variant="contained"
                  color="primary"
                  disabled={(current === 0 && !isStepOneValid()) || (current === 1 && !Seat)}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
          <p className="support-text">
            Facing issues?{" "}
            <a href="https://wa.me/919640040089?text=Hey%2C%20I%20am%20facing%20issues%20with%20seat%20booking." target="_blank" rel="noopener noreferrer">
              Contact Support
            </a>
          </p>
        </Box>
      </ClickSpark>
    </ThemeProvider>
  );
};

export default EBooking;
