const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for (maybe) gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
}
var character = document.getElementById("character");
var block = document.getElementById("block");
var counter=0;
function jump(){
    if(character.classList == "animate"){return}
    character.classList.add("animate");
    setTimeout(function(){
        character.classList.remove("animate");
    },500);
}
var checkDead = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
        block.style.animation = "none";
        console.log("score "+Math.floor(counter/100));
        counter=0;
        block.style.animation = "block 1s infinite linear";
    }else{
        counter++;
        
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
    }
}, 10);
navigator.getUserMedia=navigator.getUserMedia || navigator.getUserMedia;

const video=document.querySelector("#video");
const canvas=document.querySelector("#canvas");
const context= canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status=>{
        if(status){
            navigator.getUserMedia({video:{}},stream=>{
                        video.srcObject=stream;
                        setInterval(runDetection,800);
                    }
                   ,
            err=>console.log(err)
            
            );
        }
        else{
            console.log("please enable video");
        }
    })
function runDetection(){
    model.detect(video).then(prediction => {
        console.log(prediction);
        model.renderPredictions(prediction,canvas,context,video);
        if(prediction.length > 0){
            jump();
        }else{
          //  console.log("raise");
        }
    })
}

handTrack.load(modelParams).then(lmodel=> {
    model=lmodel;
})