/* Main game file: main.js */
/* Game: You vs the platformer */
/* Authors: Jaydrien*/
/* Description: Survive the platformer and the boss's wrath.*/
/* Citations: Copilot - distance formula, key tracking, basic drawing */
/* Note: If you use significant AI help you should cite that here as well */
// Copilot was used to finish the gameOver function, distance formulas, dashing function, invulnerability timer, and enemyAttackTimer function
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */

import "./style.css";

import { GameInterface } from "simple-canvas-library";

let gi = new GameInterface();

/* Constants: Named constants to avoid magic numbers */
const mediumModeStart = 30; // seconds when medium difficulty begins
const hardModeStart = 60; // seconds when hard difficulty begins
const maxHearts = 5; // maximum health
const easyGreenCount = 3; // health pickups in easy mode
const mediumGreenCount = 1; // health pickups in medium mode
const hardGreenCount = 1; // health pickups in hard mode
const easyRedCount = 0; // traps in easy mode
const mediumRedCount = 1; // traps in medium mode
const hardRedCount = 4; // traps in hard mode
const collectibleRadius = 8; // size of collectible circles
/* Variables: Top-Level variables defined here are used to hold game state */
//hp amount and invulnerability timer
let iframe = 0;
let hearts = 3;
//player movement shenanigans
let px = 100;
let py = 300;
let ps = 12;
//enemy x and y positions
let bx = 750;
let by = 300;
let blipy = 0;
let mbx1 = 0;
let mbx2 = 0;
let mby1 = 0;
let mby2 = 0;
let timeSurvived = 0;
//enemy attack list and timer
let enemyAttackTimer = 0;
let attack4Unlocked = false; // track if hard mode attack is unlocked
// Begin generated code (AI-assisted): collectible arrays
let greenCircles = []; // health pickups
let redCircles = []; // trap circles
// End generated code
// Begin generated code (AI-assisted): enemy attack list with iteration
const level = [
  { id: 1, active: false },
  { id: 2, active: false },
  { id: 3, active: false },
];


function resetlevel() {
  for (let i = 0; i < level.length; i++) {
    level[i].active = false;
  }
}

function chooseAttack() {
  resetlevel();
  const pick = Math.floor(Math.random() * level.length);
  level[pick].active = true;
}

function isActive(id) {
  for (let i = 0; i < level.length; i++) {
    if (level[i].id === id) {
      return level[i].active;
    }
  }
  return false;
}

// Begin generated code (AI-assisted): spawn collectibles based on difficulty
function spawnCollectibles(width, height) {
  greenCircles = [];
  redCircles = [];

  // Determine difficulty based on time survived
  let greenCount = easyGreenCount; // default easy
  let redCount = easyRedCount;

  if (timeSurvived > hardModeStart) {
    // Hard mode
    greenCount = hardGreenCount;
    redCount = hardRedCount;
  } else if (timeSurvived > mediumModeStart) {
    // Medium mode
    greenCount = mediumGreenCount;
    redCount = mediumRedCount;
  }

  // Spawn green circles
  for (let i = 0; i < greenCount; i++) {
    greenCircles.push({
      x: Math.random() * (width - 40) + 20,
      y: Math.random() * (height - 40) + 20,
      radius: collectibleRadius,
    });
  }

  // Spawn red circles
  for (let i = 0; i < redCount; i++) {
    redCircles.push({
      x: Math.random() * (width - 40) + 20,
      y: Math.random() * (height - 40) + 20,
      radius: collectibleRadius,
    });
  }
}
// End generated code
/* Drawing Functions */
/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */
gi.addDrawing(function ({ctx, width, height, elapsed, stepTime }) {
  // Your drawing code here...
  // draw player
  
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(px, py, 10, 0, Math.PI * 2);
  ctx.fill();
});

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

/* Mr. Hinkle showed how to use a keysDown object to track
which keys are currently down with separate keydown and keyup
handlers and then an addDrawing for smooth updates :)
Comment also by Mr. Hinkle because he tries to model
best practices */
let keysDown = {
  // an object to keep track of what keys are currently pressed...
  w: false,
  a: false,
  s: false,
  d: false,
  // fill in...
};
gi.addHandler("keydown", function ({ event, x, y }) {
  keysDown[event.key] = true;
  console.log("keysDown:", keysDown);
});
gi.addHandler("keyup", function ({ event, x, y }) {
  keysDown[event.key] = false;
  console.log("keysDown:", keysDown);
});
// heart and time display function
gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  // Your drawing code here...
  ctx.fillStyle = "green";
  ctx.font = "20px Arial";
  ctx.fillText(`Health - ${hearts}`, 20, 20);
  ctx.fillText(`Time Survived - ${timeSurvived.toFixed(2)}`, width / 2, 20);
  if (timeSurvived <= mediumModeStart) {
    ctx.fillText(`Easy`, 20, 40);
  } else if (timeSurvived >= mediumModeStart && timeSurvived <= hardModeStart) {
    ctx.fillStyle = "orange";
    ctx.fillText(`Medium`, 20, 40);
    ctx.fillText(`Don't collect the red circles!`, 20, 60);
  } else {
    ctx.fillStyle = "red";
    ctx.fillText(`Hard`, 20, 40);
  }
  if (timeSurvived <= mediumModeStart) {
    ctx.fillStyle = "blue";
    ctx.fillText(`Use WASD or Arrow keys to move!`, width / 2 - 100, height - 20);
  }
});

