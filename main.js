song="";

leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose',gotposes)

}

function modelLoaded(){
    console.log("model is loaded")
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20)
        InNumberleftWristY=Number(leftWristY)
        remove_decimals= floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function gotposes(results){
    if(results.length>0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score 
        console.log("scoreLeftWrist="+scoreLeftWrist)
    
    
        leftWristX=results[0].pose.leftWrist.X;
        leftWristY=results[0].pose.leftWrist.Y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY)
    
            rightWristX=results[0].pose.rightWrist.X;
            rightWristY=results[0].pose.rightWrist.Y;
            console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY)
    
    
    }
    }
