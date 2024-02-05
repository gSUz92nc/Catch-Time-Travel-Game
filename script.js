let flag_bg; // This variable stores the background image for the menu
let score = 0; // This variable stores the player's score
let miss = 0;

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

    flag_bg = loadImage("/images/the_reapist.jpg");

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

// This function deletes all HTML elements on the screen
function deleteHTMLElements() {
    const elements = document.querySelectorAll("*");
    elements.forEach(element => element.remove());
}

// This function is called when the game state changes
function changeGameState(newState) {
    gameState = newState;
    deleteCustomHTMLElements();
}

// This function deletes HTML elements created by our code
function deleteCustomHTMLElements() {
    const elements = document.querySelectorAll("button"); // Select only the buttons created by our code
    elements.forEach(element => element.remove());
}

function drawMenu() {
    background(flag_bg);
    fill(66, 66, 255);
    textAlign(CENTER);
    textSize(50);
    text("Game Name Text", windowWidth / 2, windowHeight / 2 - 150);
    drawButton("Play", windowWidth / 2, windowHeight / 2 - 50);
}   

let playButtonCreated = false; // Variable to track if the play button is already created

// This function draws a button with the given text and position
function drawButton() {
    if (!playButtonCreated) { // Check if the play button is already created
        // Create a new button
        var playButton = document.createElement("button");

        // Set the button's text
        playButton.innerHTML = "Play";

        // Set the button's position and style
        playButton.style.position = "fixed";
        playButton.style.left = "50%";
        playButton.style.top = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        playButton.style.padding = "10px 20px";
        playButton.style.border = "none";
        playButton.style.borderRadius = "5px";
        playButton.style.backgroundColor = "#4CAF50";
        playButton.style.color = "white";
        playButton.style.fontSize = "16px";
        playButton.style.cursor = "pointer";
        playButton.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.3)";

        // Add an event listener to the button
        playButton.addEventListener("click", function() {
            // The "Play" button was pressed
            changeGameState("game")
        });

        // Add the button to the document
        document.body.appendChild(playButton);

        playButtonCreated = true; // Set the flag to indicate that the play button is created
    }
}

// This function is called every frame when the game state is "game"
function gameLoop() {
    playerMovement();
    spawnObjects(0.02);
    drawPlayer(player.xPos, player.yPos);
}

let acceleration = 1; // The acceleration value
let maxSpeed = 35; // The maximum speed value
currentDirection = "none"; // The current direction of the player

// This function is called every frame to move the player
function playerMovement() {
    if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && player.xPos - 50 > 0) {
        if (currentDirection !== "left") {
            player.speed = 0; // Reset speed when changing direction
            currentDirection = "left";
        }
        player.speed = Math.min(player.speed + acceleration, maxSpeed); // Increase speed with acceleration
        player.xPos -= player.speed;
    } else if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && player.xPos + 50 < width) {
        if (currentDirection !== "right") {
            player.speed = 0; // Reset speed when changing direction
            currentDirection = "right";
        }
        player.speed = Math.min(player.speed + acceleration, maxSpeed); // Increase speed with acceleration
        player.xPos += player.speed;
    } else if (mouseIsPressed && mouseY > windowHeight / 2) {
        // If the player is using a touch screen, move the player based on the touch position
        player.xPos = mouseX;
    } else {
        player.speed = 0; // Reset speed when no arrow key is pressed
        currentDirection = "none";
    }
}

// This function draws the player
function drawPlayer(xPos, yPos) {
    fill(255, 255, 255);
    ellipse(xPos, yPos, 50, 50);
}


let onScreenObjects = []; // This array is used for storing data about the objects for collision detection and movement
let lastSpawnTime = 0; // Variable to store the timestamp of the last object spawn, used for making sure objects aren't spawned too close together

// This function spawns things that the player has to catch. It's called every frame and spawns a new object based off probability
function spawnObjects(probability) {
    const currentTime = Date.now();
    if (Math.random() < probability & currentTime - lastSpawnTime > 500) {
        const timeSinceLastSpawn = currentTime - lastSpawnTime;
        const spawnXPos = timeSinceLastSpawn < 1000 ? (Math.random() - 0.5) * windowWidth / 20 + player.xPos : Math.random() * (windowWidth - 100) + 50;
        onScreenObjects.push({
            xPos: spawnXPos,
            yPos: 0,
            speed: 5
        });
        lastSpawnTime = currentTime;
    }
    drawObjects();

    // Remove objects that are off the screen
    for (let i = 0; i < onScreenObjects.length; i++) {
        if (onScreenObjects[i].yPos > windowHeight + 100) {
            onScreenObjects.splice(i, 1);
            miss++; 
        }
    }

    // Check for collision
    for (let i = 0; i < onScreenObjects.length; i++) {
        if (onScreenObjects[i].yPos > player.yPos - 50 && onScreenObjects[i].yPos < player.yPos + 50) {
            if (onScreenObjects[i].xPos > player.xPos - 50 && onScreenObjects[i].xPos < player.xPos + 50) {
                score++;
                onScreenObjects.splice(i, 1);
            }
        }
    }
}

// This function draws the objects
function drawObjects() {
    for (let i = 0; i < onScreenObjects.length; i++) {
        onScreenObjects[i].yPos += onScreenObjects[i].speed;
        fill(255, 0, 0);
        ellipse(onScreenObjects[i].xPos, onScreenObjects[i].yPos, 50, 50);
    }
}