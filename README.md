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
<img width="960" height="515" alt="Screenshot 2026-06-14 152304" src="https://github.com/user-attachments/assets/06cee57b-b375-4506-87df-dea1fcbfee4c" />

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
<img width="1472" height="1800" alt="image" src="https://github.com/user-attachments/assets/2046d9c1-7613-48e8-8c0f-b3691cc9fd7c" />
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

# 🎲 Random User Generator

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-randomuser.me-4f46e5?style=flat)

A simple app that fetches and displays random user profiles using the [randomuser.me](https://randomuser.me) API — built with vanilla JavaScript, `async/await`, and `fetch`.


<img width="960" height="512" alt="image" src="https://github.com/user-attachments/assets/913ed7d1-0454-4a9d-91dc-396211a54937" />


> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ Fetches 5 random users from a public API on button click
- ✅ Displays each user's profile picture, name, and email
- ✅ Built entirely with `async/await` and `fetch` — no libraries
- ✅ Error handling with `try/catch`
- ✅ Clean card-based UI with hover effects

---

## 🧠 Algorithm — step by step

**Step 1 — Page load**  
The page renders a card containing a heading and a **Generate New User** button. No data is fetched yet.

**Step 2 — Button click**  
An event listener on `.btn` calls `display()` whenever the button is clicked.

**Step 3 — `display()` runs**  
The function is declared `async`, so it can use `await` inside a `try/catch` block for clean error handling.

**Step 4 — Fetch request**  
`await fetch(URL)` sends a GET request to `https://randomuser.me/api/?results=5`, which returns 5 random user profiles.

**Step 5 — Parse JSON**  
`await response.json()` converts the raw response into a JavaScript object. `data.results` holds the array of 5 users.

**Step 6 — Map users to HTML**  
`userArrays.map(user => ...)` loops through each user and returns an HTML template string containing their picture, name, and email. `.join('')` combines all 5 templates into a single string.

**Step 7 — Render to the page**  
`document.querySelector(".card").innerHTML = HtmlContent` injects all 5 user cards into the page at once.

**Error handling**  
If the fetch or JSON parsing fails (e.g. no internet), the `catch` block logs the error to the console instead of crashing the page.

---

<img width="1094" height="1256" alt="image" src="https://github.com/user-attachments/assets/715527c5-04d9-415b-935e-b8a43fde5561" />



## 📂 Folder structure

```
Random_user_generator/
├── index.html
├── style.css
└── script.js
```

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/java_script.git
cd "java_script/Random_user_generator"
# open index.html in your browser
```

---

## ⚠️ Known issues / things to improve

- Generated user cards use inline styles in `script.js` instead of CSS classes — the existing `.name`, `.mail`, `.phone`, `.sex`, and `.img` classes in `style.css` aren't used at all
- Errors are only logged to `console.log` — the user sees nothing if the fetch fails; consider showing a friendly error message on the page
- No loading state — on slow connections, clicking the button shows nothing until the data arrives
- Title has a typo: "Random USer Generater" → should be "Random User Generator"
---
# ✅ To-Do List

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

A minimal to-do list app that lets you add and delete tasks dynamically — built with vanilla JavaScript and DOM manipulation. No libraries, no frameworks, no fuss.
<img width="1920" height="1017" alt="image" src="https://github.com/user-attachments/assets/585bb30a-a64c-4e3d-b54b-52a169940722" />

> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ Add tasks by typing and clicking **Add**
- ✅ Each task gets its own **Delete** button
- ✅ Validates empty input with an alert before adding
- ✅ Input field clears automatically after adding a task
- ✅ Dark theme UI with smooth hover transitions

---

## 🧠 Algorithm — step by step

**Step 1 — Page load**  
The page renders a text input, an Add button, and an empty `<ul id="container">` where tasks will be injected.

**Step 2 — User types a task**  
The user types their task into `.to-do-input`. No event fires yet — the value just sits in the field.

**Step 3 — Click Add button**  
A `click` event listener on `.btn` fires. It reads `input.value` and stores it in `task`, then immediately sets `input.value = ""` to clear the field.

**Step 4 — Validate input**  
If `task === ""`, an `alert()` warns the user and nothing is added. If the task has content, execution continues.

**Step 5 — Create DOM elements**  
`document.createElement('li')` creates a new list item. `document.createElement('button')` creates its Delete button. The task text is set as `li.innerText`, and the Delete button is appended inside the `li`.

**Step 6 — Append to the list**  
`document.getElementById("container").appendChild(li)` adds the new task to the bottom of the visible list.

**Step 7 — Delete a task**  
Each Delete button gets its own `click` listener at creation time. When clicked, `li.remove()` removes that specific task from the DOM entirely.

---
<img width="1094" height="1320" alt="image" src="https://github.com/user-attachments/assets/b6073f80-42c7-4d44-ae1d-08adceb33892" />

## 📂 Folder structure

```
To-do list/
├── index.html      # Input, button, and empty task container
├── style.css       # Dark theme, task cards, delete button styling
└── script.js       # Add task logic, validation, delete functionality
```

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/java_script.git
cd "java_script/To-do list"
# open index.html in your browser
```

---

## ⚠️ Known issues / things to improve

- Tasks don't persist on page refresh — adding `localStorage` support would save the task list between sessions
- No way to mark a task as complete — a checkbox or strikethrough on click would be a clean improvement
- Empty spaces pass validation (e.g. a task of just spaces) — use `task.trim() === ""` instead of `task === ""` to fix this
- No keyboard support — pressing `Enter` in the input should also trigger the Add button

---

# 💱 Currency Converter

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-currency--api-blueviolet?style=flat)

