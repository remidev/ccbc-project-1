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
      responsiveVoice.speak(response.joke, "US English Male")
    })
  }