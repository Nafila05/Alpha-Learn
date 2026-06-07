# AlphaLearn: AI-Powered Interactive Alphabet Learning Platform

## Overview

**AlphaLearn** is an interactive web-based educational platform designed to help early childhood learners (PAUD and Kindergarten students) recognize, write, and practice alphabet letters through Artificial Intelligence (AI) technology.

The platform combines handwriting recognition, guided writing exercises, animated demonstrations, interactive quizzes, and learning progress tracking to create an engaging learning experience for young children.

---

## Key Features

### AI Letter Recognition

* Detect handwritten alphabet letters through a device camera.
* Analyze uploaded handwriting images.
* Provide instant feedback on letter recognition results.

### Interactive Writing Practice

* Step-by-step guidance for writing each letter.
* Digital canvas for practicing handwriting.
* Animated demonstrations showing correct stroke order.

### AI Learning Assistant

* Real-time feedback on children's handwriting.
* Personalized learning assistance through AlphaBot.
* Encourages independent learning with interactive responses.

### Gamified Learning Experience

* Multiple quiz formats:

  * Multiple Choice Quiz
  * Letter Writing Quiz
  * Word Guessing Quiz
* Reward system with points and achievements.
* Learning streaks to encourage consistent practice.

### Progress Tracking

* Alphabet mastery map.
* Learning statistics dashboard.
* Achievement badges and milestones.
* Local progress storage for continuous learning.

---

## Project Structure

```text
alphalearn/
├── index.html
├── README.md
├── SETUP_GUIDE.md
├── src/
│   ├── css/
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   │
│   └── js/
│       ├── data.js
│       ├── storage.js
│       ├── ui.js
│       ├── detect.js
│       ├── learn.js
│       ├── quiz.js
│       ├── progress.js
│       └── animasi.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── .vscode/
│   ├── settings.json
│   └── extensions.json
│
└── .gitignore
```

---

## Technology Stack

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| HTML5                   | Application structure           |
| CSS3                    | User interface styling          |
| JavaScript (Vanilla JS) | Application logic               |
| Canvas API              | Interactive handwriting canvas  |
| MediaDevices API        | Camera access                   |
| AI Vision API           | Letter recognition and analysis |
| LocalStorage            | Offline progress persistence    |
| GitHub Pages            | Deployment and hosting          |

---

## Installation

### Prerequisites

* Visual Studio Code
* Live Server Extension
* Modern Web Browser (Chrome, Edge, Firefox)

### Clone Repository

```bash
git clone https://github.com/Nafila05/Alpha-Learn.git
cd Alpha-Learn
```

### Open Project

```bash
code .
```

### Run Application

1. Install the **Live Server** extension in VS Code.
2. Open `index.html`.
3. Right-click and select **Open with Live Server**.

Or click the **Go Live** button in the bottom-right corner of VS Code.

The application will be available at:

```text
http://127.0.0.1:5500
```

---

## AI Integration

AlphaLearn utilizes AI-based image analysis to:

* Recognize handwritten alphabet letters.
* Evaluate writing accuracy.
* Generate educational feedback.
* Support interactive learning activities.

For production deployment, API credentials should be stored securely using:

* Environment Variables
* Backend Proxy Services
* Secret Management Solutions

**Never expose API keys directly in public repositories.**

---

## Deployment

### GitHub Pages (Automatic)

The project supports automatic deployment through GitHub Actions.

```bash
git add .
git commit -m "feat: update application"
git push origin main
```

After deployment, the application can be accessed through:

```text
https://nafila05.github.io/Alpha-Learn
```

### Manual Deployment

1. Open the repository settings.
2. Navigate to **Pages**.
3. Select:

   * Source: Deploy from a branch
   * Branch: main
   * Folder: /root
4. Save the configuration.

---

## Educational Objectives

AlphaLearn is developed to:

* Improve alphabet recognition skills.
* Support early handwriting development.
* Increase student engagement through gamification.
* Provide AI-assisted learning experiences.
* Create accessible and interactive educational technology for young learners.

---

## Future Development

Planned enhancements include:

* Number recognition and writing practice.
* Pronunciation and phonics learning.
* Parent and teacher dashboards.
* Cloud-based progress synchronization.
* Multi-language support.
* Personalized learning recommendations.

---

## Contributors

Developed by the AlphaLearn Development Team.

Contributions, suggestions, and improvements are welcome through Issues and Pull Requests.

---

## License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this software for educational and non-commercial purposes.
