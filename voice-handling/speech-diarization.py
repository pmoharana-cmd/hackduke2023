# from google.cloud import speech


# def speech_to_text(
#     config: speech.RecognitionConfig,
#     audio: speech.RecognitionAudio,
# ) -> speech.RecognizeResponse:
#     client = speech.SpeechClient()

#     # Synchronous speech recognition request
#     response = client.recognize(config=config, audio=audio)

#     return response


# def print_response(response: speech.RecognizeResponse):
#     for result in response.results:
#         print_result(result)


# def print_result(result: speech.SpeechRecognitionResult):
#     best_alternative = result.alternatives[0]
#     print("-" * 80)
#     print(f"language_code: {result.language_code}")
#     print(f"transcript:    {best_alternative.transcript}")
#     print(f"confidence:    {best_alternative.confidence:.0%}")


# config = speech.RecognitionConfig(
#     language_code="en"
# )

# audio = speech.RecognitionAudio(
#     uri="gs://conversation-hackduke/PatientDoctorConvo.wav",
# )

# response = speech_to_text(config, audio)
# print_response(response)

from google.cloud import speech_v1p1beta1 as speech

client = speech.SpeechClient()

speech_file = "voice-handling/audio/PatientDoctorConvo.wav"

with open(speech_file, "rb") as audio_file:
    content = audio_file.read()

audio = speech.RecognitionAudio(content=content)

diarization_config = speech.SpeakerDiarizationConfig(
    enable_speaker_diarization=True,
    min_speaker_count=2,
    max_speaker_count=10,
)

config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
    language_code="en-US",
    diarization_config=diarization_config,
    diarization_speaker_count=2
)

print("Waiting for operation to complete...")
response = client.long_running_recognize(
    config=config, audio=audio).result(timeout=90)

# The transcript within each result is separate and sequential per result.
# However, the words list within an alternative includes all the words
# from all the results thus far. Thus, to get all the words with speaker
# tags, you only have to take the words list from the last result:
result = response.results[-1]

words_info = result.alternatives[0].words

print(words_info)

# Printing out the output:
for word_info in words_info:
    print(f"word: '{word_info.word}', speaker_tag: {word_info.speaker_tag}")
