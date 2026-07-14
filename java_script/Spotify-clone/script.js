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
    isPlaying: false
};

document.querySelectorAll('.mini-play').forEach((button) => {
    const songID = Number(button.dataset.songId);
    button.addEventListener('click', () => {
        const song = songs.find((s) => s.id === songID);
        state.currentSong = song;
        state.isPlaying = true;
        if (state.currentSong) {
            document.querySelectorAll('.play-state').forEach((el) => el.classList.remove('is-playing'));
            button.closest('.rail-card').querySelector('.play-state').classList.add('is-playing');
            renderplaybar();
        }
    });
});

const renderplaybar = () => {
    // Access the properties directly from the currently active song object
    const song = state.currentSong;
    
    let playbar_details = `
    <div class="player-bar__now-playing">
      <div class="player-bar__art art--1" aria-hidden="true">
        <img src="${song.cover}" alt="${song.title}" />
      </div>
      <div class="player-bar__meta">
        <p class="player-bar__title">${song.title}</p>
        <p class="player-bar__artist">${song.artist}</p>
      </div>
      <button type="button" class="icon-btn player-bar__like" aria-label="Add to Liked Songs" aria-pressed="true">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4.5 5.6 4.1c2-.2 3.7.8 4.9 2.5 1.1-1.7 2.8-2.7 4.8-2.5 3.6.4 5.2 3.9 3.7 7.6C19.5 16.4 12 21 12 21Z"/></svg>
      </button>
    </div>

    <div class="player-bar__controls">
      <div class="transport">
        <button type="button" class="icon-btn" aria-label="Shuffle" aria-pressed="false">
          <svg class="icon" viewBox="0 0 24 24"><path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16M4 7h4l7 10h5"/></svg>
        </button>
        <button type="button" class="icon-btn" aria-label="Previous track">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6 5h2v14H6zM18 5v14l-9-7z"/></svg>
        </button>
        <button type="button" class="play-toggle" aria-label="Play" aria-pressed="false">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button type="button" class="icon-btn" aria-label="Next track">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 5h2v14h-2zM6 5v14l9-7z"/></svg>
        </button>
        <button type="button" class="icon-btn" aria-label="Repeat" aria-pressed="false">
          <svg class="icon" viewBox="0 0 24 24"><path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        </button>
      </div>

      <div class="progress">
        <span class="progress__time" aria-hidden="true">1:42</span>
        <label for="track-progress" class="visually-hidden">Seek</label>
        <input type="range" id="track-progress" class="progress__range" min="0" max="100" value="38" aria-label="Seek within track" />
        <span class="progress__time" aria-hidden="true">${song.duration}</span>
      </div>
    </div>
    
    <div class="player-bar__aside">
    <button type="button" class="icon-btn" aria-label="Now playing queue">
    <svg class="icon" viewBox="0 0 24 24"><path d="M3 6h11M3 12h11M3 18h6M17 8v8a2 2 0 1 1-2-2 2 2 0 0 1 2 2V6l4-1v8"/></svg>
    </button>
    <button type="button" class="icon-btn" aria-label="Mute">
    <svg class="icon" viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4Z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg>
    </button>
    <label for="volume" class="visually-hidden">Volume</label>
    <input type="range" id="volume" class="volume__range" min="0" max="100" value="70" aria-label="Volume" />
    </div>
    `;
    
    document.querySelector('.player-bar').innerHTML = playbar_details;
};