A live currency converter that fetches real exchange rates and displays country flags dynamically — built with vanilla JavaScript, `async/await`, and two public APIs.

<img width="1920" height="1024" alt="image" src="https://github.com/user-attachments/assets/24e07468-4a9d-49e8-8223-dbb842828a50" />


> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ Converts between 150+ currencies
- ✅ Fetches live exchange rates from a public currency API
- ✅ Country flags update automatically when you change the currency
- ✅ Defaults to USD → INR on page load
- ✅ Validates empty or invalid amount — falls back to 1
- ✅ Clean card UI with a responsive layout

---

## 🧠 Algorithm — step by step

**Step 1 — Page load: populate dropdowns**  
The `countryList` object (in `codes.js`) maps every currency code to its country code (e.g. `INR → IN`). A `for...in` loop runs over it and creates an `<option>` element for every currency, appending it to both the FROM and TO `<select>` dropdowns.

**Step 2 — Set defaults**  
While building the options, `USD` is automatically marked `selected` in the FROM dropdown and `INR` in the TO dropdown, so the page is ready to convert on first load.

**Step 3 — Flag update on dropdown change**  
Each `<select>` has a `change` event listener. When the user picks a different currency, `updateflag()` reads the new currency code, looks up its country code in `countryList`, and builds a new image URL using `flagsapi.com`. It then finds the `<img>` inside the same parent container and swaps its `src`.

**Step 4 — Click "Get Exchange Rate"**  
The button's `click` listener calls `evt.preventDefault()` to stop the `<form>` from refreshing the page, then reads the input amount.

**Step 5 — Validate amount**  
If the amount is empty or less than 1, it is reset to `1` and the input field is updated to show `"1"` so the user sees the correction.

**Step 6 — Build URL and fetch**  
The API URL is built as `BASE_URL/{fromCurrency}.json` (e.g. `.../usd.json`). `await fetch(URL)` sends the GET request to the currency API.

**Step 7 — Parse JSON and extract rate**  
`await response.json()` parses the response. The exchange rate is accessed as `data[fromCurrency][toCurrency]` — a nested lookup that returns the exact conversion multiplier.

**Step 8 — Calculate result**  
`finalAmount = amtVal × rate` multiplies the user's input by the fetched rate.

**Step 9 — Display result**  
The `.msg` div's `innerText` is updated with the formatted result string, e.g. `100 USD = 8350 INR`.

---

<img width="806" height="1068" alt="image" src="https://github.com/user-attachments/assets/d9e3590e-dbda-4e53-a150-6ccddb8486ab" />


## 📂 Folder structure

```
currency_converter/
├── index.html      # Form, dropdowns, flag images, result div
├── style.css       # Card layout, dropdown styling, button
├── script.js       # Fetch logic, flag update, validation, render
└── codes.js        # countryList object — 150+ currency → country mappings
```

---

## 🌐 APIs used

