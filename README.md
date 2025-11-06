# 🥁 Drum Machine

A visual, interactive Drum Machine built with React + TypeScript (Vite).
Users can play, record, and replay drum sequences — all running locally with visual feedback and intuitive controls.

# 🚀 Features

- 3 Drum Pads — Kick, Snare, and Hi-Hat, each playable via mouse or keyboard (A, S, D).
- Record & Playback — Capture drum hits with precise timing and replay them accurately.
- Persistent Recording — Saves your latest sequence to localStorage.
- Visual Feedback — Pads flash on hit and glow on active playback.
- Responsive UI — Works smoothly on both desktop and mobile.
- Accessible Controls — Intuitive icon-only buttons for Record 🔴, Stop ⏹, and Play ▶️.
- Progress Bar — Displays playback progress dynamically.
- Clean Architecture — Context-based state management and modular components.

# How to run localy

# 1. Clone the repo

`git clone https://github.com/Marki10/drum-machine.git`
`cd drum-machine`

# 2. Install dependencies

`npm install`

# 3. Start dev server

`npm run dev`

# 🔮 Ideas for Future Improvements

- Add multiple record list
- Export recording as JSON or MIDI
- Add multiple tracks or pattern sequencing
- Add sound customization or upload

# 🧹 Code Quality & Development Standards

This project follows strict code quality and style consistency using Husky, ESLint, Prettier, and Lint-Staged.

- 🧼 Prettier for automatic code formatting
- 🔍 ESLint for TypeScript + React linting rules
- 🐶 Husky pre-commit hook to prevent bad commits
- 🧩 Lint-Staged ensures only changed files are checked
