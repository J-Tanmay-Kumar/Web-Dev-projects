import { songs } from "./data/Songs.js";


console.log("Welcome to Ember Web Player");

let songHtml = "";
songs.forEach((song) => {
    console.log(`Song: ${song.title}, Artist: ${song.artist}, Album: ${song.album}, Duration: ${song.duration}`);
    songHtml += `
    <article class="rail-card">
            <div class="rail-card__art art--1" aria-hidden="true"><img src="${song.cover}" alt="${song.title}" /></div>
            <p class="rail-card__title">${song.title}</p>
            <button type="button" class="mini-play" aria-label="Play ${song.title}">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
            </button>
    </article>
    `
})
document.querySelector('.rail-grid').innerHTML = songHtml;