import { songs } from "./data/Songs.js";


console.log("Welcome to Ember Web Player");


songs.forEach((song) => {
    console.log(`Song: ${song.title}, Artist: ${song.artist}, Album: ${song.album}, Duration: ${song.duration}`);
})