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
  MenuItem
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
    text: { primary: "#fff", secondary: "#ccc" }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "Roboto, sans-serif",
    button: { textTransform: "none" }
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
  const [proofFileList, setProofFileList] = useState([]); // ✅ New state for payment proof
  const [err, setErr] = useState("");
  const [Passout, setPassout] = useState("");
  const [OClg, setOClg] = useState("");
  const [EmpCom, setEmpCom] = useState("");
  const [Designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isStepOneValid = () => {
    if (!FName || !Email || !Mno) return false;
    switch (userType) {
      case "student":
        return RNo && Branch && Year;
      case "faculty":
        return RNo;
      case "alumni":
        return Passout;
      case "outside":
        return RNo;
      default:
        return false;
    }
  };

  const isFinalStepValid = () => TxnID && proofFileList.length > 0;

  const handleSeatChange = (selectedSeat) => {
    setSeat(selectedSeat);
  };

  const handleSubmit = async () => {
    if (!Seat || !TxnID) {
      return message.error("Please complete all required fields including Transaction ID.");
    }
    setLoading(true);
    try {
      // ✅ Step 1: Update seat in Firebase
      const seatRef = ref(db, `seats/${Seat}`);
      await update(seatRef, {
        status: "selected",
        roll: RNo,
        timestamp: null
      });

      // ✅ Step 2: Prepare form data
      const formData = new FormData();
      formData.append("name", FName + " " + LName);
      formData.append("rollNo", RNo);
      formData.append("branch", Branch);
      formData.append("year", Year);
      formData.append("email", Email);
      formData.append("mobile", Mno);
      formData.append("txnId", TxnID);
      formData.append("userType", userType);
      formData.append("seatNo", Seat);
      formData.append("oclg", OClg);
      formData.append("passout", Passout);
      formData.append("Designation", Designation);
      formData.append("EmpCom", EmpCom);

      // ✅ ID Card File
      if (userType !== "alumni") {
        if (fileList.length > 0) {
          formData.append("idCard", fileList[0].originFileObj);
        }
      } else {
        // Alumni dummy file
        const dummyPNG =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVQIW2P4//8/AwAI/AL+mxKWKAAAAABJRU5ErkJggg==";
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

      // ✅ Payment Proof File
      if (proofFileList.length > 0) {
        formData.append("paymentScreenshot", proofFileList[0].originFileObj);
      }

      // ✅ Step 3: Send to backend  https://tedxhitam-bueuc4cph0fhhwdq.eastus-01.azurewebsites.net/api/booking
      await axios.post(
        "https://tedxhitam-bueuc4cph0fhhwdq.eastus-01.azurewebsites.net/api/booking",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLoading(false);
      navigate("/success");
    } catch (error) {
      setLoading(false);
      console.error("❌ Error submitting booking:", error);
      setErr(
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again."
      );
      message.error("❌ Booking submission failed.");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  const handleProofFileChange = ({ fileList }) => {
    setProofFileList(fileList.slice(-1));
  };

  const renderConditionalFields = () => {
    switch (userType) {
      case "student":
        return (
          <>
            <TextField label="Roll Number" value={RNo} onChange={(e) => setRNo(e.target.value.toUpperCase())} fullWidth required />
            <TextField select label="Branch" value={Branch} onChange={(e) => setBranch(e.target.value)} fullWidth required>
              {["CSE", "ECE", "EEE", "MECH", "CSC", "CSO", "CSD", "CSM"].map(opt => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Year" value={Year} onChange={(e) => setYear(e.target.value)} fullWidth required>
              {["1", "2", "3", "4"].map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>
          </>
        );
      case "faculty":
        return (
          <TextField select label="Department" value={RNo} onChange={(e) => setRNo(e.target.value)} fullWidth required>
            {["CSE Department", "ECE Department", "EEE Department", "MECH Department", "ET Department", "H&S DepartmentS"].map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
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
        return (
          <TextField label="Designation" onChange={(e) => setRNo(e.target.value.toUpperCase())} fullWidth />
        );
      default:
        return null;
    }
  };

  const stepContent = [
    // Step 1
    <Box display="flex" flexDirection="column" gap={2} maxWidth={600} mx="auto">
      <Typography variant="h5" color="primary">Step in. Access the invisible.</Typography>
      <div className="fullname">
        <TextField label="First Name" value={FName} onChange={(e) => setFName(e.target.value.toUpperCase())} fullWidth required />
        <TextField label="Last Name" value={LName} onChange={(e) => setLName(e.target.value.toUpperCase())} fullWidth required />
      </div>
      <TextField label="Email" type="email" value={Email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
      <TextField label="Mobile Number" type="tel" value={Mno} onChange={(e) => setMno(e.target.value)} fullWidth required />

      <ConfigProvider
        theme={{
          token: { colorPrimary: '#c71f37' },
          components: {
            Radio: {
              colorPrimary: '#c71f37',
              buttonSolidCheckedBg: '#c71f37',
              buttonSolidCheckedColor: '#fff'
            }
          }
        }}
      >
        <Flex vertical gap="middle">
          <Radio.Group
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            buttonStyle="solid"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: 'center' }}
          >
            <Radio.Button value="student">HITAM Student</Radio.Button>
            <Radio.Button value="faculty">HITAM Faculty</Radio.Button>
            <Radio.Button value="alumni">HITAM Alumni</Radio.Button>
            <Radio.Button value="outside">HITAM Leadership</Radio.Button>
          </Radio.Group>
        </Flex>
      </ConfigProvider>

      {renderConditionalFields()}

      {!(userType === "alumni") && (
        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          onRemove={() => setFileList([])}
          fileList={fileList}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />} style={{ backgroundColor: "#c71f37", color: "#fff" }}>
            Upload ID Card
          </Button>
        </Upload>
      )}
    </Box>,

    // Step 2
    <SeatBooking RNo={Mno} Name={FName} onSeatChange={handleSeatChange} />,

    // Step 3
    <Box display="flex" maxWidth={600} mx="auto" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6" color="secondary">Confirm Your Details</Typography>
      <Typography><strong>Name:</strong> {FName + " " + LName}</Typography>
      <Typography><strong>Mobile:</strong> {Mno}</Typography>
      <Typography><strong>Email:</strong> {Email}</Typography>
      <Typography><strong>Registration Type:</strong> {"HITAM " + userType.toUpperCase()}</Typography>
      <Typography><strong>Seat No:</strong> {Seat}</Typography>
      <Typography>
        <strong>Amount to be paid : Rs. </strong>
        {userType.includes("student") ? "500" :
         userType.includes("faculty") ? "750" :
         userType.includes("outside") ? "1000" : "1000"}
      </Typography>

      <img src={QR} alt="QR Code" style={{ maxWidth: "250px", margin: "10px 0" }} />

      <TextField
        label="Transaction ID"
        value={TxnID}
        onChange={(e) => setTxnID(e.target.value.toUpperCase())}
        fullWidth
        variant="outlined"
        required
      />

      {/* ✅ New payment proof upload */}
      <Upload
        beforeUpload={() => false}
        onChange={handleProofFileChange}
        onRemove={() => setProofFileList([])}
        fileList={proofFileList}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />} style={{ backgroundColor: "#c71f37", color: "#fff" }}>
          Upload Payment Proof
        </Button>
      </Upload>

      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isFinalStepValid()}>
        Submit Details
      </Button>

      {err && (
        <Typography color="error" mt={2}>
          ❌ {err}
        </Typography>
      )}
    </Box>
  ];

  return (
    <ThemeProvider theme={theme}>
      <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Spin spinning={loading} fullscreen />
        <Box sx={{ backgroundColor: "#000", minHeight: "100vh", py: 4 }}>
          <Box maxWidth="lg" margin="0 auto" px={2}>
            <Stepper activeStep={current} alternativeLabel style={{marginTop:"100px"}}>
              {["Details", "Seat Selection", "Confirmation"].map((label, index) => (
                <Step key={index}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            <Box mt={4} p={3} borderRadius={3} sx={{ backgroundColor: "#111", color: "#fff" }}>
              {stepContent[current]}
            </Box>

            <Box mt={4} display="flex" justifyContent="center" gap={2}>
              {current > 0 && (
                <Button onClick={() => setCurrent(current - 1)} variant="outlined" color="primary">
                  Previous
                </Button>
              )}
              {current < stepContent.length - 1 && (
                <Button
                  onClick={() => setCurrent(current + 1)}
                  variant="contained"
                  color="primary"
                  disabled={current === 0 && !isStepOneValid()}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <p style={{ color: 'aliceblue', textAlign: "center", marginTop: "20px", fontFamily: "Helvetica, sans-serif" }}>
          Facing issues with seat booking?{" "}
          <a
            href="https://wa.me/919640040089?text=Hey%2C%20I%20am%20facing%20issues%20with%20seat%20booking."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e62b1e", textDecoration: "none", fontWeight: "bold" }}
          >
            Click here
          </a>
        </p>
      </ClickSpark>
    </ThemeProvider>
  );
}

export default Booking;
