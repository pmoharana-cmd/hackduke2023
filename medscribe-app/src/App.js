import React from "react";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import RecordButton from "./components/RecordButton";
import GifSection from "./components/gif";
import "./index.css";
import doctor from "./components/doctor.gif";

function App() {
  return (
    <Container>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div class="background">
        <div
          style={{
            backgroundImage: "url('backgroundImage.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Your content goes here */}
        </div>
        <div class="gif">
          <img src={doctor} alt="Description of the GIF" />
          <div className="text-overlay">MedScribe</div>
        </div>
        <div class="divider"></div>
        <div class="center-text">
          <h1>
            Medical Errors are the <span>1/3</span>rd leading cause of death in
            the U.S
          </h1>
        </div>
        <div class="center-text">
          <div class="backgroundImage">
            {" "}
            <img src={"bar-chart.png"} alt="Bar Chart"></img>
          </div>
          <h2 class="box">
            250,000 deaths due to Medical Error in the U.S alone
          </h2>
          <div class="backgroundImage">
            {" "}
            <img src={"close.png"} alt="Italian Trulli"></img>
          </div>
          <h2 class="box">
            Communication breakdowns are the main cause of Medical Errors
          </h2>
        </div>

        <div className="center-text2">
          <h1>Our Mission</h1>
        </div>

        <div className="center-text2">
          <div className="containerBox">
            <div className="bottomBox">
              <h1>Empowering Patient-Centric Healthcare</h1>
              <p>
                MedScribe's vision is to revolutionize the patient-doctor
                interaction landscape. Our digital transcribing device captures
                crucial moments during medical consultations, ensuring patients
                have comprehensive access to detailed information about their
                diagnosis, treatment plans, and prescribed medications.
              </p>

              <h1>Reducing Medical Errors</h1>
              <p>
                Patients can now have a reliable record to refer to, aiding in
                the accurate following of treatment plans and medication
                regimens, thereby minimizing the chances of misunderstandings
                and mistakes.
              </p>
            </div>
            <div className="luis">
              {" "}
              <img src={"luis.png"} alt="Italian Trulli"></img>
            </div>
          </div>
        </div>
      </div>

      <RecordButton></RecordButton>
    </Container>
  );
}

export default App;
