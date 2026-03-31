/* Main game file: main.js */
/* Game: You vs the platformer */
/* Authors: Jaydrien*/
/* Description: Survive the platformer and the boss's wrath.*/
/* Citations: Copilot - distance formula, key tracking, basic drawing */
/* Note: If you use significant AI help you should cite that here as well */
// Copilot was used to finish the gameOver function, distance formulas, dashing function, invulnerability timer, and enemyAttackTimer function
// Copilot was used to implement jumping controls with gravity and ground collision
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */

import "./style.css";
import TileMap from "./level.js";
import { GameInterface } from "simple-canvas-library";

const levelMap = new TileMap(64);
let gi = new GameInterface({
  canvasSize: { width: levelMap.getWidth(), height: levelMap.getHeight() },
});

/* Constants: Named constants to avoid magic numbers */
const mediumModeStart = 30; // seconds when medium difficulty begins
/* Variables: Top-Level variables defined here are used to hold game state */
//hp amount and invulnerability timer
let iframe = 0;
let hearts = 3;
// Player object holding all position, velocity, and physics parameters
let playerControls = {
  x: 100, // horizontal position
  y: 300, // vertical position
  vx: 0, // horizontal velocity
  vy: 0, // vertical velocity
  speed: 0.5, // horizontal movement speed
  drag: 0.95, // horizontal drag for smoother stopping
  gravity: 0.25, // gravity strength - ADJUST THIS to change how fast player falls
  jumpStrength: -8, // jump velocity (negative because up) - ADJUST THIS to change jump height
  onGround: false, // track if player is on ground
  radius: 10, // player drawing radius
  maxSpeed: 5, // maximum horizontal speed
};
// End AI-generated code
let timeSurvived = 0;
//enemy attack list and timer
const level = [
  { id: 1, active: false },
  { id: 2, active: false },
  { id: 3, active: false },
];
let enemyAttackTimer = 0;
function resetLevel() {
  for (let i = 0; i < level.length; i++) {
    level[i].active = false;
  }
}
function isActive(id) {
  for (let i = 0; i < level.length; i++) {
    if (level[i].id === id) {
      return level[i].active;
    }
  }
  return false;
}
/* Drawing Functions */
/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */
// TODO: Player physics update

gi.addDrawing(function ({ ctx }) {
  levelMap.drawMap(ctx);
});

gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  // Your drawing code here...
  // draw player
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(
    playerControls.x,
    playerControls.y,
    playerControls.radius,
    0,
    Math.PI * 2,
  );
  ctx.fill();
});
// We compute the player edge positions each frame and use them for tile collision.
// The player itself is drawn as a circle, but collision checks treat it like a small box
// around the circle so we can test against tile rows/columns cleanly.

// - Apply gravity to pull player down
// - Handle horizontal movement with A/D keys
// - Allow jumping with W key only when on ground
// - Check collisions against nearby tiles in the direction of motion
// - Prevent player from going outside canvas boundaries

/**
 * Updates the player's physics and movement each frame.
 * @param {object} params - The drawing parameters.
 * @param {number} params.stepTime - Time elapsed since last frame.
 * @param {number} params.width - Canvas width.
 * @param {number} params.height - Canvas height.
 */
