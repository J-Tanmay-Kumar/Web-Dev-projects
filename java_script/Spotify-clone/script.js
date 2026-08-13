import { songs } from "./data/Songs.js";

const state = {
  currentSong: null,
  currentAudio: new Audio(),
  currentTime: 0,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
};

// -----------------------------
// Icons
// -----------------------------

const PLAY_ICON = `
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M8 5v14l11-7z"/>
  </svg>
`;

const PAUSE_ICON = `
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z"/>
  </svg>
`;

// -----------------------------
// Like Feature
// -----------------------------

const likedsongs = [];

const likeBtn = document.querySelector(
  '[aria-label="Add to Liked Songs"]'
);

function updateLikeUI() {
  if (!state.currentSong) return;

  const songId = state.currentSong.id;
  const isLiked = likedsongs.includes(songId);

  if (isLiked) {
    likeBtn.classList.add("player-bar__like__liked");
    likeBtn.setAttribute(
      "aria-label",
      "Remove from Liked Songs"
    );
    likeBtn.setAttribute("aria-pressed", "true");
  } else {
    likeBtn.classList.remove("player-bar__like__liked");
    likeBtn.setAttribute(
      "aria-label",
      "Add to Liked Songs"
    );
    likeBtn.setAttribute("aria-pressed", "false");
  }
}

likeBtn.addEventListener("click", () => {
  if (!state.currentSong) return;

  const songId = state.currentSong.id;

  const exists = likedsongs.includes(songId);

  if (!exists) {
    // Add song to liked songs
    likedsongs.push(songId);
  } else {
    // Remove song from liked songs
    const index = likedsongs.indexOf(songId);
    likedsongs.splice(index, 1);
  }

  updateLikeUI();

  console.log("Liked songs:", likedsongs);
});

// -----------------------------
// Render Playlist
// -----------------------------

let songHTML = "";

