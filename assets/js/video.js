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

  console.log("Query URL: " + queryURL);


  $.ajax({
    url: queryURL,
    method: "GET",

    //On successful query...
    success: function (response) {

      //retrieve video ID from response object
      videoId = response.items[0].id.videoId;
      //Set Iframe video ID 

    },

    //On unsuccessful query...
    error: function () {

      //tell dad joke
      getDadJoke();

    }
  })
}

//Get dad joke, read dad joke
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