function damage() {
  if (iframe <= 0) {
    hearts -= 1;
    iframe = 100;
  }
}
// AI generated code for boss collision detection
gi.addDrawing(function ({ stepTime }) {
  const dxB = px - bx;
  const dyB = py - by;
  const distB = Math.sqrt(dxB * dxB + dyB * dyB);
  const playerRadius = 10; // same as drawing radius for player
  const bossRadius = 50; // boss drawing radius
  if (distB < playerRadius + bossRadius) {
    damage();
  }
});
// update invulnerability timer
function iframeTimer(stepTime) {
  if (iframe > 0) {
    iframe -= stepTime / 10;
    if (iframe < 0) iframe = 0;
  }
}
// call iframeTimer every frame to decrease iframe
gi.addDrawing(function ({ stepTime }) {
  iframeTimer(stepTime);
});
// execute the game over. Game over!

// game over function
function gameOver(ctx, width, height) {
  ctx.fillStyle = "grey";
  ctx.font = "50px Arial";
  ctx.fillText(`Game Over...`, width / 5, height / 2);
  gi.stop();
}
// update timeSurvived
gi.addDrawing(function ({ stepTime }) {
  timeSurvived += stepTime / 1000;

  // Begin generated code (AI-assisted): unlock attack 4 after 10 seconds
  // Add a 4th attack to the array when player survives to medium mode
  if (timeSurvived > mediumModeStart && !attack4Unlocked) {
    level.push({ id: 4, active: false });
    attack4Unlocked = true;
    console.log("Medium mode unlocked! Attack 4 added to pool.");
  }
  // End generated code
});
// level' data to default positions
function updateEnemylevel(width, height, stepTime) {
  iframe = 50;
  iframeTimer(stepTime);
  if (!isActive(2)) {
    blipy = -10;
  }
  if (!isActive(1)) {
    bx = width / 2;
    by = height / 2;
  }
  if (!isActive(3)) {
    mbx1 = width / 4;
    mby1 = -20;
    mbx2 = width / 1.25;
    mby2 = -20;
  }
}
// attack timer - update the enemy attack timer and select new level
gi.addDrawing(function ({ stepTime, width, height }) {
  updateEnemyAttackTimer(stepTime, width, height);
});
function updateEnemyAttackTimer(stepTime, width, height) {
  if (enemyAttackTimer > 0) {
    enemyAttackTimer -= stepTime / 10;
  }
  if (enemyAttackTimer <= 0) {
    resetlevel();
    updateEnemylevel(width, height, stepTime);
    chooseAttack();
    spawnCollectibles(width, height); // spawn collectibles with each attack
    enemyAttackTimer = 500;
  }
}
// handle motion in animation code

gi.addDrawing(function ({ stepTime }) {
  // runs 60 times a second...
  if (keysDown.w || keysDown.ArrowUp) {
    // is the w key still down?
    py -= (ps * 10) / stepTime;
  }
});
gi.addDrawing(function ({ stepTime }) {
  // runs 60 times a second...
  if (keysDown.s || keysDown.ArrowDown) {
    // is the s key still down?
    py += (ps * 10) / stepTime;
  }
});
gi.addDrawing(function ({ stepTime }) {
  // runs 60 times a second...
  if (keysDown.d || keysDown.ArrowRight) {
    // is the d key still down?
    px += (ps * 10) / stepTime;
  }
});
gi.addDrawing(function ({ stepTime }) {
  // runs 60 times a second...
  if (keysDown.a || keysDown.ArrowLeft) {
    // is the a key still down?
    px -= (ps * 10) / stepTime;
  }
});
gi.addDrawing(function ({ stepTime, width, height }) {
  //speed reset
  if (ps > 12) {
    ps -= stepTime / 10;
    if (ps < 12) {
      ps = 12;
    }
    //boundarys
  }
  if (px >= width) {
    px = width;
  }
  if (px <= 0) {
    px = 0;
  }
  if (py >= height) {
    py = height;
  }
  if (py <= 0) {
    py = 0;
  }
});
// End generated code

/* Run the game */
gi.run();
