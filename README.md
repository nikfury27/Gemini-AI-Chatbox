 #Gemini Chat UI

<a href="https://gemini-ai-chatbox.netlify.app/">Live Demo!</a>

A simple, responsive chat interface for interacting with Google's **Gemini API** (1.5 Flash model).
Built using **HTML**, **CSS**, and **JavaScript** for a smooth and modern user experience.

<img width="1266" height="979" alt="Screenshot 2025-08-12 235708" src="https://github.com/user-attachments/assets/16bccacb-b6a0-4400-b41f-5369a2cb8b7f" />

---

## Features

* Clean, responsive chat UI with light/dark mode compatibility
* Animated Gemini logo and typing indicator
* Scrollable chat history with smooth animations
* Easy integration with Google's Generative Language API
* Minimal setup — runs in any modern browser

---

## Project Structure

```
.
├── index.html      # Main HTML file for the chat UI
├── style.css       # Custom styles and animations
├── script.js       # Chat logic and API integration
```

---

## Getting Started

### 1. Clone or Download the Repository

```bash
git clone https://github.com/nikfury27/Gemini-AI-Chatbox
cd Gemini-AI-Chatbox
```

---

### 2. Get a Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the API key

---

### 3. Add Your API Key to the Project

Open `script.js` and replace the `API_KEY` value with your own:

```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

⚠️ **Important:** Never expose your API key in public repositories or shared environments.
For production, store your API key securely on a server and proxy requests.

---

### 4. Run the Project

You can simply open `index.html` in your browser, or use a local server:

**Using Python (3.x):**

```bash
python -m http.server 8000
```

Then go to [http://localhost:8000](http://localhost:8000)

**Using VS Code Live Server extension:**

* Right-click `index.html` → **Open with Live Server**

---

## How It Works

1. User enters a message in the input box
2. `sendMessage()` sends the message to the **Gemini API** endpoint:

   ```
   https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY
   ```
3. The API returns a generated response
4. Response is displayed in the chat window with animation

---

## Dependencies

* Google Fonts (**Inter**)
* Google Generative Language API

---

## License

This project is licensed under the MIT License — you are free to use, modify, and distribute it.

---
