import React, { useState } from "react";
import axios from 'axios';
import {
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ClickSpark from "../ReactBits/cursor";
import SeatBooking from "../SeatBooking/Seat";
import { message, Flex, Radio, ConfigProvider, Upload, Spin } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { db } from "../firebase";
import { ref, update } from "firebase/database";
import QR from "../Assets/Booking/QR_ORG.jpg";
import './booking.css';
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

function Booking() {
  const [current, setCurrent] = useState(0);
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [RNo, setRNo] = useState("");
  const [Branch, setBranch] = useState("");
  const [Year, setYear] = useState("");
  const [Email, setEmail] = useState("");
  const [Mno, setMno] = useState("");
  const [TxnID, setTxnID] = useState("");
  const [userType, setUserType] = useState("student");
  const [Seat, setSeat] = useState("");
  const [fileList, setFileList] = useState([]);
  const [err, setErr] = useState("");
  const [Passout,setPassout]=useState("");
  const [OClg,setOClg]=useState("");
  const [EmpCom,setEmpCom]=useState("")
  const [Designation,setDesignation]=useState("")
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  const isStepOneValid = () => {
    if (!FName || !Email || !Mno) return false;
    switch (userType) {
      case "student": return RNo && Branch && Year;
      case "faculty": return RNo;
      case "alumni": return Passout;
      case "outside": return RNo;
      default: return false;
    }
  };

  const isFinalStepValid = () => TxnID;

  const handleSeatChange = (selectedSeat) => {
    setSeat(selectedSeat);
  };

  const handleSubmit = async () => {
    if (!Seat || !TxnID) {
      return message.error("Please complete all required fields including Transaction ID.");
    }
    setLoading(true);
    try {
      const seatRef = ref(db, `seats/${Seat}`);
      await update(seatRef, { status: "selected", roll: RNo, timestamp: null });

      const formData = new FormData();
      formData.append("name", FName+" "+LName);
      formData.append("rollNo", RNo);
      formData.append("branch", Branch);
      formData.append("year", Year);
      formData.append("email", Email);
      formData.append("mobile", Mno);
      formData.append("txnId", TxnID);
      formData.append("userType", userType);
      formData.append("seatNo", Seat);
      formData.append("oclg",OClg);
      formData.append("passout",Passout);
      formData.append("Designation",Designation);
      formData.append("EmpCom",EmpCom);

      if (userType !== "alumni") {
        if (fileList.length > 0) {
          formData.append("idCard", fileList[0].originFileObj);
        }
      } else {
        const dummyPNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVQIW2P4//8/AwAI/AL+mxKWKAAAAABJRU5ErkJggg==";
        const byteString = atob(dummyPNG.split(",")[1]);
        const mimeString = dummyPNG.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const fakeFile = new File([blob], "demo.png", { type: mimeString });
        formData.append("idCard", fakeFile);
      }

      await axios.post("https://tedxhitam-bueuc4cph0fhhwdq.eastus-01.azurewebsites.net/api/booking", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      navigate("/success");
    } catch (error) {
      setLoading(false);
      console.error("❌ Error submitting booking:", error);
      setErr(error?.response?.data?.error || error?.message || "Something went wrong. Please try again.");
      message.error("❌ Booking submission failed.");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  const renderConditionalFields = () => {
    switch (userType) {
      case "student":
        return (
          <>
            <TextField label="Roll Number" value={RNo} onChange={(e) => setRNo(e.target.value.toUpperCase())} fullWidth required />
            <TextField select label="Branch" value={Branch} onChange={(e) => setBranch(e.target.value)} fullWidth required>
              {["CSE", "ECE", "EEE", "MECH", "CSC", "CSO", "CSD", "CSM"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField select label="Year" value={Year} onChange={(e) => setYear(e.target.value)} fullWidth required>
              {["1", "2", "3", "4"].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </TextField>
          </>
        );
      case "faculty":
        return (
          <TextField select label="Department" value={RNo} onChange={(e) => setRNo(e.target.value)} fullWidth required>
            {["CSE Department", "ECE Department", "EEE Department", "MECH Department", "ET Department", "H&S DepartmentS"].map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </TextField>
        );
      case "alumni":
        return (
          <>
            <TextField label="Graduation Year" onChange={(e) => setPassout(e.target.value)} fullWidth required />
            <TextField label="Current Employment Company" onChange={(e) => setEmpCom(e.target.value)} fullWidth />
            <TextField label="Designation" onChange={(e) => setDesignation(e.target.value)} fullWidth />
          </>
        );
      case "outside":
        return <TextField label="Designation" onChange={(e) => setRNo(e.target.value.toUpperCase())} fullWidth />;
      default:
        return null;
    }
  };

  const stepContent = [
    // --- ENHANCEMENT: Step 1 Layout ---
    <Box display="flex" flexDirection="column" gap={2.5} maxWidth={600} mx="auto">
      <Typography variant="h5" color="primary" className="step-title">Your Details</Typography>
      <div className="fullname-container">
        <TextField label="First Name" value={FName} onChange={(e) => setFName(e.target.value.toUpperCase())} fullWidth required />
        <TextField label="Last Name" value={LName} onChange={(e) => setLName(e.target.value.toUpperCase())} fullWidth required />
      </div>
      <TextField label="Email" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
      <TextField label="Mobile Number" type="tel" value={Mno} onChange={(e) => setMno(e.target.value)} fullWidth required />
      <ConfigProvider theme={{ token: { colorPrimary: '#c71f37' } }}>
        <Radio.Group value={userType} onChange={(e) => setUserType(e.target.value)} buttonStyle="solid" className="radio-group">
          <Radio.Button value="student">HITAM Student</Radio.Button>
          <Radio.Button value="faculty">HITAM Faculty</Radio.Button>
          <Radio.Button value="alumni">HITAM Alumni</Radio.Button>
          <Radio.Button value="outside">HITAM Leadership</Radio.Button>
        </Radio.Group>
      </ConfigProvider>
      {renderConditionalFields()}
      {!(userType === "alumni") && (
        <Upload beforeUpload={() => false} onChange={handleFileChange} onRemove={() => setFileList([])} fileList={fileList} maxCount={1}>
          <Button icon={<UploadOutlined />} variant="contained" component="span">Upload ID Card</Button>
        </Upload>
      )}
    </Box>,

    // --- ENHANCEMENT: Step 2 Layout ---
    <Box>
       <Typography variant="h5" color="primary" className="step-title" sx={{mb: 2}}>Select Your Seat</Typography>
       <SeatBooking RNo={Mno} Name={FName} onSeatChange={handleSeatChange} />
    </Box>,

    // --- ENHANCEMENT: Step 3 Layout ---
    <Box display="flex" maxWidth={700} mx="auto" flexDirection="column" alignItems="center" gap={3}>
      <Typography variant="h5" color="primary" className="step-title">Confirm & Pay</Typography>
      <Paper elevation={0} className="confirmation-summary">
        <div className="summary-grid">
            <Typography component="strong">Name:</Typography> <Typography>{FName} {LName}</Typography>
            <Typography component="strong">Mobile:</Typography> <Typography>{Mno}</Typography>
            <Typography component="strong">Email:</Typography> <Typography>{Email}</Typography>
            <Typography component="strong">Type:</Typography> <Typography>{"HITAM " + userType.toUpperCase()}</Typography>
            <Typography component="strong">Seat No:</Typography> <Typography color="primary" sx={{fontWeight: 'bold'}}>{Seat || 'Not Selected'}</Typography>
        </div>
      </Paper>
      <Box className="payment-section">
        <Typography variant="h6">
          <strong>Amount to Pay: </strong>₹{userType.includes("student") ? "500" : userType.includes("faculty") ? "750" : "1000"}
        </Typography>
        <img src={QR} alt="QR Code for payment" className="qr-code" />
        <TextField
          label="Transaction ID"
          value={TxnID}
          onChange={(e) => setTxnID(e.target.value.toUpperCase())}
          fullWidth
          variant="outlined"
          required
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isFinalStepValid() || loading} fullWidth sx={{maxWidth: 400}}>
        Submit Details
      </Button>
      {err && <Typography color="error" mt={2}>❌ {err}</Typography>}
    </Box>
  ];

  return (
    <ThemeProvider theme={theme}>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Spin spinning={loading} fullscreen />
        {/* // --- FIX: Added className for padding-top --- */}
        <Box className="booking-container">
          <Box maxWidth="lg" margin="0 auto" px={2}>
            <Stepper activeStep={current} alternativeLabel>
              {["Details", "Seat Selection", "Confirmation"].map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>
            
            {/* // --- ENHANCEMENT: Added className for better styling --- */}
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
}

export default Booking;