import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import "./SeatBooking.css";

const SeatBooking = ({ Name,RNo, onSeatChange }) => {
  const delegateRows = ["D1", "D2"];
  const audienceRows = [..."ABCDEFGHI", ..."JKL"];
  const seatsPerRow = 16;

  const [seatsData, setSeatsData] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const seatsRef = ref(db, "seats");
    const unsubscribe = onValue(seatsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const now = Date.now();
      const updates = {};

      Object.entries(data).forEach(([seatId, seat]) => {
        if (seat.status === "pending" && seat.timestamp && now - seat.timestamp > 5 * 60 * 1000) {
          updates[seatId] = { status: "available", roll: null, timestamp: null };
        }
      });

      if (Object.keys(updates).length > 0) {
        Object.entries(updates).forEach(([seatId, value]) =>
          update(ref(db, `seats/${seatId}`), value)
        );
      }

      setSeatsData(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSeatClick = (seatId) => {
    const seatInfo = seatsData[seatId] || { status: "available" };
    if (seatInfo.status === "selected" || (seatInfo.status === "pending" && seatInfo.roll !== RNo)) return;

    if (selectedSeat === seatId) {
      update(ref(db, `seats/${seatId}`), {
        status: "available",
        roll: null,
        timestamp: null,
      });
      setSelectedSeat(null);
      onSeatChange?.(null);
    } else {
      if (selectedSeat) {
        update(ref(db, `seats/${selectedSeat}`), {
          status: "available",
          roll: null,
          timestamp: null,
        });
      }

      update(ref(db, `seats/${seatId}`), {
        status: "pending",
        roll: RNo,
        timestamp: Date.now(),
      });
      setSelectedSeat(seatId);
      onSeatChange?.(seatId);
    }
  };

  const renderSeats = (rowLabel, isDelegate = false) => (
    <div key={rowLabel} className={`seat-row ${isDelegate ? "delegate-row" : ""}`}>
      {Array.from({ length: seatsPerRow }, (_, i) => {
        if (i === 8) return <div key={`gap-${rowLabel}${i}`} className="seat-gap" />;

        const seatNumber = i < 8 ? i + 1 : i;
        const seatId = `${rowLabel}${seatNumber}`;
        const seatInfo = seatsData[seatId] || { status: "available" };
        const isMine = seatInfo.roll === RNo;
        const showAsPending = seatInfo.status === "pending" && isMine;
        const showAsBooked = seatInfo.status === "selected" || (seatInfo.status === "pending" && !isMine);

        return (
          <div
            key={seatId}
            className={`seat
              ${isDelegate ? "disabled-seat" : ""}
              ${showAsPending ? "pending" : ""}
              ${showAsBooked ? "booked" : ""}
              ${selectedSeat === seatId ? "selected" : ""}
            `}
            onClick={() => !isDelegate && handleSeatClick(seatId)}
          >
            {seatId}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="booking-container">
      <h2 className="title">🎟️ Book Your Seat</h2>
      <div className="stage">TEDxHITAM STAGE</div>

      <div className="seating-area">
        <p style={{color:'aliceblue',fontSize:'20px'}}>Delegate Seats</p>
        <div className="delegate-section">
          {delegateRows.map((row) => renderSeats(row, true))}
        </div>

        <div className="gap-section">
          <div className="door-icon"></div>
        </div>

        <p style={{color:'aliceblue',fontSize:'20px'}}>Audience Seats</p>
        <div className="audience-section">
          {audienceRows.map((row, index) => (
  <>
    {renderSeats(row)}
    
    {row === "I" && <div className="row-gap"><span></span></div>}
  </>
))}
        </div>
      </div>

      {selectedSeat && (
        <div className="selected-info">
          Selected Seat for <strong>{Name}</strong>: <strong>{selectedSeat}</strong>
        </div>
      )}
    </div>
  );
};

export default SeatBooking;
