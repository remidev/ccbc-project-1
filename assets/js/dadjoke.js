function getDadJoke(){
    $.ajax({
        url: "https://icanhazdadjoke.com/",
        type: "GET",
        headers: {
            Accept: 'application/json'
        },
    }).then(function(response){
        console.log(response);
        responsiveVoice.speak(response.joke)
    })
}

$(".testJoke").on("click", function(){
    getDadJoke()
})