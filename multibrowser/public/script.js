// script.js

let players = [];

// Function triggered when the YouTube API is ready
function onYouTubeIframeAPIReady() {
  // This will be called when the YouTube API is ready
}

document.getElementById('add-video').addEventListener('click', function () {
  const url = document.getElementById('video-url').value;
  const videoId = extractVideoId(url);

  if (videoId) {
    addVideoToPage(videoId);
  } else {
    alert("Invalid YouTube URL");
  }
});

// Function to extract the video ID from a YouTube URL
function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/([^\/\n\s]+))|youtu\.be\/([^\/\n\s]+))/;
  const matches = url.match(regex);
  return matches ? matches[1] || matches[2] : null;
}

// Function to add the video to the page using the proxy server URL
function addVideoToPage(videoId) {
  const playerContainer = document.createElement('div');
  playerContainer.classList.add('player-container');

  const iframe = document.createElement('iframe');
  iframe.id = `player-${videoId}`;

  // Use the proxy server to route YouTube embed request
  iframe.src = `http://localhost:5000/youtube/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1`;
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  playerContainer.appendChild(iframe);
  document.getElementById('video-container').appendChild(playerContainer);

  const player = new YT.Player(iframe, {
    events: {
      'onReady': onPlayerReady,
    },
  });

  players.push(player);
}

// Function called when a player is ready
function onPlayerReady(event) {
  console.log('Player is ready');
}

// Play all videos when the "Play All" button is clicked
document.getElementById('play-all').addEventListener('click', function () {
  players.forEach(player => {
    player.playVideo();
  });
});

// Pause all videos when the "Pause All" button is clicked
document.getElementById('pause-all').addEventListener('click', function () {
  players.forEach(player => {
    player.pauseVideo();
  });
});

// Handling visibility change (browser window minimize)
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    // Resume playing all videos when the page becomes visible
    players.forEach(player => {
      player.playVideo();
    });
  } else {
    // Pause all videos when the page is not visible
    players.forEach(player => {
      player.pauseVideo();
    });
  }
});
