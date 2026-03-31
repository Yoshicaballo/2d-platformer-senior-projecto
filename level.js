export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.wall = this.#image(`tile.png`);
    this.spike = this.#image(`spike.png`);
    this.collectible = this.#image(`tile.more.png`);
  }
  #image(fileName) {
    const img = new Image();
    img.src = `images/${fileName}`;
    return img;
  }
  // --- Object data structure for the level ------
  // 0 - nothing
  // 1 - tile (Can act as a floor, wall and ceiling)
  // 2 - spike (Can act as a floor, wall and ceiling but damages player on contact)
  // 4 - tile.more (Can be collected by the player for points)
  levelObj = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  ];
  draw(canvas, ctx) {
    this.#setCanvasSize(canvas);
  }
  #setCanvasSize(canvas) {
    canvas.width = this.getWidth();
    canvas.height = this.getHeight();
  }
  getWidth() {
    return this.levelObj[0].length * this.tileSize;
  }
  getHeight() {
    return this.levelObj.length * this.tileSize;
  }
  drawMap(ctx) {
    for (let row = 0; row < this.levelObj.length; row++) {
      for (let col = 0; col < this.levelObj[row].length; col++) {
        const tileType = this.levelObj[row][col];
        let image = null;
        let fillColor = null;
        switch (tileType) {
          case 1:
            image = this.wall;
            fillColor = "#555";
            break;
        }
        // Calculate the x and y position based on the column and row indices
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        if (image && image.complete && image.naturalWidth > 0) {
          ctx.drawImage(image, x, y, this.tileSize, this.tileSize);
        } else if (fillColor) {
          ctx.fillStyle = fillColor;
          ctx.fillRect(x, y, this.tileSize, this.tileSize);
        }
      }
    }
  }
  // tile collision per tile
  getTileAt(x, y) {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);
    if (
      row >= 0 &&
      row < this.levelObj.length &&
      col >= 0 &&
      col < this.levelObj[row].length
    ) {
      return this.levelObj[row][col];
    }
    return 0;
  }

  isSolidTileAt(x, y) {
    return this.getTileAt(x, y) === 1;
  }
}
