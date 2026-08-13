import { songs } from "./data/Songs.js";

/* =========================================================
   STATE
========================================================= */

const STORAGE_KEY = "ember-music-state";

const state = {
  currentSong: null,
  currentAudio: new Audio(),
  currentTime: 0,
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,

  likedSongs: [],
  queue: [],
  searchQuery: "",
};

/* =========================================================
   ICONS
========================================================= */

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

const HEART_FILLED_ICON = `
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4.5 5.6 4.1c2-.2 3.7.8 4.9 2.5 1.1-1.7 2.8-2.7 4.8-2.5 3.6.4 5.2 3.9 3.7 7.6C19.5 16.4 12 21 12 21Z"/>
  </svg>
`;

const HEART_OUTLINE_ICON = `
  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M20.8 8.9c0 5-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.9c0-2.7 2-4.7 4.5-4.7 1.8 0 3.4 1 4.3 2.4.9-1.4 2.5-2.4 4.3-2.4 2.5 0 4.5 2 4.5 4.7Z"/>
  </svg>
`;

const SHUFFLE_ICON = `
  <svg class="icon" viewBox="0 0 24 24">
    <path d="m16 3 4 4-4 4M20 7h-5l-8 10H3M3 7h4l2 2M20 17l-4 4M16 13l4 4h1"/>
  </svg>
`;

const REPEAT_ICON = `
  <svg class="icon" viewBox="0 0 24 24">
    <path d="m17 2 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
`;

const NEXT_ICON = `
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M16 5h2v14h-2zM6 5v14l9 7V5z"/>
  </svg>
`;

const PREVIOUS_ICON = `
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M6 5h2v14H6zM18 5v14l-9-7z"/>
  </svg>
`;

/* =========================================================
   DOM REFERENCES
========================================================= */

const railGrid = document.querySelector(".rail-grid");
const playerBar = document.querySelector(".player-bar");

const playToggle = document.querySelector(".play-toggle");
const previousButton = document.querySelector(
  '[aria-label="Previous track"]'
);
const nextButton = document.querySelector(
  '[aria-label="Next track"]'
);

const shuffleButton = document.querySelector(
  '[aria-label="Shuffle"]'
);

const repeatButton = document.querySelector(
  '[aria-label="Repeat"]'
);

const likeButton = document.querySelector(
  '[aria-label="Add to Liked Songs"], [aria-label="Remove from Liked Songs"]'
);

const muteButton = document.querySelector(
  '[aria-label="Mute"], [aria-label="Unmute"]'
);

const volumeInput = document.getElementById("volume");
const progressSlider = document.getElementById("track-progress");

const currentTimeElement = document.querySelector(
  ".progress__time"
);

const totalTimeElement = document.querySelector(
  ".progress__time__total"
);

const searchInput = document.getElementById("global-search");
const searchForm = document.querySelector(".search-form");

const likedSidebarLink = document.querySelector(
  '.action-row[href="#liked"]'
);

const queueButton = document.querySelector(
  '[aria-label="Now playing queue"]'
);

/* =========================================================
   STORAGE
========================================================= */

function saveState() {
  const storedState = {
    likedSongs: state.likedSongs,
    volume: state.currentAudio.volume,
    muted: state.currentAudio.muted,
    isShuffle: state.isShuffle,
    isRepeat: state.isRepeat,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(storedState)
  );
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    state.likedSongs = Array.isArray(parsed.likedSongs)
      ? parsed.likedSongs
      : [];

    state.isShuffle = Boolean(parsed.isShuffle);
    state.isRepeat = Boolean(parsed.isRepeat);

    if (typeof parsed.volume === "number") {
      state.currentAudio.volume = parsed.volume;
    }

    if (typeof parsed.muted === "boolean") {
      state.currentAudio.muted = parsed.muted;
    }
  } catch (error) {
    console.error("Failed to restore Ember state:", error);
  }
}

