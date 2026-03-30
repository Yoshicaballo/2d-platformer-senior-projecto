

export { levelObj };

constructor(tileSize) {
  this.tileSize = tileSize;
  this.wall = this.#image('tile.png');
}
#image(fileName) {
  const img = new Image();
  img.src = 'images/${fileName}';
  return img;
}
// --- Object data structure for the level ------
// 0 - nothing
// 1 - tile (Can act as a floor, wall and ceiling)
// 2 - spike (Can act as a floor, wall and ceiling but damages player on contact)
// 4 - tile.more (Can be collected by the player for points)
const levelObj = [
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];
// draw the level
for (let row = 0; row < levelObj.length; row++) {
  for (let col = 0; col < levelObj[row].length; col++) {
    const tileType = levelObj[row][col];
    switch (tileType) {
      case 1:
        // Draw tile
        ctx.drawImage(this.wall, col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
        break;}}}