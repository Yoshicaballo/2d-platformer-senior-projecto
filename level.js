export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.wall = this.#image(`tile.png`);
    this.spike = this.#image(`spike.png`);
    this.collectible = this.#image(`tile.more.png`);
    this.cameraX = 0;
    this.cameraY = 0;
    this.currentLevel = 1;
    this.levels = this.#createLevels();
    this.setLevel(this.currentLevel);
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
  #createLevels() {
    return {
      1: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      2: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    };
  }

  setLevel(levelNumber) {
    this.currentLevel = levelNumber;
    switch (levelNumber) {
      case 1:
        this.levelObj = this.levels[1];
        break;
      case 2:
        this.levelObj = this.levels[2];
        break;
      default:
        console.warn(`Level ${levelNumber} not found, loading level 1`);
        this.levelObj = this.levels[1];
        this.currentLevel = 1;
        break;
    }
  }

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
  drawMap(ctx, canvasWidth, canvasHeight) {
    ctx.save();
    ctx.translate(-this.cameraX, -this.cameraY);

    const startCol = Math.floor(this.cameraX / this.tileSize);
    const endCol = Math.ceil((this.cameraX + canvasWidth) / this.tileSize);
    const startRow = Math.floor(this.cameraY / this.tileSize);
    const endRow = Math.ceil((this.cameraY + canvasHeight) / this.tileSize);

    for (
      let row = Math.max(0, startRow);
      row < Math.min(endRow, this.levelObj.length);
      row++
    ) {
      for (
        let col = Math.max(0, startCol);
        col < Math.min(endCol, this.levelObj[row].length);
        col++
      ) {
        const tileType = this.levelObj[row][col];
        let image = null;
        let fillColor = null;
        switch (tileType) {
          case 1:
            fillColor = "#ffffff";
            break;
          case 2:
            image = this.spike;
            fillColor = "red";
            break;
          case 4:
            image = this.collectible;
            fillColor = "yellow";
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
    ctx.restore();
  }
  updateCamera(playerX, playerY, canvasWidth, canvasHeight) {
    // Center camera on player, but clamp to level bounds
    const halfWidth = canvasWidth / 2;
    this.cameraX = Math.max(
      0,
      Math.min(playerX - halfWidth, this.getWidth() - canvasWidth),
    );

    const halfHeight = canvasHeight / 2;
    this.cameraY = Math.max(
      0,
      Math.min(playerY - halfHeight, this.getHeight() - canvasHeight),
    );
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
