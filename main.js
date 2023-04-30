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

//Unique Play buttons
  /*let playpause_btn1 = document.querySelector(".playpause-track1");
  let playpause_btn2 = document.querySelector(".playpause-track2");
  let playpause_btn3 = document.querySelector(".playpause-track3");
  let playpause_btn4 = document.querySelector(".playpause-track4");
  let playpause_btn5 = document.querySelector(".playpause-track5");
  let playpause_btn6 = document.querySelector(".playpause-track6");
  let playpause_btn7 = document.querySelector(".playpause-track7");
  let playpause_btn8 = document.querySelector(".playpause-track8");
  let playpause_btn9 = document.querySelector(".playpause-track9");*/

let button_list = [
  {playpause_btn1 : document.querySelector(".playpause-track1")},
  {playpause_btn2 : document.querySelector(".playpause-track2")},
  {playpause_btn3 : document.querySelector(".playpause-track3")},
  {playpause_btn4 : document.querySelector(".playpause-track4")},
  {playpause_btn5 : document.querySelector(".playpause-track5")},
  {playpause_btn6 : document.querySelector(".playpause-track6")},
  {playpause_btn7 : document.querySelector(".playpause-track7")},
  {playpause_btn8 : document.querySelector(".playpause-track8")},
  {playpause_btn9 : document.querySelector(".playpause-track9")},
  {playpause_btn10 : document.querySelector(".playpause-track10")},
];

//specify global variabls
let track_index = 0;
let isPlaying = false;
let updateTimer;

//creates audio element for player
let curr_track = document.createElement("audio");

//define playlist
let track_list = [
  {
    name: "The Puppet Queen",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/The_Puppet_Queen.mp3",
  },
  {
    name: "Crick Hospitality",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Crick_Hospitality.wav",
  },
  {
    name: "Defend the Defenseless",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Defend_the_Defenseless.mp3",
  },
  {
    name: "Rayguns & Katanas",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Rayguns_&_Katanas-001.wav",
  },
  {
    name: "Autumn Court Regality",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Autumn_Court_Regality.wav",
  },
  {
    name: "Styled Minimalism",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Styled_Minimalism.mp3",
  },
  {
    name: "Emergent",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/Emergent.wav",
  },
  {
    name: "Podcast Sample #1",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/ST_Podcast_Audio_Bounce.mp3",
  },
  {
    name: "Podcast Sample #2",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/DT_Podcast_Audio_Bounce.mp3",
  },
  {
    name: "Sound Design Sample #2",
    Artist: "Timothy Vujicic",
    //image: "image url",
    path: "Audio/CrowStorm.wav",
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
  curr_track.addEventListener("ended", nextTrack, playTrack);

 /* if (isPlaying) playTrack();
  else pauseTrack();*/
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
  x = track_index;
  button_list[x].innerHTML = '<img src="Images/pause.png" alt="pause"/>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<img src="Images/play.png" alt="play"/>';
  x = track_index;
  button_list[x].innerHTML = '<img src="Images/play.png" alt="play"/>';
}

function ppSpecTrack(x) {
  if (x == track_index) {
    if (!isPlaying) {
      playTrack();
    }
    else pauseTrack();
  }
  else {
    track_index = x;
    loadTrack(track_index);
    playTrack();
  }
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
  playTrack();
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
