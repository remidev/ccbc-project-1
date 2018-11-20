var globalVideoId = "BsY0Tazygqk";

//Function to query youtube api, search for video with query "emotion + music"
function videoQuery(emotion) {

  //Query object for URL parameters
  query = {

    part: "snippet",
    q: emotion + " music",
    maxResults: "1",
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
      globalVideoId = response.items[0].id.videoId;
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
    height: '400',
    width: '400',
    videoId: "BsY0Tazygqk",
    paused: "true",
    events: {
      'onReady': onPlayerReady,
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady() {
  console.log("Video Ready");
}




//Play / Pause button behavior 
document.getElementById('playButton').onclick = function fun(playerStatus) {
  // playerStatus attribute of player, -1 = not started,  1 = playing, 2 = paused.

  // if player status is -1(not started) or 2 (paused), play the video
  if (playerStatus == 2 || -1) {

    player.playVideo();
    console.log("Playing Video");

    // otherwise if player is already playing, pause it. 
  } else if (playerStatus == 1) {

    player.pauseVideo();
    console.log("Paused Video");

  }
}


//Click Behavior for happy emoji
document.getElementById('happy').onclick = function fun() {

  videoQuery("happy");

}


//Get dad joke, backup functionality if API Key Burns
function getDadJoke() {
  $.ajax({
    url: "https://icanhazdadjoke.com/",
    type: "GET",
    headers: {
      Accept: 'application/json'
    },
  }).then(function (response) {
    console.log(response);
    responsiveVoice.speak(response.joke)
  })
}