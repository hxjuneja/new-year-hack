
function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var webcamError = function(e) {
    alert('Webcam error!'+e, e);

};

var video = $('#webcam')[0];
if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: false, video: true}, function(stream) {
        video.src = stream;
    }, webcamError);
} else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia({audio:false, video:true}, function(stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        update();
    }, webcamError);
} else {
    //video.src = 'video.webm'; // fallback.
}

var canvas = $("#tut")[0];
$(canvas).delay(600).fadeIn();
var ctx = canvas.getContext('2d');

var canvasSource = $("#canvas-source")[0];
var contextSource = canvasSource.getContext('2d');
contextSource.translate(canvasSource.width, 0);
contextSource.scale(-1, 1);
var set = false;
var revealed = Object.create(null);
dcolor = "green";

function update(){

    drawVideo();
    findcolor();
    requestAnimFrame(update);
}

function drawVideo(){
    // image on source canvas 
    contextSource.drawImage(video, 0, 0, video.width, video.height);

    if(!set){
    $("#tut").css({"background-image":"url("+ "static/download2.jpg" +")"});
    $("#tut").css({"background-size":"100% 100%"});
    set = true;
    }
}

function findcolor(){
    var width = canvasSource.width;
    var height = canvasSource.height;

    //Get webcam image data
    var sourceData = contextSource.getImageData(0, 0, width, height);
    // create a ImageData instance to receive the blended result
    var targetData = contextSource.createImageData(width, height);
    replaceImg(targetData.data, sourceData.data);
    ctx.putImageData(targetData, 0, 0);

}

$("#white").click(function(){
    dcolor = "white";
    $('#header').text("To Reveal the message use white color OR choose other colors from the dropdown");
});

$("#green").click(function(){
    dcolor = "green";
    $('#header').text("To Reveal the message use green color OR choose other colors from the dropdown");
});
$("#black").click(function(){
    dcolor = "black";
    $('#header').text("To Reveal the message use black color OR choose other colors from the dropdown");
});

//============= Helper functions ============================

function replaceImg(target, data1){
    var data;
    for (var i = 0, j = 0; i < data1.length; j++, i += 4){
        var hsl = rgb2hsl(data1[i], data1[i + 1], data1[i + 2]);
        var h = hsl[0], s = hsl[1], l = hsl[2];

        if (j in revealed) {
            target[i] = 0;
            target[i+1] = 0;
            target[i+2] = 0;
            target[i + 3] = 0;
            continue;
        }
 
        if(dcolor =="white"){
            if (h >= 0 && h <= 360 && s >= 0 && s <= 70 && l >= 83 && l <= 100){ // white
                target[i] = 0;
                target[i+1] = 0;
                target[i+2] = 0;
                target[i + 3] = 0;
                revealed[j] = true;
            }
            else
            {
                target[i] = data1[i];
                target[i+1] = data1[i+1];
                target[i+2] = data1[i+2];
                target[i+3] = 0xFF;
            }
        }
        if(dcolor == "black"){
            if (h >= 0 && h <= 360 && s >= 55 && s <= 90 && l >= 0 && l <= 15){ // black
                target[i] = 0;
                target[i+1] = 0;
                target[i+2] = 0;
                target[i + 3] = 0;
                revealed[j] = true;
            }
            else
            {
                target[i] = data1[i];
                target[i+1] = data1[i+1];
                target[i+2] = data1[i+2];
                target[i+3] = 0xFF;
            }
        }
        if(dcolor == "green"){

            if (h >= 90 && h <= 160 && s >= 25 && s <= 90 && l >= 20 && l <= 75){ //green
                target[i] = 0;
                target[i+1] = 0;
                target[i+2] = 0;
                target[i + 3] = 0;
                revealed[j] = true;
            }
            else
            {
                target[i] = data1[i];
                target[i+1] = data1[i+1];
                target[i+2] = data1[i+2];
                target[i+3] = 0xFF;
            }
        }
    }
}

window.requestAnimFrame = (function () {
                return window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                        function (callback) {
                                window.setTimeout(callback, 1000 / 60);
                        };
        })();

function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;

    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h, s, l;

    if (max == min) {
      h = 0;
    } else if (r == max) {
      h = (g - b) / delta;
    } else if (g == max) {
      h = 2 + (b - r) / delta;
    } else if (b == max) {
      h = 4 + (r - g) / delta;
    }

    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }

    l = (min + max) / 2;
    if (max == min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  }