function updatePlayer({ stepTime, width, height }) {
  const tileSize = levelMap.tileSize;

  // Handle horizontal movement with A/D keys
  if (
    !(keysDown.a || keysDown.ArrowLeft || keysDown.d || keysDown.ArrowRight) &&
    Math.abs(playerControls.vx) < 0.2
  ) {
    playerControls.vx = 0;
  }
  if (playerControls.vx > playerControls.maxSpeed) {
    playerControls.vx = playerControls.maxSpeed;
  }
  if (playerControls.vx < -playerControls.maxSpeed) {
    playerControls.vx = -playerControls.maxSpeed;
  }
  if (keysDown.a || keysDown.ArrowLeft) {
    playerControls.vx -= playerControls.speed;
  }
  if (keysDown.d || keysDown.ArrowRight) {
    playerControls.vx += playerControls.speed;
  }

  // Apply horizontal movement first.
  // This moves the player side-to-side, then checks only the left/right edge
  // against any solid tiles the player is now overlapping.
  playerControls.vx *= playerControls.drag;
  playerControls.x += playerControls.vx;

  // Compute the player's current hitbox edges after horizontal movement.
  // Using +1 / -1 makes the tile collision tests slightly smaller than the full circle.
  let left = playerControls.x - playerControls.radius + 1;
  let right = playerControls.x + playerControls.radius - 1;
  let top = playerControls.y - playerControls.radius + 1;
  let bottom = playerControls.y + playerControls.radius - 1;

  if (playerControls.vx > 0) {
    // Moving right: check the right edge of the player against tiles.
    const col = Math.floor(right / tileSize);
    const rowTop = Math.floor(top / tileSize);
    const rowBottom = Math.floor(bottom / tileSize);
    for (let row = rowTop; row <= rowBottom; row++) {
      if (
        levelMap.isSolidTileAt(
          col * tileSize + 1,
          row * tileSize + tileSize / 2,
        )
      ) {
        // Snap the player to the left side of the tile and stop horizontal movement.
        playerControls.x = col * tileSize - playerControls.radius;
        playerControls.vx = 0;
        left = playerControls.x - playerControls.radius + 1;
        right = playerControls.x + playerControls.radius - 1;
        break;
      }
    }
  } else if (playerControls.vx < 0) {
    // Moving left: check the left edge of the player against tiles.
    const col = Math.floor(left / tileSize);
    const rowTop = Math.floor(top / tileSize);
    const rowBottom = Math.floor(bottom / tileSize);
    for (let row = rowTop; row <= rowBottom; row++) {
      if (
        levelMap.isSolidTileAt(
          col * tileSize + tileSize - 1,
          row * tileSize + tileSize / 2,
        )
      ) {
        // Snap the player to the right side of the tile and stop horizontal movement.
        playerControls.x = col * tileSize + tileSize + playerControls.radius;
        playerControls.vx = 0;
        left = playerControls.x - playerControls.radius + 1;
        right = playerControls.x + playerControls.radius - 1;
        break;
      }
    }
  }

  // Gravity and jumping
  playerControls.vy += (playerControls.gravity * stepTime) / 10;
  if ((keysDown.w || keysDown.ArrowUp) && playerControls.onGround) {
    playerControls.vy = playerControls.jumpStrength;
    playerControls.onGround = false;
  }
  // collision detection after vertical movement
  playerControls.y += playerControls.vy;
  left = playerControls.x - playerControls.radius + 1;
  right = playerControls.x + playerControls.radius - 1;
  top = playerControls.y - playerControls.radius + 1;
  bottom = playerControls.y + playerControls.radius - 1;
  playerControls.onGround = false;

  if (playerControls.vy >= 0) {
    // moving down or standing: check the bottom edge for floor tiles
    const row = Math.floor(bottom / tileSize);
    const colLeft = Math.floor(left / tileSize);
    const colRight = Math.floor(right / tileSize);
    for (let col = colLeft; col <= colRight; col++) {
      if (
        levelMap.isSolidTileAt(
          col * tileSize + tileSize / 2,
          row * tileSize + 1,
        )
      ) {
        // snap to the top of the floor tile and stop falling
        playerControls.y = row * tileSize - playerControls.radius;
        playerControls.vy = 0;
        playerControls.onGround = true;
        top = playerControls.y - playerControls.radius + 1;
        bottom = playerControls.y + playerControls.radius - 1;
        break;
      }
    }
  } else if (playerControls.vy < 0) {
    // moving up: check the top edge for ceiling tiles
    const row = Math.floor(top / tileSize);
    const colLeft = Math.floor(left / tileSize);
    const colRight = Math.floor(right / tileSize);
    for (let col = colLeft; col <= colRight; col++) {
      if (
        levelMap.isSolidTileAt(
          col * tileSize + tileSize / 2,
          row * tileSize + tileSize - 1,
        )
      ) {
        // snap to below the ceiling tile and stop upward movement
        playerControls.y = row * tileSize + tileSize + playerControls.radius;
        playerControls.vy = 0;
        top = playerControls.y - playerControls.radius + 1;
        bottom = playerControls.y + playerControls.radius - 1;
        break;
      }
    }
  }

  // Prevent player from leaving the screen
  if (playerControls.x >= width - playerControls.radius) {
    playerControls.x = width - playerControls.radius;
    playerControls.vx = 0;
  }
  if (playerControls.x <= playerControls.radius) {
    playerControls.x = playerControls.radius;
    playerControls.vx = 0;
  }
  if (playerControls.y <= playerControls.radius) {
    playerControls.y = playerControls.radius;
    playerControls.vy = 0;
  }
}

// Call the player update function each frame
gi.addDrawing(updatePlayer);
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
});

function damage() {
  if (iframe <= 0) {
    hearts -= 1;
    iframe = 100;
  }
}
/* --- Example of using distance formula to check for collision between player and boss ---
gi.addDrawing(function ({ stepTime }) {
  const dxB = px - bx;
  const dyB = py - by;
  const distB = Math.sqrt(dxB * dxB + dyB * dyB);
  const playerRadius = 10; // same as drawing radius for player
  const bossRadius = 50; // boss drawing radius
  if (distB < playerRadius + bossRadius) {
    damage();
  }
});*/
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

  // End generated code
});
// level' data to default positions
// attack timer - update the enemy attack timer and select new level

if (enemyAttackTimer <= 0) {
  resetLevel();

  enemyAttackTimer = 500;
}

// End generated code

/* Run the game */
gi.run();
