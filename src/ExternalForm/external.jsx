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
  const [screenshot, setScreenshot] = useState(null);
  const [fileName, setFileName] = useState("");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async () => {
    if (!FName || !LName || !Phone || !Email || !Organization || !Designation || !Seat || !TxnID || !screenshot) {
      return message.error("❌ Please fill out all fields and upload the payment screenshot before submitting.");
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
      formData.append("paymentScreenshot", screenshot);

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
          <>
            <Box 
              className="form-step" 
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "20px",
                background: "#111",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)"
              }}
            >
              {/* Left Column: User Details */}
              <Box 
                sx={{
                  flex: 1,
                  padding: "20px",
                  background: "#1a1a1a",
                  borderRadius: "10px",
                  color: "#fff"
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: "15px", color: "#e62b1e" }}>
                  Your Details
                </Typography>
                <Typography><strong>Name:</strong> {FName} {LName}</Typography>
                <Typography><strong>Email:</strong> {Email}</Typography>
                <Typography><strong>Phone:</strong> {Phone}</Typography>
                <Typography><strong>Organization:</strong> {Organization}</Typography>
                <Typography><strong>Designation:</strong> {Designation}</Typography>
                <Typography sx={{ marginTop: "10px" }}>
                  <strong>Selected Seat:</strong>{" "}
                  <span style={{
                    background: "#e62b1e",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px"
                  }}>
                    {Seat}
                  </span>
                </Typography>
              </Box>

              {/* Right Column: Payment */}
              <Box 
                sx={{
                  flex: 1,
                  padding: "20px",
                  background: "#1a1a1a",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start"
                }}
              >
                <Typography variant="body1" sx={{ marginBottom: "10px", color: "#fff" }}>
                  Scan the QR to complete payment:
                </Typography>
                <img 
                  src={QR} 
                  alt="Payment QR" 
                  style={{
                    maxWidth: "200px",
                    borderRadius: "8px",
                    marginBottom: "15px"
                  }} 
                />

                <TextField
                  label="Transaction ID"
                  value={TxnID}
                  onChange={(e) => setTxnID(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#000",
                      borderRadius: "5px",
                      color: "#fff",
                      "& fieldset": { borderColor: "#555" },
                      "&:hover fieldset": { borderColor: "#e62b1e" },
                      "&.Mui-focused fieldset": { borderColor: "#e62b1e" }
                    },
                    "& .MuiInputLabel-root": { color: "#aaa" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#e62b1e" }
                  }}
                />

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    borderColor: "#e62b1e",
                    color: "#e62b1e",
                    marginTop: "10px",
                    "&:hover": {
                      borderColor: "#ff3d2e",
                      backgroundColor: "rgba(230,43,30,0.1)"
                    }
                  }}
                >
                  Upload Payment Screenshot
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                {fileName && (
                  <Typography variant="body2" sx={{ marginTop: "5px", color: "#aaa" }}>
                    Selected File: {fileName}
                  </Typography>
                )}

                {err && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {err}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Action Buttons Below Both Columns */}
            <Box sx={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
              <Button 
                onClick={handleBack} 
                sx={{ color: "#fff", border: "1px solid #555" }}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSubmit} 
                disabled={loading}
                sx={{
                  background: "#e62b1e",
                  "&:hover": { background: "#ff3d2e" }
                }}
              >
                {loading ? <Spin /> : "Register"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default EBooking;
