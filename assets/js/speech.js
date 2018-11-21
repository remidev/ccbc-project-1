var final_transcript = "";
var recognizing = false;
//IGNORES THE RECORDING IF TRUE
var ignore_onend;

if (!("webkitSpeechRecognition" in window)) {
  showInfo("info_not_supported");
} else {
  var recognition = new webkitSpeechRecognition();
  //set to false if you want stop recording after no speech detected.
  recognition.continuous = false;
  //shows the recognition results as user speaks
  recognition.interimResults = true;

  //handles the recording start event
  recognition.onstart = function () {
    recognizing = true;
    // showInfo("info_speak_now");
    //switch the start button microphone to the animated gif
    $(".micImg").attr("src", "./assets/images/mic_animated.gif");
  };

  //handles the recording error event
  recognition.onerror = function (event) {
    if (event.error == "no-speech") {
      $(".micImg").attr("src", "./assets/images/mic_static.png");
      showInfo("info_no_speech");
      ignore_onend = true;
    }
    if (event.error == "audio-capture") {
      $(".micImg").attr("src", "./assets/images/mic_static.png");
      showInfo("info_no_microphone");
      ignore_onend = true;
    }
    if (event.error == "not-allowed") {
      showInfo("info_denied");
      ignore_onend = true;
    }
  };

  //handles the end of recording event
  recognition.onend = function () {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    $(".micImg").attr("src", "./assets/images/TestMike4.png");
    if (!final_transcript) {
      //   showInfo("info_start");
      return;
    }
  };

  //handles how to parse the result
  recognition.onresult = function (event) {
    // CALL THE API FUNCTION WITH THE EVENT.RESULTS.TRANSCRIPT AS PARAMETER

    // console.log(event.results);
    console.log(event.results[0]);
    if (event.results[0].isFinal) {
      final_transcript += event.results[0][0].transcript;
      //call the emotion API using the recorded text
      getEmotion(final_transcript)
    }
  };
}

$(".speechBtn").on("click", function () {
  startButton();
});

function startButton(event) {
  //pressing the mike button again will end the recording
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = "";
  //default detection to English US
  recognition.lang = "en-US";
  recognition.start();
  ignore_onend = false;
  $(".result").html("");
}

function showInfo(param) {
  switch (param) {
    case "info_not_supported":
      $(".result").html(
        "Speech functionality is not supported in this browser, please install Google Chrome"
      );
      break;
    case "info_denied":
      $(".result").html("Microphone access not permitted");
      break;
    case "info_blocked":
      $(".result").html("Microphone access not permitted");
      break;
    case "info_no_microphone":
      $(".result").html("No microphone detected");
      break;
    case "info_no_speech":
      $(".result").html("No speech detected");
      break;
    default:
      $(".result").html("");
  }
}