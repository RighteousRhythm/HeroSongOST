//define all elements in html page
let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let mute_btn = document.querySelector(".mute-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

//specify global variabls
let track_index = 0;
let isPlaying = false;
let updateTimer;

//creates audio element for player
let curr_track = document.createElement("audio");

//define playlist
let track_list = [
  {
    name: "Crick Hospitality",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Crick_Hospitality.wav",
  },
  {
    name: "The Puppet Queen",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/The_Puppet_Queen.mp3",
  },
  {
    name: "Autumn Court Regality",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Autumn_Court_Regality.mp3",
  },
  {
    name: "Styled Minimalism",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Styled_Minimalism.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  //load new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  //update details
  track_name.textContent = track_list[track_index].name;
  //track_artist.textContent = track_list[track_index].Artist;
  now_playing.textContent = "Track " + (track_index + 1) + " of " + track_list.length;

  //sets an interval of 1000 millisends for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  //move to next track when current track ends
  curr_track.addEventListener("ended", nextTrack);

  if (isPlaying) playTrack();
  else pauseTrack();
}

//function to reset player values to default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContentContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<img src="Images/pause.png" alt="pause"/>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<img src="Images/play.png" alt="play"/>';
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;
  //check if current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    //calculate times
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    //add leading zeros where necessary
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    //display updated times
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
