

export { levelObj, tileSize, setScroll };

// Object data structure for the level
// 0 - nothing
// 1 - brick block (Can act as a floor, wall and ceiling)
// 2 - spike block (Can act as a floor, wall and ceiling but damages player on contact)
// 4 - collectible (Can be collected by the player for points)
const levelObj = [
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];
let tileSize = 8*8; // size of each tile in pixels
// Function that increases the canvas width and height based on the levelObj dimensions
function setScroll() {
  // if levelObj exceeds canvas size, allow screen to scroll
  if (levelObj[0].length * tileSize > 800) {
    createCanvas(levelObj[0].length * tileSize, 600);
  } else {
    createCanvas(800, 600);
  }
  // if levelObj exceeds canvas size, allow screen to scroll
  if (levelObj.length * tileSize > 600) {
    createCanvas(800, levelObj.length * tileSize);
  } else {
    createCanvas(800, 600);
  }
} 

// Function that sets tiles based on the levelObj

// Function that gives tiles their properties based on the levelObj