/* =========================================================
   HELPERS
========================================================= */

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function getSongById(songId) {
  return songs.find((song) => song.id === songId);
}

function isSongLiked(songId) {
  return state.likedSongs.includes(songId);
}

/* =========================================================
   PLAYLIST RENDERING
========================================================= */

function renderPlaylist(list = songs) {
  if (list.length === 0) {
    railGrid.innerHTML = `
      <div class="rail-empty">
        <p>No songs found.</p>
      </div>
    `;
    return;
  }

  railGrid.innerHTML = list
    .map((song) => {
      const isCurrent =
        state.currentSong &&
        state.currentSong.id === song.id;

      return `
        <article
          class="rail-card ${isCurrent && state.isPlaying ? "is-playing" : ""}"
          data-song-id="${song.id}"
        >
          <div class="rail-card__art ${isCurrent && state.isPlaying ? "is-playing" : ""}">
            <img
              src="${song.cover}"
              alt="${song.title}"
            >
            <div class="play-state ${
              isCurrent && state.isPlaying ? "is-playing" : ""
            }"></div>
          </div>

          <div class="rail-card__content">
            <p class="rail-card__title">${song.title}</p>
            <p class="rail-card__artist">${song.artist}</p>
          </div>

          <button
            type="button"
            class="mini-play"
            data-song-id="${song.id}"
            aria-label="Play ${song.title}"
          >
            ${
              isCurrent && state.isPlaying
                ? PAUSE_ICON
                : PLAY_ICON
            }
          </button>
        </article>
      `;
    })
    .join("");

  document
    .querySelectorAll(".mini-play")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const songId = Number(button.dataset.songId);

        if (
          state.currentSong &&
          state.currentSong.id === songId
        ) {
          togglePlayback();
        } else {
          selectSong(songId);
        }
      });
    });
}

renderPlaylist();

/* =========================================================
   PLAY / PAUSE UI
========================================================= */

function updatePlayPauseUI() {
  if (!playToggle) return;

  playToggle.innerHTML = state.isPlaying
    ? PAUSE_ICON
    : PLAY_ICON;

  playToggle.setAttribute(
    "aria-label",
    state.isPlaying ? "Pause" : "Play"
  );

  playToggle.setAttribute(
    "aria-pressed",
    String(state.isPlaying)
  );

  document
    .querySelectorAll(".rail-card")
    .forEach((card) => {
      card.classList.remove("is-playing");
    });

  document
    .querySelectorAll(".rail-card__art")
    .forEach((art) => {
      art.classList.remove("is-playing");
    });

  document
    .querySelectorAll(".play-state")
    .forEach((stateElement) => {
      stateElement.classList.remove("is-playing");
    });

  if (!state.currentSong) return;

  const activeCard = document.querySelector(
    `.rail-card[data-song-id="${state.currentSong.id}"]`
  );

  if (!activeCard) return;

  if (state.isPlaying) {
    activeCard.classList.add("is-playing");

    activeCard
      .querySelector(".rail-card__art")
      ?.classList.add("is-playing");

    activeCard
      .querySelector(".play-state")
      ?.classList.add("is-playing");

    activeCard
      .querySelector(".mini-play")
      .innerHTML = PAUSE_ICON;
  } else {
    activeCard.querySelector(".mini-play").innerHTML =
      PLAY_ICON;
  }
}

/* =========================================================
   NOW PLAYING UI
========================================================= */

function renderNowPlaying() {
  const song = state.currentSong;

  if (!song) return;

  const cover = document.querySelector(
    ".player-bar__art img"
  );

  const title = document.querySelector(
    ".player-bar__title"
  );

  const artist = document.querySelector(
    ".player-bar__artist"
  );

  if (cover) {
    cover.src = song.cover;
    cover.alt = song.title;
  }

  if (title) {
    title.textContent = song.title;
  }

  if (artist) {
    artist.textContent = song.artist;
  }

  if (currentTimeElement) {
    currentTimeElement.textContent = "0:00";
  }

  if (totalTimeElement) {
    totalTimeElement.textContent =
      song.duration;
  }

  if (progressSlider) {
    progressSlider.value = 0;
  }

  updateLikeUI();
  renderPlaylist(
    state.searchQuery
      ? getFilteredSongs()
      : songs
  );
}

