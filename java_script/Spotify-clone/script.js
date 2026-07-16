import { songs } from "./data/Songs.js";

const state = {
  currentSong: null,
  currentAudio: new Audio(),
  isPlaying: false
};

// -----------------------------
// Song Selection
// -----------------------------
document.querySelectorAll(".mini-play").forEach((button) => {
  button.addEventListener("click", () => {
    const songId = Number(button.dataset.songId);
    selectSong(songId, button);
  });
});

// -----------------------------
// Play / Pause Button
// -----------------------------
document
  .querySelector(".play-toggle")
  .addEventListener("click", togglePlayback);

// -----------------------------
// Select Song
// -----------------------------
const selectSong = (songId, button) => {
  const song = songs.find((s) => s.id === songId);

  if (!song) return;

  state.currentSong = song;

  document
    .querySelectorAll(".play-state")
    .forEach((el) => el.classList.remove("is-playing"));

  button
    .closest(".rail-card")
    .querySelector(".play-state")
    .classList.add("is-playing");

  renderNowPlaying();
  playCurrentSong();
};

// -----------------------------
// Update UI
// -----------------------------
const renderNowPlaying = () => {
  const song = state.currentSong;
  if (!song) return;

  const playerBar = document.querySelector(".player-bar");

  playerBar.querySelector(".player-bar__art img").src = song.cover;
  playerBar.querySelector(".player-bar__art img").alt = song.title;
  playerBar.querySelector(".player-bar__title").textContent = song.title;
  playerBar.querySelector(".player-bar__artist").textContent = song.artist;
  playerBar.querySelector(".progress__time__total").textContent =
    song.duration;
};

// -----------------------------
// Play Current Song
// -----------------------------
const playCurrentSong = () => {
  const audio = state.currentAudio;

  audio.pause();
  audio.currentTime = 0;

  audio.src = state.currentSong.audio;
  audio.load();

  audio
    .play()
    .then(() => {
      state.isPlaying = true;
    })
    .catch((err) => console.error(err));
};

// -----------------------------
// Play / Pause Toggle
// -----------------------------
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
}