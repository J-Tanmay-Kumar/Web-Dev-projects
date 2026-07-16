import { songs } from "./data/Songs.js";

console.log("Welcome to Ember Web Player");

let songHtml = "";
// Tip: Use forEach instead of map when building a string without returning a new array
songs.forEach((song) => {
    songHtml += `
<article class="rail-card" data-song-id="${song.id}">
  <div class="rail-card__art art--1" aria-hidden="true">
    <img src="${song.cover}" alt="${song.title}" />
    <div class="play-state" aria-hidden="true"></div>
  </div>
  <p class="rail-card__title">${song.title}</p>
  <button type="button" class="mini-play" aria-label="Play ${song.title}" data-song-id="${song.id}">
    <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
  </button>
</article>
        `;
});
document.querySelector('.rail-grid').innerHTML = songHtml;

const state = {
    currentSong: null,
    isPlaying: false,
    currentAudio :null
};

document.querySelectorAll('.mini-play').forEach((button) => {
    const songID = Number(button.dataset.songId);
    button.addEventListener('click', () => {
        const song = songs.find((s) => s.id === songID);
        state.currentSong = song;
        state.isPlaying = true;
        document.querySelectorAll('.play-state').forEach((el) => el.classList.remove('is-playing'));
        button.closest('.rail-card').querySelector('.play-state').classList.add('is-playing');
        if (state.currentSong) {
            renderNowplaying();
        }
    });
});


// ... (your rail-grid code and event listeners stay exactly the same) ...

const renderNowplaying = () => {
    const song = state.currentSong;
    if (!song) return;
    
    const playerBar = document.querySelector('.player-bar');
    if (!playerBar) return;

    // Direct DOM element targeting and updates
    playerBar.querySelector('.player-bar__art img').src = song.cover;
    playerBar.querySelector('.player-bar__art').alt = song.title;
    playerBar.querySelector('.player-bar__title').textContent = song.title;
    playerBar.querySelector('.player-bar__artist').textContent = song.artist;
    playerBar.querySelector('.progress__time__total').textContent = song.duration;
    console.log(song.audio);

    // --- FIX: Manage Audio State ---
    
    // 1. If a song is already playing, stop it before starting a new one
    if (state.currentAudio) {
        state.currentAudio.pause();
    }

    // 2. Create the new audio instance and assign it to our state object
    state.currentAudio = new Audio(song.audio);
    
    // 3. Play the new audio
    state.currentAudio.play().catch((err) => {
        console.error("Error playing audio:", err);
    });
};