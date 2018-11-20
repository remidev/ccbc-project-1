var song;
var fft;
var bg;
var snow = [];
var gravity;

$("#openingPage").on("click", function(){

});

$("#Play").on("click", function () {
    toggleSong();
});

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    // song = loadSound('assets/js/beat.mp3');
    song = loadSound('assets/js/Tremor.mp3'); //past in song here
}


function setup() {
    bg = loadImage("assets/js/GoldenTime.jpg");
    var canvas =createCanvas(1920, 1180);
    canvas.parent('LogoContainer');
    gravity = createVector(0, .2);
    for (var i=0; i<1250; i++){
        var x = random(width);
        var y = random(height);
        snow.push(new Snowflake(x,y));
    }
   
    angleMode(DEGREES);
    song.play();
    fft = new p5.FFT(.2, 512);
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
        var spectrum = fft.analyze();
        colorMode(HSB);
        var x = radius * cos(angle);
        var y = radius * sin(angle);
        var amp = spectrum[i];

        var angle = map(i + 235, 0, spectrum.length - 200, 0, 360); //change 2nd 0 to loop //-200
        var radius = map(amp, -850, 0, 100, 300); //50= bounce height
        //paused size, nounce resistance, normal size, size again?-250, 200, 150, 300,

        stroke(i, 255, 255);
        // curveVertex(x, y);
        line(x-10,y-10,x,y);

        // smooth();

    }

    // for (var i = Snowflake.length - 1; i >= 0; i--) {
    //     if (snow[i].offScreen()){
    //         snow.splice(i, 1); // Recycling snow to load faster
    //     }
    // }


}



