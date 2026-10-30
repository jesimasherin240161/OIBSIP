import pyttsx3
import datetime
import webbrowser
from urllib.parse import quote_plus

engine = pyttsx3.init()

def speak(text):
  print("Bot:", text)
  engine.say(text)
  engine.runAndWait()

speak("Hello, I am your voice assistant")
print("---Voice Assistant Started ---")

while True:
  cmd = input("You: ").lower().strip()

if "hello" in cmd:
  speak("Hello, how can I help?")

elif "time" in cmd or "date" in cmd:
  now = datetime.datetime.now()
  speak(
      f"Time is {now.strftime('%I:%M %p')}"
      f"and date is {now.strftime('%d %B %Y')}"
  )
elif "search" in cmd:
  topic = input("What to search: ").strip()

if topic:
  url = "https://www.google.com/search?q=" + quote_plus(topic)
  webbrowser.open(url)
  speak(f"Searching for {topic}")
else:
  speak("Please enter a search topic.")

elif "bye" in cmd or "exit" in cmd:
   speak("Goodbye")
   break
else:
    speak("Sorry, please repeat. Say hello, time, search or bye")
