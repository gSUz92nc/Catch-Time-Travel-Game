
let flag_bg;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

// This function is called when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Self explanatory
    initiliseVariable(); // This function is called when the window is resized to re-initilise the variables, this is useful for responsive design
}


let firstRun = false; // This variable is used to check if the game has been run before and if not, run the initiliseVariable() function

// This function is called when the game is run for the first time and when the window is resized
function initiliseVariable() {

    flag_bg = loadImage("the_reapist.jpg");

    player.yPos = windowHeight - 65;
    player.xPos = windowWidth / 2;
}

// This object stores the data about the player's position and speed
let player = {
    xPos: 0, // x coordinate of player (left and right)
    yPos: 0, // y coordinate of player (up and down)
    speed: 15 // pixels per frame
}

let gameState = "menu"; // This variable stores the current state of the game, this is used to determine what to draw on the screen

// This function is called every frame
function draw() {
    if (!firstRun) {
        initiliseVariable();
        firstRun = true;
    }
    if (gameState == "menu") {
        drawMenu();
    } else {
        background(220);
        gameLoop();
    }
}

function drawMenu() {
    background(flag_bg);
    fill(66, 66, 255);
    textAlign(CENTER);
    textSize(50);
    text("Game (fix text)", windowWidth / 2, windowHeight / 2 - 150);
    drawButton("Play", windowWidth / 2, windowHeight / 2 - 50);
}   

// This function draws a button with the given text and position
function drawButton() {
    // Create a new button
    var playButton = document.createElement("button");

    // Set the button's text
    playButton.innerHTML = "Play";

    // Set the button's position and style
    playButton.style.position = "absolute";
    playButton.style.left = window.innerWidth / 2 + "px";
    playButton.style.top = window.innerHeight / 2 + "px";

    // Add an event listener to the button
    playButton.addEventListener("click", function() {
        // The "Play" button was pressed
        gameState = "game";
    });

    // Add the button to the document
    document.body.appendChild(playButton);
}

function gameLoop() {   
    playerMovement();
    drawPlayer(player.xPos, player.yPos);
}

function playerMovement() {
    if (keyIsDown(LEFT_ARROW)) {
        player.xPos -= player.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.xPos += player.speed;
    }
}



function drawPlayer(xPos, yPos) {
    ellipse(xPos, yPos, 50, 50);
}