/* =========================================================
   SONG SELECTION
========================================================= */

function selectSong(songId) {
  const song = getSongById(songId);

  if (!song) return;

  state.currentSong = song;

  renderNowPlaying();
  playCurrentSong();
}

/* =========================================================
   PLAY CURRENT SONG
========================================================= */

function playCurrentSong() {
  if (!state.currentSong) return;

  const audio = state.currentAudio;

  audio.pause();
  audio.currentTime = 0;

  audio.src = state.currentSong.audio;
  audio.load();

  audio
    .play()
    .then(() => {
      state.isPlaying = true;
      updatePlayPauseUI();
      updateLikeUI();
    })
    .catch((error) => {
      state.isPlaying = false;
      updatePlayPauseUI();

      console.error(
        "Audio playback failed:",
        error
      );
    });
}

/* =========================================================
   PLAY / PAUSE
========================================================= */

function togglePlayback() {
  if (!state.currentSong) return;

  const audio = state.currentAudio;

  if (audio.paused) {
    audio
      .play()
      .then(() => {
        state.isPlaying = true;
        updatePlayPauseUI();
      })
      .catch(console.error);
  } else {
    audio.pause();
    state.isPlaying = false;
    updatePlayPauseUI();
  }
}

playToggle?.addEventListener(
  "click",
  togglePlayback
);

/* =========================================================
   PREVIOUS / NEXT
========================================================= */

