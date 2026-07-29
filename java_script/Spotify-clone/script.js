import { songs } from "./data/Songs.js";

const state = {
  currentSong: null,
  currentAudio: new Audio(),
  isPlaying: false
};

let songHTML = '';
songs.forEach((song) => {
  console.log(`Song: ${song.title}, Artist: ${song.artist}, Album: ${song.album}, Duration: ${song.duration}`);
  songHTML += `
  <article class="rail-card" data-song-id="1">
    <div class="rail-card__art  art--1" aria-hidden="true"><img src="${song.cover}" alt="${song.title}" /></div>
            <p class="rail-card__title">${song.title}</p>
            <button type="button" class="mini-play" aria-label="Play ${song.title}" data-song-id="${song.id}">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
            </button>
    </article>
  `
})
document.querySelector('.rail-grid').innerHTML = songHTML;
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
    .querySelectorAll(".rail-card__art")
    .forEach((el) => el.classList.remove("is-playing"));

  button
    .closest(".rail-card")
    .querySelector(".rail-card__art")
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