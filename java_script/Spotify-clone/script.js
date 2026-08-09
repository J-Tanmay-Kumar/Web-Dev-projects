import { songs } from "./data/Songs.js";

const state = {
  currentSong: null,
  currentAudio: new Audio(),
  currentTime: 0,
  isPlaying: false,
  isShuffle : false,
};

const PLAY_ICON = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`;

// -----------------------------
// Render Playlist
// -----------------------------
let songHTML = "";

songs.forEach((song) => {
  songHTML += `
    <article class="rail-card">
      <div class="rail-card__art">
        <img src="${song.cover}" alt="${song.title}">
      </div>

      <p class="rail-card__title">${song.title}</p>

      <button
        class="mini-play"
        data-song-id="${song.id}"
        aria-label="Play ${song.title}">
        ▶
      </button>
    </article>
  `;
});

document.querySelector(".rail-grid").innerHTML = songHTML;

// -----------------------------
// Helper
// -----------------------------
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Keeps the big play-toggle button (and any per-row buttons) in sync
// with actual playback state. Fixes bug #1.
function updatePlayPauseUI() {
  const mainBtn = document.querySelector(".play-toggle");
  mainBtn.innerHTML = state.isPlaying ? PAUSE_ICON : PLAY_ICON;
  mainBtn.setAttribute("aria-label", state.isPlaying ? "Pause" : "Play");
  mainBtn.setAttribute("aria-pressed", state.isPlaying ? "true" : "false");

  document.querySelectorAll(".rail-card__art").forEach((card) => {
    card.classList.remove("is-playing");
  });

  if (state.isPlaying && state.currentSong) {
    const activeBtn = document.querySelector(
      `.mini-play[data-song-id="${state.currentSong.id}"]`
    );
    if (activeBtn) {
      activeBtn.closest(".rail-card").querySelector(".rail-card__art")
        .classList.add("is-playing");
    }
  }
}

// -----------------------------
// Select Song (mini-play buttons)
// -----------------------------
document.querySelectorAll(".mini-play").forEach((button) => {
  button.addEventListener("click", () => {
    const songId = Number(button.dataset.songId);

    // Fix #2: clicking the mini-play button of the song that is
    // ALREADY selected should toggle play/pause, not restart it.
    if (state.currentSong && state.currentSong.id === songId) {
      togglePlayback();
      return;
    }

    selectSong(songId);
  });
});

// -----------------------------
// Play Toggle
// -----------------------------
document
  .querySelector(".play-toggle")
  .addEventListener("click", togglePlayback);

// -----------------------------
// Previous / Next
// -----------------------------
document.querySelector('[aria-label="Previous track"]')
  .addEventListener("click", () => stepTrack(-1));

document.querySelector('[aria-label="Next track"]')
  .addEventListener("click", () => stepTrack(1));

function stepTrack(direction) {
  if (!state.currentSong) return;

  const currentIndex = songs.findIndex((s) => s.id === state.currentSong.id);
  let nextIndex;

  if (state.isShuffle) {
    nextIndex = Math.floor(Math.random() * songs.length);
    
    // If the random index matches the current song, fall back to index + 1
    if (nextIndex === currentIndex && songs.length > 1) {
      nextIndex = (currentIndex + 1) % songs.length;
    }
  } else {
    nextIndex = (currentIndex + direction + songs.length) % songs.length;
  }

  selectSong(songs[nextIndex].id);
}
// -----------------------------
// Progress Bar Seeking
// -----------------------------
document
  .getElementById("track-progress")
  .addEventListener("input", (e) => {
    state.currentAudio.currentTime = Number(e.target.value);
  });

// -----------------------------
// Volume / Mute (Fix #4 — previously unwired)
// -----------------------------
const volumeInput = document.getElementById("volume");
let lastVolume = Number(volumeInput.value) / 100;

state.currentAudio.volume = lastVolume;

volumeInput.addEventListener("input", (e) => {
  const vol = Number(e.target.value) / 100;
  state.currentAudio.volume = vol;
  state.currentAudio.muted = false;
  if (vol > 0) lastVolume = vol;
});

document.querySelector('[aria-label="Mute"]').addEventListener("click", (e) => {
  const btn = e.currentTarget;
  state.currentAudio.muted = !state.currentAudio.muted;

  if (state.currentAudio.muted) {
    btn.setAttribute("aria-label", "Unmute");
    volumeInput.value = 0;
  } else {
    btn.setAttribute("aria-label", "Mute");
    volumeInput.value = Math.round((lastVolume || 0.7) * 100);
    state.currentAudio.volume = lastVolume || 0.7;
  }
});

// -----------------------------
// Time Update
// -----------------------------
state.currentAudio.addEventListener("loadedmetadata", () => {
  document.getElementById("track-progress").max =
    Math.floor(state.currentAudio.duration);
});

state.currentAudio.addEventListener("timeupdate", () => {
  state.currentTime = state.currentAudio.currentTime;

  document.querySelector(".progress__time").textContent =
    formatTime(state.currentTime);

  document.getElementById("track-progress").value =
    Math.floor(state.currentTime);
});

// -----------------------------
// Song Finished (Fix #3 — was leaving stale UI state)
// -----------------------------
state.currentAudio.addEventListener("ended", () => {
  state.isPlaying = false;

  document.getElementById("track-progress").value = 0;
  document.querySelector(".progress__time").textContent = "0:00";

  updatePlayPauseUI();
});

// -----------------------------
// Select Song
// -----------------------------
function selectSong(songId) {
  const song = songs.find((s) => s.id === songId);

  if (!song) return;

  state.currentSong = song;

  renderNowPlaying();
  playCurrentSong();
}

// -----------------------------
// Update Bottom Player
// -----------------------------
function renderNowPlaying() {
  const song = state.currentSong;

  document.querySelector(".player-bar__art img").src = song.cover;
  document.querySelector(".player-bar__art img").alt = song.title;

  document.querySelector(".player-bar__title").textContent = song.title;
  document.querySelector(".player-bar__artist").textContent = song.artist;

  document.querySelector(".progress__time").textContent = "0:00";
  document.querySelector(".progress__time__total").textContent = song.duration;

  document.getElementById("track-progress").value = 0;
}

// -----------------------------
// Play Song
// -----------------------------
function playCurrentSong() {
  const audio = state.currentAudio;

  audio.pause();
  audio.currentTime = 0;
  audio.src = state.currentSong.audio;
  audio.load();

  audio.play()
    .then(() => {
      state.isPlaying = true;
      updatePlayPauseUI();
    })
    .catch(console.error);
}

// -----------------------------
// Play / Pause
// -----------------------------
const shuffleBtn = document.querySelector('[aria-label="Shuffle"]');
function togglePlayback() {
  if (!state.currentSong) return;

  const audio = state.currentAudio;

  if (state.isPlaying) {
    audio.pause();
    state.isPlaying = false;
  } else {
    audio.play();
    state.isPlaying = true;
  }

  updatePlayPauseUI();
}

shuffleBtn.addEventListener('click', () => {
  state.isShuffle = !state.isShuffle;
  shuffleBtn.setAttribute('aria-pressed', state.isShuffle);
  console.log('Shuffle clicked, pressed state:', state.isShuffle);
});