function stepTrack(direction) {
  if (!state.currentSong) return;

  const currentIndex = songs.findIndex(
    (song) =>
      song.id === state.currentSong.id
  );

  if (currentIndex === -1) return;

  let nextIndex;

  if (state.isShuffle) {
    if (songs.length <= 1) {
      nextIndex = currentIndex;
    } else {
      do {
        nextIndex = Math.floor(
          Math.random() * songs.length
        );
      } while (nextIndex === currentIndex);
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

previousButton?.addEventListener(
  "click",
  () => stepTrack(-1)
);

nextButton?.addEventListener(
  "click",
  () => stepTrack(1)
);

/* =========================================================
   SHUFFLE
========================================================= */

function updateShuffleUI() {
  if (!shuffleButton) return;

  shuffleButton.setAttribute(
    "aria-pressed",
    String(state.isShuffle)
  );
}

shuffleButton?.addEventListener("click", () => {
  state.isShuffle = !state.isShuffle;

  updateShuffleUI();
  saveState();
});

updateShuffleUI();

/* =========================================================
   REPEAT
========================================================= */

function updateRepeatUI() {
  if (!repeatButton) return;

  repeatButton.setAttribute(
    "aria-pressed",
    String(state.isRepeat)
  );
}

repeatButton?.addEventListener("click", () => {
  state.isRepeat = !state.isRepeat;

  updateRepeatUI();
  saveState();
});

updateRepeatUI();

/* =========================================================
   AUDIO EVENTS
========================================================= */

state.currentAudio.addEventListener(
  "loadedmetadata",
  () => {
    if (!progressSlider) return;

    if (
      Number.isFinite(
        state.currentAudio.duration
      )
    ) {
      progressSlider.max =
        Math.floor(
          state.currentAudio.duration
        );
    }

    progressSlider.value = 0;
  }
);

state.currentAudio.addEventListener(
  "timeupdate",
  () => {
    state.currentTime =
      state.currentAudio.currentTime;

    if (currentTimeElement) {
      currentTimeElement.textContent =
        formatTime(state.currentTime);
    }

    if (progressSlider) {
      progressSlider.value =
        Math.floor(
          state.currentAudio.currentTime
        );

      updateProgressFill();
    }
  }
);

state.currentAudio.addEventListener(
  "play",
  () => {
    state.isPlaying = true;
    updatePlayPauseUI();
  }
);

state.currentAudio.addEventListener(
  "pause",
  () => {
    if (
      state.currentAudio.currentTime <
      state.currentAudio.duration
    ) {
      state.isPlaying = false;
      updatePlayPauseUI();
    }
  }
);

state.currentAudio.addEventListener(
  "ended",
  () => {

    if (state.isRepeat) {
      state.currentAudio.currentTime = 0;

      state.currentAudio
        .play()
        .then(() => {
          state.isPlaying = true;
          updatePlayPauseUI();
        })
        .catch(console.error);

      return;
    }

    state.isPlaying = false;
    stepTrack(1);
  }
);

/* =========================================================
   PROGRESS / SEEK
========================================================= */

function updateProgressFill() {
  if (!progressSlider) return;

  const min =
    Number(progressSlider.min) || 0;

  const max =
    Number(progressSlider.max) || 100;

  const value =
    Number(progressSlider.value) || 0;

  const percentage =
    max > min
      ? ((value - min) / (max - min)) * 100
      : 0;

  progressSlider.style.setProperty(
    "--fill",
    `${percentage}%`
  );
}

progressSlider?.addEventListener(
  "input",
  (event) => {

    const targetTime =
      Number(event.target.value);

    state.currentAudio.currentTime =
      targetTime;

    state.currentTime =
      targetTime;

    if (currentTimeElement) {
      currentTimeElement.textContent =
        formatTime(targetTime);
    }

    updateProgressFill();
  }
);

updateProgressFill();

/* =========================================================
   VOLUME / MUTE
========================================================= */

let lastVolume = 0.7;

if (volumeInput) {
  lastVolume =
    state.currentAudio.volume ||
    Number(volumeInput.value) / 100 ||
    0.7;

  state.currentAudio.volume =
    Number(volumeInput.value) / 100;

  volumeInput.addEventListener(
    "input",
    (event) => {

      const volume =
        Number(event.target.value) / 100;

      state.currentAudio.volume =
        volume;

      state.currentAudio.muted =
        false;

      if (volume > 0) {
        lastVolume = volume;
      }

      updateVolumeFill();
      saveState();
    }
  );
}

function updateVolumeFill() {
  if (!volumeInput) return;

  const percentage =
    Number(volumeInput.value);

  volumeInput.style.setProperty(
    "--fill",
    `${percentage}%`
  );
}

muteButton?.addEventListener(
  "click",
  () => {

    state.currentAudio.muted =
      !state.currentAudio.muted;

    if (state.currentAudio.muted) {

      muteButton.setAttribute(
        "aria-label",
        "Unmute"
      );

      if (volumeInput) {
        volumeInput.value = 0;
        updateVolumeFill();
      }

    } else {

      const restoredVolume =
        lastVolume || 0.7;

      state.currentAudio.volume =
        restoredVolume;

      if (volumeInput) {
        volumeInput.value =
          Math.round(
            restoredVolume * 100
          );

        updateVolumeFill();
      }

      muteButton.setAttribute(
        "aria-label",
        "Mute"
      );
    }

    saveState();
  }
);

updateVolumeFill();

/* =========================================================
   LIKE SYSTEM
========================================================= */

function updateLikeUI() {
  if (!likeButton) return;

  if (!state.currentSong) {
    likeButton.classList.remove(
      "player-bar__like__liked"
    );

    likeButton.innerHTML =
      HEART_OUTLINE_ICON;

    likeButton.setAttribute(
      "aria-label",
      "Add to Liked Songs"
    );

    likeButton.setAttribute(
      "aria-pressed",
      "false"
    );

    return;
  }

  const liked =
    isSongLiked(
      state.currentSong.id
    );

  likeButton.classList.toggle(
    "player-bar__like__liked",
    liked
  );

  likeButton.innerHTML = liked
    ? HEART_FILLED_ICON
    : HEART_OUTLINE_ICON;

  likeButton.setAttribute(
    "aria-label",
    liked
      ? "Remove from Liked Songs"
      : "Add to Liked Songs"
  );

  likeButton.setAttribute(
    "aria-pressed",
    String(liked)
  );
}

likeButton?.addEventListener(
  "click",
  () => {

    if (!state.currentSong) return;

    const songId =
      state.currentSong.id;

    const index =
      state.likedSongs.indexOf(
        songId
      );

    if (index === -1) {
      state.likedSongs.push(songId);
    } else {
      state.likedSongs.splice(
        index,
        1
      );
    }

    updateLikeUI();
    renderLikedSongs();
    saveState();
  }
);

/* =========================================================
   LIKED SONGS
========================================================= */

function getLikedSongs() {
  return songs.filter((song) =>
    state.likedSongs.includes(
      song.id
    )
  );
}

function renderLikedSongs() {

  const container =
    document.querySelector(
      ".liked-songs-container"
    );

  if (!container) return;

  const liked = getLikedSongs();

  if (liked.length === 0) {
    container.innerHTML = `
      <div class="liked-empty">
        <p>No liked songs yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = liked
    .map(
      (song) => `
        <article
          class="liked-song"
          data-song-id="${song.id}"
        >
          <img
            src="${song.cover}"
            alt="${song.title}"
          >

          <div class="liked-song__info">
            <p>${song.title}</p>
            <span>${song.artist}</span>
          </div>

          <button
            type="button"
            class="liked-song__play"
            data-song-id="${song.id}"
            aria-label="Play ${song.title}"
          >
            ${PLAY_ICON}
          </button>

          <button
            type="button"
            class="liked-song__remove"
            data-song-id="${song.id}"
            aria-label="Remove ${song.title} from liked songs"
          >
            ${HEART_FILLED_ICON}
          </button>
        </article>
      `
    )
    .join("");

  container
    .querySelectorAll(".liked-song__play")
    .forEach((button) => {
      button.addEventListener("click", () => {
        selectSong(
          Number(button.dataset.songId)
        );
      });
    });

  container
    .querySelectorAll(".liked-song__remove")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const songId =
          Number(button.dataset.songId);

        const index =
          state.likedSongs.indexOf(
            songId
          );

        if (index !== -1) {
          state.likedSongs.splice(
            index,
            1
          );
        }

        updateLikeUI();
        renderLikedSongs();
        saveState();
      });
    });
}

/* =========================================================
   DYNAMIC LIKED SONGS PANEL
========================================================= */

function createLikedSongsPanel() {
  if (
    document.querySelector(
      ".liked-songs-container"
    )
  ) {
    return;
  }

  const panel =
    document.createElement("section");

  panel.className =
    "content-section liked-songs-section";

  panel.innerHTML = `
    <div class="content-section__head">
      <h2>Liked Songs</h2>
      <button
        type="button"
        class="see-all liked-close-btn"
      >
        Close
      </button>
    </div>

    <div class="liked-songs-container"></div>
  `;

  const main =
    document.querySelector("#main-content");

  if (main) {
    main.prepend(panel);
  }

  panel
    .querySelector(".liked-close-btn")
    .addEventListener("click", () => {
      panel.remove();
    });

  renderLikedSongs();
}

likedSidebarLink?.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    createLikedSongsPanel();
  }
);

/* =========================================================
   SEARCH
========================================================= */

function getFilteredSongs() {
  const query =
    state.searchQuery
      .trim()
      .toLowerCase();

  if (!query) {
    return songs;
  }

  return songs.filter((song) =>
    [
      song.title,
      song.artist,
      song.album,
    ]
      .filter(Boolean)
      .some((value) =>
        value
          .toLowerCase()
          .includes(query)
      )
  );
}

function handleSearch() {
  renderPlaylist(
    getFilteredSongs()
  );
}

searchInput?.addEventListener(
  "input",
  (event) => {
    state.searchQuery =
      event.target.value;

    handleSearch();
  }
);

searchForm?.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    handleSearch();
  }
);

/* =========================================================
   QUEUE
========================================================= */

function buildDefaultQueue() {
  if (!state.currentSong) {
    state.queue = [];
    return;
  }

  const currentIndex =
    songs.findIndex(
      (song) =>
        song.id ===
        state.currentSong.id
    );

  if (currentIndex === -1) {
    state.queue = [];
    return;
  }

  state.queue = songs
    .slice(currentIndex + 1)
    .map((song) => song.id);
}

function addToQueue(songId) {
  if (
    !songs.some(
      (song) => song.id === songId
    )
  ) {
    return;
  }

  if (
    !state.queue.includes(songId)
  ) {
    state.queue.push(songId);
  }

  renderQueue();
}

function removeFromQueue(songId) {
  const index =
    state.queue.indexOf(songId);

  if (index !== -1) {
    state.queue.splice(index, 1);
  }

  renderQueue();
}

function playNextFromQueue() {
  if (state.queue.length === 0) {
    stepTrack(1);
    return;
  }

  const nextId =
    state.queue.shift();

  selectSong(nextId);

  renderQueue();
}

function renderQueue() {
  const container =
    document.querySelector(
      ".queue-container"
    );

  if (!container) return;

  if (state.queue.length === 0) {
    container.innerHTML = `
      <div class="queue-empty">
        <p>Queue is empty.</p>
      </div>
    `;
    return;
  }

  container.innerHTML =
    state.queue
      .map((songId) => {
        const song =
          getSongById(songId);

        if (!song) return "";

        return `
          <article
            class="queue-item"
            data-song-id="${song.id}"
          >
            <img
              src="${song.cover}"
              alt="${song.title}"
            >

            <div class="queue-item__info">
              <p>${song.title}</p>
              <span>${song.artist}</span>
            </div>

            <button
              type="button"
              class="queue-item__play"
              data-song-id="${song.id}"
              aria-label="Play ${song.title}"
            >
              ${PLAY_ICON}
            </button>

            <button
              type="button"
              class="queue-item__remove"
              data-song-id="${song.id}"
              aria-label="Remove ${song.title} from queue"
            >
              ×
            </button>
          </article>
        `;
      })
      .join("");

  container
    .querySelectorAll(".queue-item__play")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const songId =
          Number(button.dataset.songId);

        const index =
          state.queue.indexOf(songId);

        if (index !== -1) {
          state.queue.splice(
            index,
            1
          );
        }

        selectSong(songId);
        renderQueue();
      });
    });

  container
    .querySelectorAll(".queue-item__remove")
    .forEach((button) => {
      button.addEventListener("click", () => {
        removeFromQueue(
          Number(button.dataset.songId)
        );
      });
    });
}

function createQueuePanel() {
  if (
    document.querySelector(
      ".queue-container"
    )
  ) {
    return;
  }

  const panel =
    document.createElement("section");

  panel.className =
    "content-section queue-section";

  panel.innerHTML = `
    <div class="content-section__head">
      <h2>Up Next</h2>

      <button
        type="button"
        class="see-all queue-close-btn"
      >
        Close
      </button>
    </div>

    <div class="queue-container"></div>
  `;

  document
    .querySelector("#main-content")
    ?.prepend(panel);

  panel
    .querySelector(".queue-close-btn")
    .addEventListener("click", () => {
      panel.remove();
    });

  if (
    state.currentSong &&
    state.queue.length === 0
  ) {
    buildDefaultQueue();
  }

  renderQueue();
}

queueButton?.addEventListener(
  "click",
  () => {
    createQueuePanel();
  }
);

/* =========================================================
   ADD QUEUE BUTTONS TO PLAYLIST
========================================================= */

function enableQueueOnSongCards() {
  document
    .querySelectorAll(".rail-card")
    .forEach((card) => {

      if (
        card.querySelector(
          ".queue-add-btn"
        )
      ) {
        return;
      }

      const songId =
        Number(
          card.dataset.songId
        );

      if (!songId) return;

      const queueButton =
        document.createElement(
          "button"
        );

      queueButton.type = "button";
      queueButton.className =
        "queue-add-btn";
      queueButton.textContent = "+";
      queueButton.setAttribute(
        "aria-label",
        "Add to queue"
      );

      queueButton.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          addToQueue(songId);
        }
      );

      card.appendChild(queueButton);
    });
}

/* =========================================================
   RE-ENABLE QUEUE BUTTONS AFTER RENDERING
========================================================= */

const originalRenderPlaylist =
  renderPlaylist;

/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    const target =
      event.target;

    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target.isContentEditable;

    if (isTyping) return;

    switch (event.key) {

      case " ":
        event.preventDefault();
        togglePlayback();
        break;

      case "ArrowRight":
        event.preventDefault();

        if (state.currentSong) {
          state.currentAudio.currentTime =
            Math.min(
              state.currentAudio.currentTime + 5,
              state.currentAudio.duration || 0
            );
        }

        break;

      case "ArrowLeft":
        event.preventDefault();

        if (state.currentSong) {
          state.currentAudio.currentTime =
            Math.max(
              state.currentAudio.currentTime - 5,
              0
            );
        }

        break;

      case "ArrowUp":
        event.preventDefault();

        if (volumeInput) {
          const current =
            Number(volumeInput.value);

          volumeInput.value =
            Math.min(
              current + 5,
              100
            );

          state.currentAudio.volume =
            Number(volumeInput.value) / 100;

          lastVolume =
            state.currentAudio.volume;

          updateVolumeFill();
        }

        break;

      case "ArrowDown":
        event.preventDefault();

        if (volumeInput) {
          const current =
            Number(volumeInput.value);

          volumeInput.value =
            Math.max(
              current - 5,
              0
            );

          state.currentAudio.volume =
            Number(volumeInput.value) / 100;

          if (
            state.currentAudio.volume >
            0
          ) {
            lastVolume =
              state.currentAudio.volume;
          }

          updateVolumeFill();
        }

        break;

      case "m":
      case "M":
        muteButton?.click();
        break;

      case "n":
      case "N":
        stepTrack(1);
        break;

      case "p":
      case "P":
        stepTrack(-1);
        break;

      default:
        break;
    }
  }
);

/* =========================================================
   IMPROVED TRACK END / QUEUE
========================================================= */

state.currentAudio.addEventListener(
  "ended",
  () => {

    if (state.isRepeat) {

      state.currentAudio.currentTime = 0;

      state.currentAudio
        .play()
        .then(() => {
          state.isPlaying = true;
          updatePlayPauseUI();
        })
        .catch(console.error);

      return;
    }

    if (state.queue.length > 0) {
      playNextFromQueue();
      return;
    }

    stepTrack(1);
  }
);

/* =========================================================
   PLAYLIST RE-RENDER HOOK
========================================================= */

function refreshPlaylist() {
  renderPlaylist(
    state.searchQuery
      ? getFilteredSongs()
      : songs
  );

  enableQueueOnSongCards();
}

const originalRender =
  renderPlaylist;

function renderPlaylistWithQueue(list = songs) {
  originalRender(list);
  enableQueueOnSongCards();
}

/* =========================================================
   INITIAL LOAD
========================================================= */

loadState();

if (volumeInput) {
  volumeInput.value = Math.round(
    state.currentAudio.volume * 100
  );
}

updateVolumeFill();
updateShuffleUI();
updateRepeatUI();
updateLikeUI();
renderLikedSongs();

if (state.currentSong) {
  renderNowPlaying();
}

enableQueueOnSongCards();

/* =========================================================
   LOCAL STORAGE RESET HELPER
   Uncomment manually in console if needed:
========================================================= */

// localStorage.removeItem(STORAGE_KEY);