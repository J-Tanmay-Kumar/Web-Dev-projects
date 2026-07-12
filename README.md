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
# 🌤️ Weather App

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-WeatherAPI.com-3498db?style=flat)
![localStorage](https://img.shields.io/badge/localStorage-Cached-orange?style=flat)

A clean weather app that fetches live weather data for any city — built with vanilla JavaScript, `async/await`, and the WeatherAPI. Last searched city loads automatically on refresh.

<img width="960" height="512" alt="image" src="https://github.com/user-attachments/assets/cbfefbe8-3a34-48b3-82c7-1ecc0b43c06e" />

> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ Search any city and get live weather data
- ✅ Displays temperature, condition, humidity, and wind speed
- ✅ Supports both **click** and **Enter key** to trigger search
- ✅ Proper error handling — shows user-friendly alerts for bad city names or API failures
- ✅ Caches last result in `localStorage` — loads on page refresh automatically
- ✅ Glassmorphism UI with fade-in animation on weather update

---

## 🧠 Algorithm — step by step

**Step 1 — Page load: check cache**  
`DOMContentLoaded` fires and checks `localStorage.getItem("lastWeatherData")`. If data exists, it's parsed and passed to `updateUI()` immediately — so the last searched city shows up without any API call.

**Step 2 — User types a city**  
The user types into the `#city` input field. Nothing happens until the search is triggered.

**Step 3 — Trigger handleSearch()**  
Two ways to trigger: clicking the **Get Weather** button (via `click` event listener) or pressing **Enter** inside the input (via `keydown` listener checking `event.key === "Enter"`). Both call the same `handleSearch()` function.

**Step 4 — Validate input**  
`CityInput.value.trim()` removes whitespace. If the result is empty, an `alert()` fires and the function returns early — no API call is made.

**Step 5 — Build URL and fetch**  
The API URL is built using the API key and the city value: `https://api.weatherapi.com/v1/current.json?key=...&q={city}`. `await fetch(URL)` sends the GET request inside a `try/catch` block.

**Step 6 — Check response.ok**  
Unlike basic `fetch`, this app checks `response.ok` after the fetch — if the status is not 200 (e.g. 400 for unknown city), it manually throws an error. This is caught by the `catch` block.

**Step 7 — Parse JSON**  
`await response.json()` parses the response. The relevant fields are nested under `data.location.name`, `data.current.temp_c`, `data.current.condition.text`, `data.current.humidity`, and `data.current.wind_kph`.

**Step 8 — updateUI(data)**  
`updateUI()` is a dedicated helper that takes the full API response and updates all five DOM elements — city name, temperature, condition, humidity, and wind speed — using `textContent`.

**Step 9 — Cache to localStorage**  
`localStorage.setItem("lastWeatherData", JSON.stringify(data))` saves the full response so the next page load can skip the API call and show the last result instantly.

---
<img width="1094" height="1546" alt="image" src="https://github.com/user-attachments/assets/928fc645-19c2-44f1-b6be-bf3fa7223e6a" />

## 📂 Folder structure

```
Weather_App/
├── index.html      # Search bar, city card, weather details layout
├── style.css       # Glassmorphism card, search bar, fade-in animation
└── script.js       # handleSearch, updateUI, cache, keyboard support
```

---

## 🌐 API used

| API | Purpose |
|---|---|
| [WeatherAPI.com](https://www.weatherapi.com) | Live weather data by city name |

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/java_script.git
cd "java_script/Weather_App"
# open index.html in your browser
```

> ⚠️ You'll need your own free API key from [weatherapi.com](https://www.weatherapi.com). Replace the `apiKey` value in `script.js`.

---

## ⚠️ Known issues / things to improve

- API key is hardcoded in `script.js` — anyone who views your source can use it; for a public repo consider adding a note to use their own key or move it to a `.env` (once you move to Node.js)
- The `</html>` closing tag is missing from `index.html` — minor but worth fixing
- No loading state — on slow connections the card shows stale data until the fetch completes; a "Loading..." indicator would improve the experience
- Cached data never expires — if the API returns fresh data tomorrow, old cached data still loads first; adding a timestamp check would fix this

---
# 🛒 ShopSphere — Amazon Clone

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![ES6 Modules](https://img.shields.io/badge/ES6-Modules-orange?style=flat)
![localStorage](https://img.shields.io/badge/localStorage-Persistent-green?style=flat)

A fully functional Amazon-style shopping app with a 4-page flow — product listing, checkout, orders, and package tracking — built with vanilla JavaScript using ES6 modules, `localStorage`, and dynamic DOM rendering.
---
<img width="960" height="508" alt="image" src="https://github.com/user-attachments/assets/a1fac7c6-26c0-450b-98fc-72b160e64705" />

<img width="960" height="508" alt="image" src="https://github.com/user-attachments/assets/e98769e8-28cf-47a9-a756-520e3b66f118" />


> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ Browse 42 products with ratings and prices
- ✅ Add to cart with quantity selector and animated "Added" confirmation
- ✅ Cart persists across page refreshes via `localStorage`
- ✅ Update or delete items directly in the checkout page
- ✅ Choose from 3 delivery speed options (free / $4.99 / $9.99) per item
- ✅ Dynamic delivery date calculation using `dayjs`
- ✅ Live order summary with item count, shipping, tax (10%), and total
- ✅ Order history page with "Buy it again" and "Track package" buttons
- ✅ Package tracking page with visual progress bar (Preparing → Shipped → Delivered)
- ✅ Fully responsive grid from 8 columns (desktop) down to 1 column (mobile)
- ✅ Basic unit test for the `money()` utility function

---

## 🗂️ Pages

| Page | File | Purpose |
|---|---|---|
| Product listing | `amazon.html` | Browse all products, add to cart |
| Checkout | `checkout.html` | Review cart, pick delivery, see total |
| Orders | `orders.html` | View past order history |
| Tracking | `tracking.html` | Track delivery status with progress bar |

---

## 🧠 Algorithm — step by step

### Product page (`amazon.js`)

**Step 1 — Render products**  
`products.forEach()` loops through all 42 items in `products.js` and builds a template string per product including image, name, rating stars, price, quantity selector, and an Add to Cart button. All 42 cards are injected into `.js-products-grid` at once via `innerHTML`.

**Step 2 — Load cart count**  
`calculateCartQuantity()` sums all `quantity` values in the `cart` array and displays the total in the header's `.js-cart-quantity` badge.

**Step 3 — Add to cart**  
Clicking any Add to Cart button reads the selected quantity from `.js-quantity-selector-{id}`, calls `addToCart(productId)`, which either increments an existing cart item or pushes a new one. `saveToStorage()` writes the updated cart to `localStorage`. An "Added" message appears briefly using `setTimeout` and `opacity` toggle.

---

### Checkout page (`checkout.js` → `orderSummary.js` + `paymentSummary.js`)

**Step 4 — Render order summary**  
`renderOrderSummary()` loops through `cart`, matches each item to its product in `products.js` using `getProduct()`, and builds a table row per item. It uses `dayjs` to calculate delivery dates by adding `deliveryOption.deliveryTime` days to today.

**Step 5 — Delivery options**  
Three radio buttons per item (Free 7-day, $4.99 3-day, $9.99 1-day). Clicking any option calls `updateDeliveryOption(productId, deliveryOptionId)` and re-renders both the order summary and payment panel.

**Step 6 — Update quantity inline**  
Clicking "Update" adds `is-editing-quantity` class to show the input field. "Save" reads the new value, validates it (0–999), calls `updateQuantity()`, updates the visible label, and re-renders the payment summary.

**Step 7 — Delete item**  
Clicking "Delete" calls `removeFromcart(productId)`, removes the DOM element directly, and refreshes the payment summary and cart count.

**Step 8 — Payment summary**  
`renderPayment()` loops through `cart`, sums `priceCents × quantity` for all items and `priceCents` for each delivery option. Calculates total before tax, adds 10% tax, and renders the full breakdown with a Place Order button.

---

### Data modules

**`cart.js`** — Cart state lives here. Loaded from `localStorage` on page load (with default items if empty). Four exported functions: `addToCart`, `removeFromcart`, `updatequantity`, `updatedeliveryOption`. Every mutation calls `saveToStorage()` to persist the change.

**`products.js`** — Array of 42 product objects. Each has `id`, `image`, `name`, `rating`, `priceCents`, and `keywords`. Clothing items also have `type: "clothing"` and a `sizeChartLink`. Exported alongside `getProduct(id)` helper.

**`deliveryOption.js`** — Array of 3 delivery option objects (`id`, `deliveryTime`, `priceCents`). Exported alongside `getdeliveryOption(id)` helper.

**`utils/money.js`** — Single function that converts cents to a formatted dollar string: `money(2095) → "20.95"`. Uses `Math.round` before dividing to handle floating-point edge cases.

---
<img width="1102" height="1394" alt="image" src="https://github.com/user-attachments/assets/74748626-bdf6-47fd-95f8-24691a4e7b4b" />

## 📂 Folder structure

```
ShopSphere/
├── amazon.html               # Product listing page
├── checkout.html             # Checkout page
├── orders.html               # Order history page
├── tracking.html             # Package tracking page
│
├── scripts/
│   ├── amazon.js             # Product grid + add to cart logic
│   ├── checkout.js           # Entry point for checkout page
│   └── checkout/
│       ├── orderSummary.js   # Cart table, delete, update, delivery options
│       └── paymentSummary.js # Price breakdown + total + tax
│
├── data/
│   ├── cart.js               # Cart state + localStorage persistence
│   ├── products.js           # 42-item product catalog
│   └── deliveryOption.js     # 3 delivery tiers
│
├── utils/
│   └── money.js              # Cents to dollars formatter
│
├── tests/
│   ├── moneytest.js          # Unit tests for money()
│   └── moneytest.html        # Runs tests in the browser
│
├── styles/
│   ├── shared/
│   │   ├── general.css       # Global reset, buttons, typography
│   │   └── amazon-header.css # Fixed dark header, search bar, cart icon
│   └── pages/
│       ├── amazon.css        # Responsive product grid (8→1 col)
│       ├── checkout/         # Order summary + payment panel styles
│       ├── orders.css        # Order history grid
│       └── tracking.css      # Progress bar, delivery status
│
└── images/                   # Product images, logos, icons, ratings
```

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/ShopSphere.git
cd ShopSphere
# open amazon.html in your browser
# Note: use a local server (e.g. VS Code Live Server) for ES6 modules to work
```

> ⚠️ ES6 `import/export` modules don't work when opening HTML files directly via `file://`. Use Live Server or any local dev server.

---

## ⚠️ Known issues / things to improve

- `renderexpense(expense)` bug pattern exists here too — `renderOrderSummary` should always be called after mutations to avoid stale state
- The "Place your order" button has no functionality — clicking it does nothing; connecting it to an orders state would complete the flow
- `orders.html` is fully static HTML — it doesn't read from `localStorage`; orders placed on the checkout page don't appear here
- `tracking.html` is also static — delivery status is hardcoded; it should read from the order data
- `moneytest.js` uses `console.log` for pass/fail — no proper test framework; upgrading to Jest would be a good next step
- No search functionality on the product page despite the search bar being present in the HTML

---
# 🛍️ ShopSphere — Single Page Cart App

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![ES6 Modules](https://img.shields.io/badge/ES6-Modules-orange?style=flat)

A polished single-page e-commerce UI with a live cart sidebar — built with vanilla JavaScript ES6 modules. Products render dynamically, the cart updates in real time with quantity controls, and the payment summary recalculates on every change.
<img width="960" height="509" alt="image" src="https://github.com/user-attachments/assets/e445c122-a3ab-43c6-8562-e9060c8da29e" />


> 🚧 Currently making things look pretty — the part where it actually *does* something is a future Tanmay problem.

---

## ✨ Features

- ✅ 10 products rendered dynamically from a data module
- ✅ Add to cart — increments if already in cart, pushes new item if not
- ✅ Live cart sidebar with item count badge in header
- ✅ Per-item quantity controls (+ / −) with auto-remove when quantity hits 0
- ✅ Remove individual items with ✕ button
- ✅ Subtotal, shipping, and total calculated live on every change
- ✅ Checkout button disabled when cart is empty, enabled when items exist
- ✅ Responsive layout — sidebar stacks below products on tablet/mobile
- ✅ CSS design token system with consistent spacing, colors, and typography

---

## 🧠 Algorithm — step by step

**Step 1 — Page load**  
`products` is imported from `data/product.js`. An in-memory `cart = []` array is initialized. No `localStorage` — cart resets on refresh.

**Step 2 — Render product grid**  
`products.map()` builds a template string per product containing image, name, price (converted from cents with `.toFixed(2)`), rating stars, and an Add to Cart button with `data-product-id`. All cards are injected into `.js-products-grid` via `innerHTML` in a single DOM write.

**Step 3 — Initial payment render**  
`renderPayment()` runs immediately on load, showing `$0.00` totals and a disabled Checkout button — so the sidebar is never empty.

**Step 4 — Add to cart**  
Clicking any Add button reads the `data-product-id`, finds the product in `products` using `.find()`, then checks if it already exists in `cart` using `.find()`. If found, `quantity++`. If not, the full product object is spread into the cart with `quantity: 1`. Three functions are called in sequence: `updateCartQuantity()`, `renderCart()`, `renderPayment()`.

**Step 5 — updateCartQuantity()**  
Uses `.reduce()` to sum all `item.quantity` values in the cart and writes the total to the `.js-cart-quantity` badge in the header.

**Step 6 — renderCart()**  
Loops through `cart` with `.forEach()` and builds an HTML string per item including image, name, price, quantity controls (`+` / `−` buttons), and a remove button. Injects into `.js-cart-items` via `innerHTML`, then immediately calls `setupCartListeners()` to re-attach event listeners to the freshly created DOM nodes.

**Step 7 — setupCartListeners()**  
Called after every `renderCart()` because `innerHTML` replaces the DOM — old listeners are lost. It re-attaches three sets of listeners: `+` increments quantity, `−` decrements (and removes the item if it hits 0 using `.splice()`), and ✕ removes the item entirely. Each action calls the same three render functions again to keep everything in sync.

**Step 8 — renderPayment()**  
Uses `.reduce()` to sum `item.price * item.quantity` across all cart items for the subtotal. Shipping is set to `0` (free). Total = subtotal + shipping. HTML is injected into `.cart-summary`. The Checkout button gets `disabled` attribute when `cart.length === 0`.
<img width="1102" height="1242" alt="image" src="https://github.com/user-attachments/assets/6ea4b9f1-00b2-4ae1-a1f2-3478537e2677" />

---

## 📂 Folder structure

```
ShopSphere-v2/
├── Front_page.html       # Single page — header, product grid, cart sidebar
├── Front_page.css        # Design token system + all component styles
├── Front_page.js         # Render logic, cart state, event listeners
└── data/
    └── product.js        # 10-product catalog (id, name, price in cents, image)
```

---

## 🎨 Design system

The CSS uses a full token system via `:root` variables:

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#205C4B` | Buttons, focus rings, logo |
| `--color-accent` | `#C6622D` | Checkout button, sale badges |
| `--color-bg` | `#F6F5F1` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, sidebar, header |
| `--font-display` | Sora | Headings, prices, logo |
| `--font-body` | Inter | Body text, labels |

---

## 🚀 Run locally

```bash
git clone https://github.com/Tanmaykumae09/ShopSphere.git
cd ShopSphere-v2
# Open Front_page.html via Live Server (required for ES6 modules)
```

> ⚠️ ES6 `import` doesn't work over `file://`. Use VS Code Live Server or any local dev server.

---

## ⚠️ Known issues / things to improve

- Cart doesn't persist on refresh — adding `localStorage` (same pattern as the original ShopSphere) would keep the cart between sessions
- `setupCartListeners()` re-attaches listeners after every render — this is the "re-render and re-wire" pattern; using event delegation on the parent container instead would be cleaner and more performant
- Product category is hardcoded as `"Audio"` for every item in the template — the `product.js` data has no `category` field; worth adding one per product
- Star rating is hardcoded as `★★★★☆` for every product — same issue, rating data isn't in `product.js`
- The original price (`$99.99`) shown struck-through is hardcoded — should come from product data
- No empty-state message when cart is empty — the commented-out `.cart-empty-message` HTML in `Front_page.html` exists but is never rendered by JS

---

> Built by Tanmay · v2 of ShopSphere · Cleaner single-page architecture
> Built by Tanmay · ES6 Modules · localStorage · dayjs · Vanilla JS
