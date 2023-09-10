import speech_recognition as sr
import time

# Record the start time
start_time = time.time()
recognizer = sr.Recognizer()

harvard = sr.AudioFile("voice-handling/audio/GayatriConversation.wav")
with harvard as source:
    audio = recognizer.record(source)

try:
    # Recognize speech with punctuation
    recognized_text = recognizer.recognize_google(audio, show_all=True)
    print("Transcription with Punctuation:")
    print(recognized_text)
except sr.UnknownValueError:
    print("Speech recognition could not understand audio.")
except sr.RequestError as e:
    print(
        f"Could not request results from Google Speech Recognition service; {e}")

print(recognized_text.keys())
print(recognized_text["alternative"][0]["transcript"])

# Record the end time
end_time = time.time()

# Calculate the time taken
elapsed_time = end_time - start_time

print(f"\nTime taken: {elapsed_time:.2f} seconds")
