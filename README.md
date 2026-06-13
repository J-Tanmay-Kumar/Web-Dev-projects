# 📂 Repository Structure

This repo contains all my full-stack projects organized by category.

🐢 "Currently making things look pretty — the part where it actually does something is a future Tanmay problem."


---

```
main/
├── Clone/
│   └── netflix clone/          # Netflix India landing page (HTML + CSS)
│       ├── assets/             # Images and static files
│       ├── index.html
│       └── style.css
│
├── java_script/                # Vanilla JS mini-projects
│   ├── Expense_Tracker/
│   ├── Random_user_generator/
│   ├── To-do list/
│   ├── currency_converter/
│   └── rock_paper_scissors/
│
└── protfolio/                  # Personal portfolio website (HTML + CSS)
    ├── index.html
    ├── gradient.png
    ├── backend.png
    └── layout.png
```

---

## What's inside

**`Clone/netflix clone`** — A static clone of the Netflix India homepage. Covers background overlays, flexbox layouts, embedded video, FAQ styling, and responsive design.

**`java_script/`** — A collection of small JavaScript projects built to practice DOM manipulation, APIs, and core JS logic. Each project lives in its own folder.

**`protfolio/`** — My personal portfolio site. Includes a hero section, skills cards, scroll animations (AOS.js), and a contact footer.

---

## 🔮 Coming soon

- [ ] **React projects** — Task Manager App, Notes App with AI integration, and a Dashboard — will live in a new `react/` folder
- [ ] **Full-stack projects** — Node.js + MongoDB backends added once the React layer is complete
- [ ] **Portfolio upgrade** — Projects section to be filled in with live links and screenshots
- [ ] Folder name `protfolio` → will be corrected to `portfolio`

---

> All projects are for learning purposes. Each folder has its own README explaining how it was built.
>
> # 🎬 Netflix India — Landing Page Clone

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=flat)

A pixel-faithful clone of the Netflix India landing page — built with pure HTML and CSS. No frameworks. No JavaScript. Just vibes and `position: absolute`.

> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.
<img width="1895" height="1029" alt="Screenshot 2026-06-04 231032" src="https://github.com/user-attachments/assets/e59bd4c5-1f6a-492d-ba5b-3809ae164c54" />

---

## 📂 Folder Structure

```
Clone/netflix clone/
├── assets/
│   └── images/
│       ├── bg.jpg          # Hero background image
│       ├── logo.svg        # Netflix logo (red)
│       └── ...             # Any other static assets
├── index.html              # Main HTML file — all sections live here
└── style.css               # All styling — layout, colors, responsive
```

---

## 📄 File Breakdown

**`index.html`**
The entire page is a single HTML file. It contains:
- Navbar with logo and sign-in button
- Hero section with email input and CTA
- 4 feature sections (TV, mobile, multi-device, kids)
- FAQ accordion (styled, not interactive yet)
- Footer with 4-column link grid

**`style.css`**
All visual styling in one file. Covers:
- Dark overlay using an absolutely positioned `.box` div
- Flexbox for navbar, hero, and feature rows
- CSS Grid for the footer columns
- `@media` queries at `700px` for mobile layout

**`assets/images/`**
Stores the background image and Netflix logo locally. Feature section images and promo videos are loaded directly from Netflix's own CDN URLs.


<img width="1472" height="2040" alt="image" src="https://github.com/user-attachments/assets/8c73c044-50a5-49bb-b186-96cfe9916af2" />

---

## 🚀 Run Locally

```bash
git clone https://github.com/Tanmaykumae09/Clone.git
cd "Clone/netflix clone"
# open index.html in your browser
```

---

## 🔮 Future Updates

- [ ] Wire up FAQ accordion toggle with JavaScript
- [ ] Add email validation on the "Get Started" input
- [ ] Add a 32-bit download option to match the real page more closely
- [ ] Improve mobile layout for very small screens (< 400px)

---
# ✂️ Rock Paper Scissors

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![localStorage](https://img.shields.io/badge/localStorage-Persistent-orange?style=flat)

A browser-based Rock Paper Scissors game with score tracking, auto-play mode, and keyboard shortcuts — built with vanilla JavaScript.

> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## 🎮 How to Play

| Action | Method |
|---|---|
| Pick Rock | Click **Rock** button or press `R` |
| Pick Paper | Click **Paper** button or press `P` |
| Pick Scissors | Click **Scissors** button or press `S` |
| Auto-play | Click **Auto-play** (plays every 2 seconds) |
| Reset scores | Click **Reset-Score** |

---

## ✨ Features

- ✅ Play against a random computer move
- ✅ Live scoreboard (Wins / Losses / Ties)
- ✅ Score persists across page refreshes using `localStorage`
- ✅ Auto-play mode — computer vs computer every 2 seconds
- ✅ Keyboard shortcuts (`R`, `P`, `S`)
- ✅ Reset button wipes the score and clears storage
- ✅ Dark theme UI with hover animations on buttons

---

## 🧠 Algorithm — step by step

**Step 1 — Load saved score**  
On page load, `localStorage.getItem('scored')` is parsed. If no saved data exists, score defaults to `{ win: 0, lose: 0, tie: 0 }`.

**Step 2 — Generate computer move**  
`Math.random()` returns a number between 0 and 1. It's split into three equal ranges:
- `0 to 1/3` → rock  
- `1/3 to 2/3` → paper  
- `2/3 to 1` → scissors

**Step 3 — Determine result**  
The player's move is compared against the computer's move using three conditions — tie, lose, or win. All nine possible matchups are covered explicitly.

**Step 4 — Update score**  
The matching counter (`win`, `lose`, or `tie`) increments by 1. The updated score object is saved back to `localStorage` with `JSON.stringify`.

**Step 5 — Render to scoreboard**  
A dynamically created `<div>` (ScoreBoard) updates its `innerHTML` to show the latest picks, result, and running totals.

**Step 6 — Auto-play mode**  
Clicking Auto-play runs `setInterval(move, 2000)` — it generates a random player move and calls `playGame()` every 2 seconds. Clicking Stop-play calls `clearInterval(id)` to halt it.

**Step 7 — Keyboard input**  
A `keydown` listener on `document.body` maps `R`, `P`, and `S` keys directly to `playGame()` calls.

**Step 8 — Reset**  
Reset zeroes all three counters, clears the scoreboard display, and calls `localStorage.removeItem('scored')` to wipe persisted data.

---

## 📂 Folder structure

```
rock_paper_scissors/
├── index.html      # Buttons and layout
├── style.css       # Dark theme, button colors, hover effects
└── script.js       # Game logic, scoreboard, auto-play, keyboard
```

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/java_script.git
cd "java_script/rock_paper_scissors"
# open index.html in your browser
```

---

## ⚠️ Known issues / things to improve

- `onkeydown="key(event)"` on individual buttons is redundant — the global `document.body` listener already handles keyboard input; the inline attributes can be removed
- Auto-play button style (`.auto-btn`) is missing from `style.css` — it renders unstyled
- Reset button and scoreboard `<div>` are created dynamically in JS — moving them into `index.html` would be cleaner
- Score key in `localStorage` is named `'scored'` — consider renaming to `'rps-score'` to avoid collisions with other projects

---

> Built by Tanmay · Part of the `java_script/` mini-projects collection
> Built by Tanmay · For learning purposes only · Not affiliated with Netflix