songs.forEach((song) => {
  songHTML += `
    <article class="rail-card">

      <div class="rail-card__art">
        <img
          src="${song.cover}"
          alt="${song.title}"
        >
      </div>

      <p class="rail-card__title">
        ${song.title}
      </p>

      <button
        type="button"
        class="mini-play"
        data-song-id="${song.id}"
        aria-label="Play ${song.title}"
      >
        ${PLAY_ICON}
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

// -----------------------------
// Update Play / Pause UI
// -----------------------------

function updatePlayPauseUI() {
  const mainBtn = document.querySelector(".play-toggle");

  mainBtn.innerHTML = state.isPlaying
    ? PAUSE_ICON
    : PLAY_ICON;

  mainBtn.setAttribute(
    "aria-label",
    state.isPlaying ? "Pause" : "Play"
  );

  mainBtn.setAttribute(
    "aria-pressed",
    state.isPlaying ? "true" : "false"
  );

  // Remove playing state from every song
  document
    .querySelectorAll(".rail-card__art")
    .forEach((card) => {
      card.classList.remove("is-playing");
    });

  // Add playing state to current song
  if (state.isPlaying && state.currentSong) {
    const activeBtn = document.querySelector(
      `.mini-play[data-song-id="${state.currentSong.id}"]`
    );

    if (activeBtn) {
      const card = activeBtn.closest(".rail-card");

      card
        .querySelector(".rail-card__art")
        .classList.add("is-playing");
    }
  }
}

// -----------------------------
// Mini Play Buttons
// -----------------------------

document
  .querySelectorAll(".mini-play")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const songId = Number(
        button.dataset.songId
      );

      // Same song → play/pause
      if (
        state.currentSong &&
        state.currentSong.id === songId
      ) {
        togglePlayback();
        return;
      }

      // Different song → select it
      selectSong(songId);
    });

  });

// -----------------------------
// Main Play / Pause Button
// -----------------------------

document
  .querySelector(".play-toggle")
  .addEventListener(
    "click",
    togglePlayback
  );

// -----------------------------
// Previous Track
// -----------------------------

document
  .querySelector('[aria-label="Previous track"]')
  .addEventListener("click", () => {
    stepTrack(-1);
  });

// -----------------------------
// Next Track
// -----------------------------

document
  .querySelector('[aria-label="Next track"]')
  .addEventListener("click", () => {
    stepTrack(1);
  });

// -----------------------------
// Shuffle
// -----------------------------

const shuffleBtn = document.querySelector(
  '[aria-label="Shuffle"]'
);

shuffleBtn.addEventListener("click", () => {

  state.isShuffle = !state.isShuffle;

  shuffleBtn.setAttribute(
    "aria-pressed",
    state.isShuffle
  );

  console.log(
    "Shuffle:",
    state.isShuffle
  );
});

// -----------------------------
// Repeat
// -----------------------------

const repeatBtn = document.querySelector(
  '[aria-label="Repeat"]'
);

repeatBtn.addEventListener("click", () => {

  state.isRepeat = !state.isRepeat;

  repeatBtn.setAttribute(
    "aria-pressed",
    state.isRepeat
  );

  console.log(
    "Repeat:",
    state.isRepeat
  );
});

// -----------------------------
// Step Track
// -----------------------------

function stepTrack(direction) {

  if (!state.currentSong) return;

  const currentIndex = songs.findIndex(
    (song) =>
      song.id === state.currentSong.id
  );

  let nextIndex;

  if (state.isShuffle) {

    nextIndex = Math.floor(
      Math.random() * songs.length
    );

    // Don't select the same song
    if (
      nextIndex === currentIndex &&
      songs.length > 1
    ) {
      nextIndex =
        (currentIndex + 1) % songs.length;
    }

  } else {

    nextIndex =
      (currentIndex +
        direction +
        songs.length) %
      songs.length;
  }

  selectSong(songs[nextIndex].id);
}

// -----------------------------
// Progress Bar Seeking
// -----------------------------

const progressSlider =
  document.getElementById(
    "track-progress"
  );

progressSlider.addEventListener(
  "input",
  (e) => {

    const targetTime =
      Number(e.target.value);

    state.currentAudio.currentTime =
      targetTime;

    state.currentTime =
      targetTime;

    document.querySelector(
      ".progress__time"
    ).textContent =
      formatTime(targetTime);
  }
);

// -----------------------------
// Volume
// -----------------------------

const volumeInput =
  document.getElementById("volume");

let lastVolume =
  Number(volumeInput.value) / 100;

state.currentAudio.volume =
  lastVolume;

volumeInput.addEventListener(
  "input",
  (e) => {

    const volume =
      Number(e.target.value) / 100;

    state.currentAudio.volume =
      volume;

    state.currentAudio.muted =
      false;

    if (volume > 0) {
      lastVolume = volume;
    }
  }
);

// -----------------------------
// Mute / Unmute
// -----------------------------

const muteBtn =
  document.querySelector(
    '[aria-label="Mute"]'
  );

muteBtn.addEventListener(
  "click",
  () => {

    state.currentAudio.muted =
      !state.currentAudio.muted;

    if (
      state.currentAudio.muted
    ) {

      muteBtn.setAttribute(
        "aria-label",
        "Unmute"
      );

      volumeInput.value = 0;

    } else {

      muteBtn.setAttribute(
        "aria-label",
        "Mute"
      );

      const volume =
        lastVolume || 0.7;

      volumeInput.value =
        Math.round(volume * 100);

      state.currentAudio.volume =
        volume;
    }
  }
);

// -----------------------------
// Audio Metadata Loaded
// -----------------------------

state.currentAudio.addEventListener(
  "loadedmetadata",
  () => {

    const duration =
      state.currentAudio.duration;

    if (!isNaN(duration)) {

      progressSlider.max =
        Math.floor(duration);
    }

    progressSlider.value = 0;
  }
);

// -----------------------------
// Audio Time Update
// -----------------------------

state.currentAudio.addEventListener(
  "timeupdate",
  () => {

    state.currentTime =
      state.currentAudio.currentTime;

    document.querySelector(
      ".progress__time"
    ).textContent =
      formatTime(
        state.currentTime
      );

    progressSlider.value =
      Math.floor(
        state.currentTime
      );
  }
);

// -----------------------------
// Song Finished
// -----------------------------

state.currentAudio.addEventListener(
  "ended",
  () => {

    if (state.isRepeat) {

      // Replay same song
      state.currentAudio.currentTime =
        0;

      state.currentAudio
        .play()
        .then(() => {

          state.isPlaying = true;

          updatePlayPauseUI();

        })
        .catch(console.error);

    } else {

      // Go to next song
      state.isPlaying = false;

      stepTrack(1);
    }

    progressSlider.value = 0;

    document.querySelector(
      ".progress__time"
    ).textContent = "0:00";

    updatePlayPauseUI();
  }
);

// -----------------------------
// Select Song
// -----------------------------

function selectSong(songId) {

  const song = songs.find(
    (song) => song.id === songId
  );

  if (!song) return;

  state.currentSong = song;

  renderNowPlaying();

  playCurrentSong();
}

// -----------------------------
// Render Now Playing
// -----------------------------

function renderNowPlaying() {

  const song =
    state.currentSong;

  if (!song) return;

  const playerArt =
    document.querySelector(
      ".player-bar__art img"
    );

  const playerTitle =
    document.querySelector(
      ".player-bar__title"
    );

  const playerArtist =
    document.querySelector(
      ".player-bar__artist"
    );

  const currentTime =
    document.querySelector(
      ".progress__time"
    );

  const totalTime =
    document.querySelector(
      ".progress__time__total"
    );

  playerArt.src =
    song.cover;

  playerArt.alt =
    song.title;

  playerTitle.textContent =
    song.title;

  playerArtist.textContent =
    song.artist;

  currentTime.textContent =
    "0:00";

  totalTime.textContent =
    song.duration;

  progressSlider.value = 0;

  // Update Like UI for the newly selected song
  updateLikeUI();
}

// -----------------------------
// Play Current Song
// -----------------------------

function playCurrentSong() {

  const audio =
    state.currentAudio;

  audio.pause();

  audio.currentTime = 0;

  audio.src =
    state.currentSong.audio;

  audio.load();

  audio
    .play()
    .then(() => {

      state.isPlaying = true;

      updatePlayPauseUI();

    })
    .catch((error) => {
      console.error(
        "Audio playback error:",
        error
      );
    });
}

// -----------------------------
// Play / Pause
// -----------------------------

function togglePlayback() {

  if (!state.currentSong) return;

  const audio =
    state.currentAudio;

  if (state.isPlaying) {

    audio.pause();

    state.isPlaying = false;

  } else {

    audio
      .play()
      .then(() => {

        state.isPlaying = true;

        updatePlayPauseUI();

      })
      .catch(console.error);

    return;
  }

  updatePlayPauseUI();
}