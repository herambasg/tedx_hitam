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
  Typography
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ClickSpark from "../ReactBits/cursor";
import SeatBooking from "../SeatBooking/Seat";
import QR from "../Assets/Booking/QR_ORG.jpg";
import './external.css';
import { useNavigate } from "react-router-dom";
import { Spin, message } from 'antd';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#000", paper: "#111" },
    primary: { main: "#e62b1e" },
    text: { primary: "#fff" }
  },
});

const EBooking = () => {
  const [step, setStep] = useState(0);
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Designation, setDesignation] = useState("");
  const [TxnID, setTxnID] = useState("");
  const [Seat, setSeat] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const isStep0Valid = FName && LName && Phone && Email && Organization && Designation;


  const navigate = useNavigate();
  const userType = "External";

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSeatChange = (selectedSeat) => {
    setSeat(selectedSeat);
  };

  const handleSubmit = async () => {
    if (!FName || !LName || !Phone || !Email || !Organization || !Designation || !Seat || !TxnID) {
      return message.error("❌ Please fill out all fields before submitting.");
    }

    setLoading(true);
    try {
      // Step 1: Update Firebase
      const seatRef = ref(db, `seats/${Seat}`);
      await update(seatRef, {
        status: "selected",
        roll: Phone,
        timestamp: null,
      });

      // Step 2: Prepare Form Data
      const formData = new FormData();
      formData.append("name", `${FName} ${LName}`);
      formData.append("email", Email);
      formData.append("mobile", Phone);
      formData.append("txnId", TxnID);
      formData.append("userType", userType);
      formData.append("seatNo", Seat);
      formData.append("Designation", Designation);
      formData.append("Organization", Organization);

      // Step 3: Submit to backend
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
      setErr(
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again."
      );
      message.error("❌ Booking submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ClickSpark />
      <Box className="form-container cont">
        <Typography variant="h4" gutterBottom align="center" color="white">
          TEDx HITAM Registration
        </Typography>
        <Typography variant="h6" gutterBottom align="center" color="white">
          Welcome to HITAM!
        </Typography>

        <Stepper activeStep={step} alternativeLabel>
          {["Fill Details", "Choose Seat", "Confirm & Pay"].map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {/* Step 1: Details */}
        {step === 0 && (
          <Box className="form-step">
            <TextField label="First Name" value={FName} onChange={e => setFName(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="Last Name" value={LName} onChange={e => setLName(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="Mobile No." value={Phone} onChange={e => setPhone(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="Email" value={Email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="Organization / Institution Name" value={Organization} onChange={e => setOrganization(e.target.value)} fullWidth margin="normal" required/>
            <TextField label="Designation (If you're student, mention Student)" value={Designation} onChange={e => setDesignation(e.target.value)} fullWidth margin="normal" required/>
            <Button variant="contained" onClick={handleNext} disabled={!isStep0Valid} sx={{ mt: 2 }}>Next</Button>
          </Box>
        )}

        {/* Step 2: Seat Selection */}
        {step === 1 && (
          <Box className="form-step">
            <SeatBooking RNo={Phone} Name={FName} onSeatChange={handleSeatChange} />
            <Button onClick={handleBack} sx={{ mt: 2, mr: 2 }}>Back</Button>
            <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>Next</Button>
          </Box>
        )}

        {/* Step 3: Confirm & Pay */}
        {step === 2 && (
          <Box className="form-step">
            <Typography variant="body1" sx={{ mb: 2 }}>
              Scan the QR below to complete payment:
            </Typography>
            <img src={QR} alt="Payment QR" style={{ maxWidth: 300 }} />
            <TextField
              label="Transaction ID"
              value={TxnID}
              onChange={(e) => setTxnID(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box sx={{ mt: 2 }}>
              <Button onClick={handleBack} sx={{ mr: 2 }}>Back</Button>
              <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                {loading ? <Spin /> : "Register"}
              </Button>
            </Box>
            {err && (
              <Typography color="error" sx={{ mt: 2 }}>
                {err}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default EBooking;
