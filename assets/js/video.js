// Variable to hold video ID, initialized with placeholder
var globalVideoId = "BsY0Tazygqk";


// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Create an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {

    //Width & Height set to 0 to hide player
    height: '0',
    width: '0',
    videoId: "iXIDtf1wP0g&start_radio=1&list=RDiXIDtf1wP0g",
    paused: "false",
    events: {
      'onReady': onPlayerReady,
    }

  });
}

function onPlayerReady() {
  console.log("Video Ready");
}

//Select random video ID from response items
function getRandomVideo(arr) {
  return arr[Math.floor(Math.random() * arr.length)].id.videoId
}

//Function to query youtube api, search for video with query "emotion + music"
function videoQuery(emotion) {

  //Query object for URL parameters
  query = {

    part: "snippet",
    q: emotion + " music",
    maxResults: "1000",
    safeSearch: "strict",
    videoEmbeddable: "true",
    videoLicense: "creativeCommon",
    relevanceLanguage: "en",
    type: "video",
    key: "AIzaSyB5hLDO-1T6eCCn1sA7zwJmq-wWwpRVzrw"

  }

  var baseURL = "https://www.googleapis.com/youtube/v3/search?";

  //Append parameters to base URL
  var queryURL = baseURL + jQuery.param(query);

  //Log query URL
  console.log("Query URL: " + queryURL);

  //ajax GET request
  $.ajax({

    url: queryURL,
    method: "GET",

    //On successful query...
    success: function (response) {

      //retrieve random video ID from response object
      globalVideoId = getRandomVideo(response.items)
      // Load video by retrieved id
      player.loadVideoById(globalVideoId);

    },

    //On unsuccessful query...
    error: function () {

      //tell dad joke
      getDadJoke();

    }
  });
}


//Play / Pause button behavior
document.getElementById('Play').onclick = function fun() {

  console.log(player.getPlayerState());

  state = player.getPlayerState();

  if (state == 1) {
    $(".playImg").attr("src", "./assets/images/Play10.png");
    player.pauseVideo();
    console.log("Pause");

  } else if (state == 2) {
    $(".playImg").attr("src", "./assets/images/PauseButt.png");
    player.playVideo();
    console.log("Play");

  }
}


//Click Behavior for menu buttons

document.getElementById('dadJoke').onclick = function fun() {
  getDadJoke();
}
document.getElementById('happy').onclick = function fun() {
  videoQuery("happy");
}
document.getElementById('frown').onclick = function fun() {
  videoQuery("sad");
}
document.getElementById('running').onclick = function fun() {
  videoQuery("workout");
}
document.getElementById('glasses').onclick = function fun() {
  videoQuery("study");
}
document.getElementById('sample').onclick = function fun() {
  videoQuery("Mako - Beam (Original) [Free]");
  //https://www.youtube.com/watch?v=YrvlVLLabro&list=RDYrvlVLLabro&start_radio=1
}