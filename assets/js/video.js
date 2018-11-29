var globalVideoId = "BsY0Tazygqk";


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("video id @ player creation: ", toString(globalVideoId))
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: "iXIDtf1wP0g&start_radio=1&list=RDiXIDtf1wP0g",
    paused: "false",
    events: {
      'onReady': onPlayerReady,
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady() {
  console.log("Video Ready");
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

      //retrieve video ID from response object
      globalVideoId = getRandomVideo(response.items)
      player.loadVideoById(globalVideoId);

      //find a way to update player videoId
      // call some function declared below the player object?

    },

    //On unsuccessful query...
    error: function () {

      //tell dad joke
      getDadJoke();

    }
  });
}

function getRandomVideo(arr){
  return arr[Math.floor(Math.random() * arr.length)].id.videoId
}

// function getPlayerState() {
//   player.getPlayerState();
// }

// function pauseVideo() {
//   player.pauseVideo();
// }

// function playVideo() {
//   player.playVideo();
// }

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


  // if (state === 1) {
  //   pauseVideo();
  // } else {
  //   playVideo();
  // }


  // player.pauseVideo();
  // console.log(player.getPlayerState());

  // console.log("player.paused: ",player.paused);
  // if (player.paused == true) {

  //   player.playVideo();
  //   player.paused = false;
  //   console.log("Player.pause: ", player.pause)
  //   console.log("Playing Video");

  //   // otherwise if player is already playing, pause it.
  // } else if (player.paused == false) {

  //   player.pauseVideo();
  //   player.paused = true;
  //   console.log("Player.pause: ", player.pause)
  //   console.log("Paused Video");

  // }
}


//Click Behavior for happy emoji

document.getElementById('dadJoke').onclick = function fun() {
  getDadJoke();

}
document.getElementById('happy').onclick = function fun() {
  // getDadJoke();
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

