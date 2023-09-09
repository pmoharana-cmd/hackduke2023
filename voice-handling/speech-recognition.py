import speech_recognition as sr

r = sr.Recognizer()

harvard = sr.AudioFile("voice-handling/audio/harvard.wav")
with harvard as source:
    audio = r.record(source)
