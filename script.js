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
    player.yPos = windowHeight - 65;
    player.xPos = windowWidth / 2;
}

// This object stores the data about the player's position and speed
let player = {
    xPos: 0, // x coordinate of player (left and right)
    yPos: 0, // y coordinate of player (up and down)
    speed: 15 // pixels per frame
}

function draw() {
    if (!firstRun) {
        initiliseVariable();
        firstRun = true;
    }
    background(220);
    gameLoop();
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

