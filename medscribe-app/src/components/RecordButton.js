import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";

const RecordButton = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordButtonClick = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        fontFamily: "'Arial', sans-serif", // Added a simple and elegant font
      }}
    >
      <Button
        variant="contained"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: isRecording ? "0%" : "50%",
          backgroundColor: isRecording ? red[500] : "#f0f0f0",
          border: isRecording ? "none" : "2px solid #ccc",
          position: "relative",
          transition: "border-radius 0.5s, background-color 0.5s",
        }}
        onClick={handleRecordButtonClick}
      >
        {isRecording && (
          <CircularProgress
            size={88}
            style={{
              position: "absolute",
              color: red[500],
              transition: "color 0.5s",
            }}
          />
        )}
      </Button>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          textAlign: "center",
          padding: "20px", // Added more padding
          backgroundColor: "#f0f0f0",
          borderTop: "1px solid #ccc", // Separated the text area visually with a subtle border
        }}
      ></div>
    </div>
  );
};

export default RecordButton;