| API | Purpose |
|---|---|
| `currency-api.pages.dev` | Live exchange rates |
| `flagsapi.com` | Country flag images by country code |

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/java_script.git
cd "java_script/currency_converter"
# open index.html in your browser
```

---

## ⚠️ Known issues / things to improve

- No `try/catch` around the fetch — if the API is down or the network fails, the page will throw an uncaught error with no user feedback
- Extra `"` in the TO flag `<img src="...IN/flat/64.png"" alt="">` — a small HTML typo worth fixing
- `for (currCode in countryList)` is missing `let` — `currCode` leaks into the global scope; use `for (let currCode in countryList)` instead
- The `.message` div (`1USD = 80INR`) is hardcoded in the HTML and never updated by the script — `.msg` is used instead; the `.message` div is dead markup

---
# 💸 Expense Tracker

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![localStorage](https://img.shields.io/badge/localStorage-Persistent-orange?style=flat)

A fully functional expense tracker with add, edit, delete, search, and total calculation — built with vanilla JavaScript and localStorage. Data persists across page refreshes.
<img width="960" height="576" alt="image" src="https://github.com/user-attachments/assets/51831b2c-3f1c-467a-a78c-ecfb10781e35" />


> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ Add expenses with name, amount, date, and category
- ✅ Edit any existing expense via an inline form
- ✅ Delete individual expenses
- ✅ Search expenses by name (case-insensitive)
- ✅ Running total displayed and recalculated after every action
- ✅ All data saved to `localStorage` — survives page refresh
- ✅ Form validation — alerts user on empty fields

---

## 🧠 Algorithm — step by step

**Step 1 — Page load**  
`localStorage.getItem('Expense')` is parsed with `JSON.parse`. If nothing is saved yet, `expense` defaults to an empty array `[]`. `renderexpense(expense)` is called immediately to display any previously saved data.

**Step 2 — Add an expense**  
Clicking **Add Expense** checks that all four fields (name, amount, date, category) are non-empty. If any are blank, an `alert()` fires. Otherwise the new expense object is pushed into the `expense` array, `localStorage` is updated, and the form fields are cleared.

**Step 3 — renderexpense(data)**  
This is the central render function. It receives an array of expenses, builds a full HTML `<table>` string using `.forEach()`, and injects it into `.body` via `innerHTML`. After rendering, it immediately calls `delAction()`, `editAction()`, and `rendertotal()` to wire up all buttons on the freshly built table.

**Step 4 — Delete an expense**  
`delAction()` finds all `.js-del-btn` buttons. Each button stores its row index in `data-index`. On click, `expense.splice(index, 1)` removes that item, `localStorage` is updated, and `renderexpense()` is called again to rebuild the table.

**Step 5 — Edit an expense**  
`editAction()` finds all `.js-edit-btn` buttons. On click, `currentEditingIndex` is set to the row index and `renderform(index)` injects an edit form into the `.End` div, pre-filled with the existing values of that expense.

**Step 6 — Save an edit**  
`saveEdit()` reads the four edit input fields, overwrites `expense[currentEditingIndex]` with the new values, saves to `localStorage`, re-renders the main table, and clears the `.End` edit form.

**Step 7 — rendertotal()**  
Loops through all items in `expense` with `.forEach()`, accumulates the total using `Number(e.amount)`, and displays the result in the `.bottom` div as `Total: $X`.

**Step 8 — Search**  
The search button reads the input, trims it, and filters `expense` using `.includes()` after lowercasing both the search term and each expense name. The matched subset is passed to `renderexpense()` so only matching rows appear. The original `expense` array is unchanged.
<img width="1094" height="1578" alt="image" src="https://github.com/user-attachments/assets/00c000ad-d20f-40b4-a4e3-c3857da208a0" />

---

## 📂 Folder structure

```
Expense_Tracker/
├── index.html      # Form, search bar, table container, edit form slot
├── style.css       # Card layout, table styles, edit form, buttons
└── script.js       # Add, edit, delete, search, render, total logic
```

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/java_script.git
cd "java_script/Expense_Tracker"
# open index.html in your browser
```

---

## ⚠️ Known issues / things to improve

- `renderexpense()` is called without an argument in `delAction()` and the Add button's event listener — this means `data` inside the function is `undefined` and `.forEach` will crash; always pass `expense` explicitly: `renderexpense(expense)`
- `currentEditingIndex` stores the index as a string (from `dataset.index`) — when used to access `expense[currentEditingIndex]`, JavaScript coerces it, but it's safer to use `Number(index)` explicitly
- No confirmation before deleting — a simple `confirm("Delete this expense?")` would prevent accidental deletions
- Search results show filtered data but the total still recalculates from the full `expense` array, not the filtered view — the total should match what's visible on screen
- Category options in the add form and the edit form are different — the add form has a blank default option, the edit form doesn't; keep them consistent

---
> Built by Tanmay · Part of the `java_script/` mini-projects collection
