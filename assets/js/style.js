var song;
var fft;
var bg;
var snow = [];
var gravity;

$("#Play").on("click", function () {
    toggleSong();
});


function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
        $(".playImg").attr("src", "./assets/images/Play10.png");
    } else {
        $(".playImg").attr("src", "./assets/images/PauseButt.png");
        song.play();
    }
}

function preload() {
    song = loadSound('assets/js/TestSong.mp3');
    // song = loadSound('assets/js/Tremor.mp3'); //past in song here
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight+194);

    // if (canvas < createCanvas(650,850)){
    //     //Resize Line
    // }
}

function setup() {
    bg = loadImage("assets/js/Anime.jpg");
    var canvas = createCanvas(windowWidth, windowHeight+194);
    // var canvas = createCanvas(1920, 1180);
    canvas.parent('LogoContainer');
    gravity = createVector(0, .2);
  
    for (var i = 0; i <1000; i++) {
        var x = random(width);
        var y = random(height);
        snow.push(new Snowflake(x, y));
    }

    angleMode(DEGREES);

      song.play();
      fft = new p5.FFT(.2, 512);

    // mic = new p5.AudioIn();
    // mic.start();
    // fft = new p5.FFT(.2, 512);
    // fft.setInput(mic);
}

function draw() {

    background(bg);
    for (flake of snow) {
        flake.applyForce(gravity);
        flake.update();
        flake.render();
    }

    var spectrum = fft.analyze();

    translate(width / 2, height / 2);

    for (var i = 0; i <= spectrum.length - 200; i++) { //-200
        // console.log(spectrum);
        var spectrum = fft.analyze();
        colorMode(HSB);
        var x = radius * cos(angle);
        var y = radius * sin(angle);
        var amp = spectrum[i];

        var angle = map(i + 235, 0, spectrum.length - 200, 0, 360); //change 2nd 0 to loop //-200
        var radius = map(amp, -(windowHeight+194), windowHeight/10, 100, windowWidth/6.5+100);   
        // var radius = map(amp, -850, 0, 100, 300); //50= bounce height
        //paused size, nounce resistance, normal size, size again?-250, 200, 150, 300,

        stroke(235, 245); // change the circle color
        // curveVertex(x, y);
        line(x - 10, y - 10, x, y);
        // smooth();
    }
    // for (var i = Snowflake.length - 1; i >= 0; i--) {
    //     if (snow[i].offScreen()){
    //         snow.splice(i, 1); // Recycling snow to load faster
    //     }
    // }
}



