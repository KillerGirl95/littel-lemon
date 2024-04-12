"use strict";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bugImage = new Image();
bugImage.src = 'bug_img.jpeg'; 

// variables
let bugX = canvas.width / 2;
let bugY = canvas.height / 2;
let bugWidth = 32;
let bugHeight = 32;
let hoppingInterval = 2000; 
let score = 0;
let isGameRunning = true;
let intervalId; 

function drawBug() {
  ctx.drawImage(bugImage, bugX, bugY, bugWidth, bugHeight);
}

function clearAndDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBug();
  document.getElementById('score').textContent = `Score: ${score}`;
}

function hopBug() {
  if (isGameRunning) {
    bugX = Math.random() * (canvas.width - bugWidth);
    bugY = Math.random() * (canvas.height - bugHeight);
    clearAndDraw();
  }
  console.log("hopbug exec>>");       // debug
}


function resetScore() {
    score = 0;
    hoppingInterval = 2000; 
    resetInterval();
  }
  
  function resetSpeed() {
    hoppingInterval = 1000; // interval reset to 1000ms
    resetInterval();
  }

// reset buttons
document.getElementById('resetScore').addEventListener('click', resetScore);
document.getElementById('resetSpeed').addEventListener('click', resetSpeed);



// starting interval to begin game 
intervalId= setInterval(hopBug, hoppingInterval);

function resetInterval() {
    clearInterval(intervalId); // Clear existing interval
    intervalId = setInterval(hopBug, hoppingInterval); // new interval with modified interval
  }

canvas.addEventListener('click', (event) => {
    if (isGameRunning 
        && event.offsetX >= bugX 
        && event.offsetX <= bugX + bugWidth 
        && event.offsetY >= bugY 
        && event.offsetY <= bugY + bugHeight) 
    {
        score++;
        hoppingInterval -= 75; 
        resetInterval();
        hopBug();
    
    }
    console.log("interval>>",hoppingInterval);        // debug 
  });