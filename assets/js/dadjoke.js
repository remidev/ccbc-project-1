//Get dad joke, backup functionality if API Key Burns
function getDadJoke() {

  $.ajax({

    //Dad joke API URL
    url: "https://icanhazdadjoke.com/",
    type: "GET",
    headers: {

      Accept: 'application/json'

    },

  }).then(function (response) {

    //Play response.joke in selected voice
    responsiveVoice.speak(response.joke, "US English Male")

  })
}