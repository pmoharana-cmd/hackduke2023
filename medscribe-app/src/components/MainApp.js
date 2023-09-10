import "./MainApp.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import OpenAI from "openai";

const MainApp = () => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const promptEngineering =
    "First determine sentences and add punctuation and fix any minor grammatical issues. You are now an expert between the conversations between a doctor and patient. You need to distinguish between the doctor and patient speaking and label each part. A doctor will usually ask questions about a patients life, give advice about what they are facing, and provide insight into treatments and symptoms. A patient will be asking questions about why something is happenig to them or answering questions the doctor has asked them. A doctor will ask how severe the patient's pain level is.";

  const [responseText, setResponseText] = useState(
    "Finish recording your session"
  );
  const [input, setInput] = useState("");
  const [prevMessages, setPrevMessages] = useState([]);
  const [translatedSegments, setTranslatedSegments] = useState([]);
  const [recordingStatus, setRecordingStatus] = useState("Not Started");
  const [insights, setInsights] = useState("No insights!");

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setRecordingStatus("Recording");
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setRecordingStatus("Paused");
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatTranscription = (messageFromResponse) => {
    const segments = messageFromResponse.match(
      /(Doctor:.*?(?=Patient:|$))|(Patient:.*?(?=Doctor:|$))/gs
    );

    return segments || [];
  };

  const finishListening = async () => {
    SpeechRecognition.abortListening();
    setResponseText("Loading...");
    setRecordingStatus("Done Recording");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: promptEngineering },
          {
            role: "user",
            content: transcript,
            // content:
            // "so I've been having some problems with my bladder recently oh I see could you describe your pain level from a scale of 1 to 10 I think my pain is around 7:00 I see does it hurt when you urinate yes it's sometimes hurts when I urinate do you typically urinate standing up or sitting down like a b**** I usually urinate sitting down that's fine oh I see I have a kidney disease yeah you might need to get it fixed through some sort of surgery oh okay thank you for your advice you're welcome good luck with your surgery have fun",
          },
        ],
        temperature: 0.3,
      });

      const messageFromResponse =
        response.choices[0].message.content.toString();

      // await getInsights();

      console.log(formatTranscription(messageFromResponse));
      setTranslatedSegments(formatTranscription(messageFromResponse));
      setResponseText(messageFromResponse);
      setPrevMessages([
        {
          role: "assistant",
          content: "Hi, I'm your conversation assistant. What's on your mind?",
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseText("Text processing failed! Please try again!");
    }

    resetTranscript();
  };

  const getInsights = async () => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Given a text by the user extract the exact conditions being diagnosed and only medications/treatments being mentioned in the text. Do not talk about any medicine or treatments that are not mentioned. Provide information about the dosage and frequency. Label each section and return the result based on the provided text. (Condition: {}, Medication: {}, Dosage: {}, Possible Complications: {} Separate each with new line and if not available put N/A) ",
        },
        { role: "user", content: responseText },
      ],
      temperature: 0.3,
    });

    console.log(response.choices[0].message.content);

    setInsights(response.choices[0].message.content);
  };

  const askQuestions = async () => {
    if (input.length <= 0) {
      return;
    }

    const question = { role: "user", content: input };

    setInput("");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Given the following conversation: " +
            responseText +
            " You are an expert on this conversation and can answer questions related to it. Respond as you are speaking to the patient and are trying to only provide them with the important information. Try to respond as clearly and concisely as possible",
        },
        question,
      ],
      temperature: 0.3,
    });

    console.log(response.choices);

    setPrevMessages([...prevMessages, question, response.choices[0].message]);
  };

  const DisplayConversationSegments = ({ segments }) => {
    return (
      <body>
        {segments.length === 0 ? (
          <p className="conversation-placeholder">{responseText}</p>
        ) : (
          <div style={{ position: "relative" }}>
            <ul className="conversation-list">
              {segments.map((segment, index) => (
                <li key={index} className="conversation-item">
                  <span className="conversation-speaker">
                    {segment.split(":")[0]}:
                  </span>
                  {segment.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </body>
    );
  };

  return (
    <body>
      <div className="container">
        <h2>Patient Client Conversation Recorder</h2>
        <br />
        <p>Record your conversation and pause whenever needed!</p>

        <div className="main-content">{transcript}</div>

        <div className="btn-style">
          <button onClick={startListening}>Start Listening</button>
          <button onClick={handleStopListening}>Stop Listening</button>
          <button onClick={finishListening}>End Recording</button>
        </div>

        <div>
          <p>
            <b>Recording Status: {recordingStatus}</b>
          </p>
          <DisplayConversationSegments segments={translatedSegments} />
        </div>
      </div>

      <div className="messaging-assistant">
        {prevMessages.map(({ role, content }, index) => {
          return (
            <div key={index} className={`message ${role}`}>
              <p>
                {capitalizeFirstLetter(role)}: {content}
              </p>
            </div>
          );
        })}
      </div>

      <div className="input-container">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          required
          placeholder="Talk with your Assistant..."
        />
        <button className="button-style" onClick={askQuestions}>
          Submit Question
        </button>
      </div>
    </body>
  );
};

export default MainApp;
