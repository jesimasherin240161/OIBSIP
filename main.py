import pyttsx3
import datetime
import webbrowser

engine = pyttsx3.init()

def speak(text):
    print(f"Assistant: {text}")
    engine.say(text)
    engine.runAndWait()

print("--- Voice Assistant Started ---")
speak("Hello, I am your voice assistant")

while True:
    command = input("You (type your command): ").lower()
    print(f"You said: {command}")

    if "hello" in command:
        speak("Hello! How can I help you?")

    elif "time" in command or "date" in command:
        now = datetime.datetime.now()
        speak(f"Time is {now.strftime('%I:%M %p')} on {now.strftime('%d %B %Y')}")

    elif "search" in command:
        topic = input("What to search? : ")
        webbrowser.open(f"https://www.google.com/search?q={topic}")
        speak(f"Searching for {topic}")

    elif "bye" in command or "exit" in command:
        speak("Goodbye, have a great day")
        break

    else:
        speak("Sorry, I didn't understand. Please repeat. Try hello, time, search, or bye")