//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region level.js
var TileMap = class {
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
	#createLevels() {
		return {
			1: [
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					2,
					1,
					1,
					2,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					1,
					2,
					1,
					1,
					1,
					1,
					2,
					0,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					1,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				],
				[
					1,
					1,
					1,
					0,
					0,
					0,
					1,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				],
				[
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				]
			],
			2: [
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					2,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					1,
					0,
					1,
					1,
					1,
					2,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					0,
					1,
					1,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					2,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					1,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					2,
					1,
					1,
					2,
					1,
					1,
					1,
					0,
					0
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					2,
					1,
					1,
					0,
					1,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				],
				[
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					1,
					0,
					1,
					0,
					1,
					1,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				]
			],
			3: [
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					1,
					0,
					0,
					0,
					1,
					0,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					1,
					0,
					0,
					1,
					0,
					0,
					0,
					2,
					1,
					0,
					1,
					2,
					1,
					2,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0
				],
				[
					0,
					0,
					0,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					1,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					2,
					2,
					2,
					0,
					0,
					0,
					0,
					1,
					1,
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1,
					0,
					0,
					1
				],
				[
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					0,
					0,
					0,
					2,
					2,
					0,
					2,
					0,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				]
			],
			4: [
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				],
				[
					0,
					0,
					0,
					0,
					0,
					0,
					0,
					1
				],
				[
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1,
					1
				]
			]
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
			case 3:
				this.levelObj = this.levels[3];
				break;
			case 4:
				this.levelObj = this.levels[4];
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
		for (let row = Math.max(0, startRow); row < Math.min(endRow, this.levelObj.length); row++) for (let col = Math.max(0, startCol); col < Math.min(endCol, this.levelObj[row].length); col++) {
			const tileType = this.levelObj[row][col];
			let fillColor = null;
			switch (tileType) {
				case 1:
					fillColor = "#ffffff";
					break;
				case 2:
					fillColor = "#8c00ff";
					break;
			}
			const x = col * this.tileSize;
			const y = row * this.tileSize;
			if (fillColor) {
				ctx.fillStyle = fillColor;
				ctx.fillRect(x, y, this.tileSize, this.tileSize);
			}
		}
		ctx.restore();
	}
	updateCamera(playerX, playerY, canvasWidth, canvasHeight) {
		const halfWidth = canvasWidth / 2;
		this.cameraX = Math.max(0, Math.min(playerX - halfWidth, this.getWidth() - canvasWidth));
		const halfHeight = canvasHeight / 2;
		this.cameraY = Math.max(0, Math.min(playerY - halfHeight, this.getHeight() - canvasHeight));
	}
	getTileAt(x, y) {
		const col = Math.floor(x / this.tileSize);
		const row = Math.floor(y / this.tileSize);
		if (row >= 0 && row < this.levelObj.length && col >= 0 && col < this.levelObj[row].length) return this.levelObj[row][col];
		return 0;
	}
	isSolidTileAt(x, y) {
		return this.getTileAt(x, y) !== 0;
	}
	getTileType(x, y) {
		return this.getTileAt(x, y);
	}
};
//#endregion
//#region node_modules/simple-canvas-library/dist/simple-canvas-library.es.js
var p = class {
	/**
	* Creates a new GameCanvas instance.
	*
	* @param id - The Canvas Element OR the ID of the canvas element we will render the game in.
	* @param config - Optional configuration object
	* @param config.size - Optional size for canvas. Otherwise size is taken from explicitly set width/height OR from the element's size on the page.
	* @param config.autoresize - Whether to resize the game canvas to the DOM canvas automatically (defaults to true)
	*/
	constructor(t, e = {}) {
		if (this.isRunning = !1, this.tick = (i) => {
			this.doDrawing(i ?? performance.now()), this.isRunning && (this.animationFrameId = window.requestAnimationFrame(this.tick));
		}, !t) throw new Error(`GameCanvas must be called with the ID of a canvas, like this

const game=new GameCanvas("mycanvasid")`);
		if (this.canvas = typeof t == "string" ? document.getElementById(t) : t, !this.canvas) throw new Error("No canvas element found at ID=" + t);
		this.ctx = this.canvas.getContext("2d"), this.drawings = [], this.drawingMetadata = [], this.handlers = { resize: [] }, this.autoresize = e.autoresize ?? !e.size, this.setInitialCanvasSize(e.size), this.setupHandlers();
	}
	setInitialCanvasSize(t) {
		t != null && t.width ? (this.canvas.width = t.width, this.width = t.width) : this.canvas.getAttribute("width") ? this.width = this.canvas.width : (this.width = this.canvas.clientWidth, this.canvas.width = this.width), t != null && t.height ? (this.canvas.height = t.height, this.height = t.height) : this.canvas.getAttribute("height") ? this.height = this.canvas.height : (this.height = this.canvas.clientHeight, this.canvas.height = this.height);
	}
	setupHandlers() {
		for (const e of [
			"click",
			"dblclick",
			"mousedown",
			"mousemove",
			"mouseup",
			"keyup",
			"keydown",
			"keypress"
		]) this.handlers[e] = [], this.canvas.tabIndex = 1e3, this.canvas.addEventListener(e, (i) => {
			const s = i.offsetX, n = i.offsetY;
			for (const r of this.handlers[e]) if (r({
				x: s,
				y: n,
				type: e,
				event: i
			})) return;
		});
	}
	observeCanvasResize() {
		new window.ResizeObserver((e) => {
			for (let i of e) {
				this.autoresize && this.setCanvasSize(i.contentRect.width, i.contentRect.height);
				for (const s of this.handlers.resize) if (s({
					width: i.contentRect.width,
					height: i.contentRect.height,
					canvas: this.canvas,
					setCanvasSize: this.setCanvasSize.bind(this),
					ctx: this.ctx
				})) return;
			}
		}).observe(this.canvas);
	}
	setCanvasSize(t, e) {
		this.width = t, this.height = e, this.canvas.width = t, this.canvas.height = e;
	}
	doDrawing(t) {
		this.ctx.clearRect(0, 0, this.width, this.height), this.drawings.forEach((e, i) => {
			const s = () => {
				this.drawingMetadata[i].off = !0;
			}, n = this.drawingMetadata[i];
			if (n.off) return;
			let r, a = n.__lastTime ? t - n.__lastTime : 0;
			n.__lastTime = t, n.__startTime ? r = t - n.__startTime : (r = 0, n.__startTime = t), e.draw ? e.draw({
				ctx: this.ctx,
				width: this.width,
				height: this.height,
				remove: s,
				timestamp: t,
				elapsed: r,
				stepTime: a
			}) : e({
				ctx: this.ctx,
				width: this.width,
				height: this.height,
				remove: s,
				timestamp: t,
				elapsed: r,
				stepTime: a
			});
		});
	}
	/**
	* run the game (start animations, listen for events).
	* @method
	*/
	run() {
		this.autoresize && (this.observeCanvasResize(), this.setCanvasSize(this.canvas.clientWidth, this.canvas.clientHeight)), this.isRunning = !0, this.tick();
	}
	/**
	* Stop the game animation loop.
	* @method
	*/
	stop() {
		this.isRunning = !1, this.animationFrameId && (window.cancelAnimationFrame(this.animationFrameId), this.animationFrameId = void 0);
	}
	/**
	* Check if the game is currently running.
	* @returns Whether the game is running
	*/
	getIsRunning() {
		return this.isRunning;
	}
	/**
	* Add a drawing to our drawing queue (it will remain until we remove it).
	*
	* @param d - draw function OR an object with a draw callback method
	* @returns ID that can be used in removeDrawing callback to remove drawing.
	*
	* @example <caption>Passing a draw function</caption>
	* ```typescript
	* game.addDrawing(
	*     function ({ctx,elapsed}) {
	*         ctx.beginPath();
	*         ctx.moveTo(200,200);
	*         ctx.lineTo(100,200+Math.sin(elapsed/10)*200);
	*         ctx.stroke();
	*     }
	* );
	* ```
	*
	* @example <caption>Passing an object with a draw method</caption>
	* ```typescript
	* game.addDrawing(
	*      { x : 0,
	*        y : 0,
	*        w : 100,
	*        h : 100,
	*        draw ({ctx,stepTime,width,height}) {
	*           this.x += stepTime/20;
	*           this.y += stepTime/20;
	*           if (this.x > width) { this.x = 0 }
	*           if (this.y > height) { this.y = 0 }
	*           ctx.fillRect(this.x,this.y,this.w,this.h)
	*        },
	*      }
	* );
	* ```
	*
	* @example <caption>A drawing that will remove itself when it leaves the screen</caption>
	* ```typescript
	* game.addDrawing(
	*     function ({ctx,elapsed,width,remove}) {
	*         const x = elapsed / 20
	*         ctx.fillRect(x,20,20,20);
	*         if (x > width) { remove() }
	*     }
	* );
	* ```
	*/
	addDrawing(t) {
		return this.drawings.push(t), this.drawingMetadata.push({}), this.drawings.length - 1;
	}
	/**
	* Remove a drawing by its ID.
	*
	* @param idx - drawing ID to remove (return value from addDrawing).
	*/
	removeDrawing(t) {
		if (typeof t != "number") throw new Error(`removeDrawing must have a numeric ID as an argument. Received ${typeof t} ${t}`);
		this.drawingMetadata[t] ? this.drawingMetadata[t].off = !0 : console.log("WARNING: Attempt to remove non-existent drawing: %s", t);
	}
	/**
	* Restore a previously removed drawing (start drawing again).
	*
	* @param idx - drawing ID to restore (start drawing again).
	*/
	restoreDrawing(t) {
		if (typeof t != "number") throw new Error(`restoreDrawing must have a numeric ID as an argument. Received ${typeof t} ${t}`);
		this.drawingMetadata[t].off = !1;
	}
	/**
	* Replace a drawing by id
	*/
	replaceDrawing(t, e) {
		return this.drawings[t] = e, t;
	}
	addHandler(t, e) {
		if (!this.handlers[t]) throw new Error(`No eventType ${t}: SimpleCanvasLibrary only supports events of type: ${Object.keys(this.handlers).join(",")}`);
		if (typeof e != "function") throw new Error(`addHandler requires a function as second argument. ${e} is a ${typeof e}, not a function.`);
		return this.handlers[t].push(e), this.handlers[t].length - 1;
	}
	/**
	* Remove handler for eventType.
	*/
	removeHandler(t, e) {
		if (!this.handlers[t]) throw new Error(`No eventType ${t}: SimpleCanvasLibrary only supports events of type: ${Object.keys(this.handlers).join(",")}`);
		this.handlers[t][e] = () => {};
	}
	/**
	* Syntactic sugar for addHandler('click',h).
	*
	* @param h - A function to handle click events
	* @returns ID that can be used to remove handler with removeClickHandler
	*
	* @example <caption>Make a drawing move whenever there is a click</caption>
	* ```typescript
	* let xpos = 100;
	* let ypos = 100;
	* // Register a handler to update our variable each time
	* // there is a click.
	* game.addClickHandler(
	*     function ({x,y}) {
	*       // set variables...
	*       xpos = x;
	*       ypos = y;
	*     }
	* )
	* // Now create a drawing that uses the variable we set.
	* game.addDrawing(
	*     function ({ctx}) {ctx.fillRect(xpos,ypos,30,30)}
	* )
	* ```
	*/
	addClickHandler(t) {
		if (typeof t != "function") throw new Error(`addClickHandler requires a function as an argument. ${t} is a ${typeof t}, not a function.`);
		return this.handlers.click.push(t), this.handlers.click.length - 1;
	}
	/**
	* Syntactic sugar for removeHandler('click',h)
	*/
	removeClickHandler(t) {
		this.handlers.click[t] = () => {};
	}
	/**
	* Register a handler h for resize
	*/
	addResizeHandler(t) {
		return this.addHandler("resize", t);
	}
	/**
	* Syntactic sugar for removeHandler('resize',h)
	*/
	removeResizeHandler(t) {
		return this.removeHandler("resize", t);
	}
	/**
	* Get current canvas size
	*/
	getSize() {
		return {
			width: this.width,
			height: this.height
		};
	}
};
console.log("Importing Sprite.ts");
var d = class {
	constructor(t) {
		this.isVisible = !0, this.isEnabled = !0, this.element = t;
	}
	/**
	* Show the component
	*/
	show() {
		return this.isVisible = !0, this.element.style.display = "", this;
	}
	/**
	* Hide the component
	*/
	hide() {
		return this.isVisible = !1, this.element.style.display = "none", this;
	}
	/**
	* Enable the component
	*/
	enable() {
		return this.isEnabled = !0, this.element.style.opacity = "1", this.element.style.pointerEvents = "auto", (this.element instanceof HTMLInputElement || this.element instanceof HTMLButtonElement) && (this.element.disabled = !1), this;
	}
	/**
	* Disable the component
	*/
	disable() {
		return this.isEnabled = !1, this.element.style.opacity = "0.5", this.element.style.pointerEvents = "none", (this.element instanceof HTMLInputElement || this.element instanceof HTMLButtonElement) && (this.element.disabled = !0), this;
	}
	/**
	* Get the underlying DOM element
	*/
	getElement() {
		return this.element;
	}
	/**
	* Check if the component is visible
	*/
	getIsVisible() {
		return this.isVisible;
	}
	/**
	* Check if the component is enabled
	*/
	getIsEnabled() {
		return this.isEnabled;
	}
};
var f = class extends d {
	constructor(t) {
		const e = document.createElement("button");
		if (e.textContent = t.text, e.addEventListener("click", t.onclick), super(e), this.config = t, t.class) e.className = t.class;
		else {
			if (e.style.cssText = `
        padding: 8px 16px;
        margin: 4px;
        border: 1px solid var(--button-border-color, #ccc);
        border-radius: 4px;
        background: var(--button-background, #f0f0f0);
        color: var(--button-text-color, #222);
        cursor: pointer;
        font-size: var(--button-font-size, 14px);
        font-family: var(--button-font-family, inherit);
        transition: background 0.15s;
      `, t.style) {
				const i = {
					color: "--button-background",
					textColor: "--button-text-color",
					fontSize: "--button-font-size",
					fontFamily: "--button-font-family",
					borderColor: "--button-border-color",
					hoverColor: "--button-hover-background"
				};
				for (const [s, n] of Object.entries(t.style)) i[s] && e.style.setProperty(i[s], n);
			}
			if (t.cssVars) for (const [i, s] of Object.entries(t.cssVars)) e.style.setProperty(i, s);
			e.addEventListener("mouseenter", () => {
				this.isEnabled && (e.style.background = getComputedStyle(e).getPropertyValue("--button-hover-background") || "#e0e0e0");
			}), e.addEventListener("mouseleave", () => {
				this.isEnabled && (e.style.background = getComputedStyle(e).getPropertyValue("--button-background") || "#f0f0f0");
			});
		}
	}
	/**
	* Update the button text
	*/
	setText(t) {
		return this.config.text = t, this.element.textContent = t, this;
	}
	/**
	* Get the current button text
	*/
	getText() {
		return this.config.text;
	}
};
var g = class extends d {
	constructor(t) {
		const e = document.createElement("div");
		t.class ? e.className = t.class : e.style.cssText = `
        display: inline-flex;
        align-items: center;
        margin: 4px;
        gap: 8px;
        background: var(--input-container-background, transparent);
      `;
		let i;
		t.label && (i = document.createElement("label"), i.textContent = t.label + ":", i.style.cssText = `
        font-size: 14px;
        font-weight: bold;
        color: var(--label-color, #222);
      `, e.appendChild(i));
		const s = document.createElement("input");
		s.type = "number", t.min !== void 0 && (s.min = t.min.toString()), t.max !== void 0 && (s.max = t.max.toString()), t.step !== void 0 && (s.step = t.step.toString()), t.value !== void 0 && (s.value = t.value.toString()), t.class || (s.style.cssText = `
        padding: 4px 8px;
        border: 1px solid var(--input-border-color, #ccc);
        border-radius: 4px;
        font-size: 14px;
        width: 80px;
        background: var(--input-background, #fff);
        color: var(--input-text-color, #222);
      `), s.addEventListener("input", () => {
			const n = parseFloat(s.value);
			isNaN(n) || t.oninput(n);
		}), e.appendChild(s), super(e), this.config = t, this.input = s, this.label = i;
	}
	/**
	* Get the current value
	*/
	getValue() {
		return parseFloat(this.input.value) || 0;
	}
	/**
	* Set the value
	*/
	setValue(t) {
		return this.input.value = t.toString(), this.config.oninput(t), this;
	}
	/**
	* Update the label text
	*/
	setLabel(t) {
		return this.label && (this.label.textContent = t + ":"), this;
	}
	/**
	* Enable the input
	*/
	enable() {
		return super.enable(), this.input.disabled = !1, this;
	}
	/**
	* Disable the input
	*/
	disable() {
		return super.disable(), this.input.disabled = !0, this;
	}
};
var b = class extends d {
	constructor(t = {}) {
		const e = document.createElement("div");
		if (e.style.cssText = `
      display: flex;
      align-items: center;
      margin: 5px 10px;
      gap: 8px;
      /* host CSS variables (overridable) */
      font-family: var(--scl-font-family, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial);
      color: var(--scl-color-text, #e6e6e6);
      background: var(--scl-input-bg, transparent);
    `, super(e), this.config = t, z(this.element, this.config.theme), this.config.cssVars) for (const [i, s] of Object.entries(this.config.cssVars)) this.element.style.setProperty(i, s);
		this.createSlider();
	}
	createSlider() {
		if (this.config.label) {
			const t = document.createElement("label");
			t.textContent = this.config.label + ":", t.style.cssText = `
        font-size: var(--scl-font-size, 14px);
        font-weight: 500;
        color: var(--scl-color-text, #e6e6e6);
        margin-right: 8px;
        white-space: nowrap;
      `, this.element.appendChild(t);
		}
		this.input = document.createElement("input"), this.input.type = "range", this.input.min = String(this.config.min ?? 0), this.input.max = String(this.config.max ?? 100), this.input.value = String(this.config.value ?? 50), this.input.step = String(this.config.step ?? 1), this.input.disabled = this.config.disabled ?? !1, this.input.style.cssText = `
      flex: 1;
      min-width: 100px;
      height: 20px;
      background: var(--scl-color, #5a5a5a);      
      color: var(--scl-color-text, #777777ff);
    `, this.valueDisplay = document.createElement("span"), this.valueDisplay.textContent = this.input.value, this.valueDisplay.style.cssText = `
      font-size: var(--scl-font-size, 14px);
      color: var(--scl-color-muted, #9ca3af);
      min-width: 30px;
      text-align: right;
      font-family: var(--scl-font-family, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial);
    `, this.input.addEventListener("input", () => {
			const t = parseFloat(this.input.value);
			this.valueDisplay.textContent = String(t), this.config.oninput && this.config.oninput(t);
		}), this.element.appendChild(this.input), this.element.appendChild(this.valueDisplay);
	}
	/**
	* Get the current value
	*/
	getValue() {
		return parseFloat(this.input.value);
	}
	/**
	* Set the value
	*/
	setValue(t) {
		return this.input.value = String(t), this.valueDisplay.textContent = String(t), this;
	}
	/**
	* Get whether the slider is enabled
	*/
	getIsEnabled() {
		return !this.input.disabled;
	}
	/**
	* Enable the slider
	*/
	enable() {
		return this.input.disabled = !1, this;
	}
	/**
	* Disable the slider
	*/
	disable() {
		return this.input.disabled = !0, this;
	}
	/**
	* Set the min value
	*/
	setMin(t) {
		return this.input.min = String(t), this;
	}
	/**
	* Set the max value
	*/
	setMax(t) {
		return this.input.max = String(t), this;
	}
	/**
	* Set the step value
	*/
	setStep(t) {
		return this.input.step = String(t), this;
	}
};
function z(o, t) {
	if (!t) return;
	const e = {
		"--scl-font-family": t.fontFamily,
		"--scl-color-text": t.color,
		"--scl-color-muted": t.mutedColor,
		"--scl-color-accent": t.accentColor,
		"--scl-input-bg": t.inputBackground,
		"--scl-input-track-bg": t.trackBackground,
		"--scl-input-thumb-bg": t.thumbBackground,
		"--scl-input-thumb-border": t.thumbBorder
	};
	for (const [i, s] of Object.entries(e)) s != null && o.style.setProperty(i, s);
}
var v = class extends d {
	constructor(t) {
		super(t), this.components = [];
	}
	/**
	* Set foreground and background colors for the bar using CSS variables.
	* @param foreground - Text color
	* @param background - Background color
	*/
	setColor(t, e) {
		return this.element.style.setProperty("--bar-background", e), this.element.style.setProperty("--bar-text-color", t), this;
	}
	/**
	* Set alignment of items within the bar.
	* @param justifyContent - Justify content value (CSS flexbox)
	*/
	setAlignment(t) {
		return this.element.style.setProperty("--bar-justify-content", t), this;
	}
	/**
	* Add a title (non-interactive text) to the bar.
	* Inherits bar foreground/background colors.
	* @param text - Title text
	* @param options - Optional style overrides
	*/
	addTitle(t, e) {
		const i = document.createElement("span");
		return i.textContent = t, i.style.cssText = `
      color: var(--bar-text-color, inherit);
      background: var(--bar-background, inherit);      
      font-weight: bold;
      font-size: 1.1em;
      margin-right: 16px;
      padding: 2px 8px;
      border-radius: 4px;
      user-select: none;
      pointer-events: none;
      display: inline-block;
    `, e && Object.assign(i.style, e), this.element.appendChild(i), i;
	}
	/**
	* Add arbitrary HTML or an HTMLElement to the bar.
	* @param html - HTML string or HTMLElement
	*/
	addHTML(t) {
		let e;
		if (typeof t == "string") {
			const i = document.createElement("span");
			i.innerHTML = t, e = i;
		} else e = t;
		return this.element.appendChild(e), e;
	}
	/**
	* Add a button to the bar
	*/
	addButton(t) {
		const e = new f(t);
		return this.components.push(e), this.element.appendChild(e.getElement()), e;
	}
	/**
	* Add a number input to the bar
	*/
	addNumberInput(t) {
		const e = new g(t);
		return this.components.push(e), this.element.appendChild(e.getElement()), e;
	}
	/**
	* Add a slider to the bar
	*/
	addSlider(t) {
		const e = new b(t);
		return this.components.push(e), this.element.appendChild(e.getElement()), e;
	}
	/**
	* Remove all components from the bar
	*/
	clear() {
		return this.components.forEach((t) => {
			const e = t.getElement();
			e.parentNode && e.parentNode.removeChild(e);
		}), this.components = [], this;
	}
	/**
	* Get all components in the bar
	*/
	getComponents() {
		return [...this.components];
	}
};
var x = class extends v {
	constructor() {
		const t = document.createElement("div");
		t.style.cssText = `
      display: flex;
      align-items: center;
      padding: 8px;
      background: var(--bar-background, #f8f8f8);
      border-bottom: 1px solid var(--bar-border-color, #ddd);
      min-height: 40px;
      flex-wrap: wrap;
      justify-content: var(--bar-justify-content, start);
    `, super(t);
	}
};
var y = class extends v {
	constructor() {
		const t = document.createElement("div");
		t.style.cssText = `
      display: flex;
      align-items: center;      
      padding: 8px;
      background: var(--bar-background, #f8f8f8);
      border-top: 1px solid var(--bar-border-color, #ddd);
      min-height: 40px;
      flex-wrap: wrap;
      justify-content: var(--bar-justify-content, start);
    `, super(t);
	}
};
var T = class extends p {
	constructor(t = {}) {
		const e = document.createElement("canvas"), i = !!t.canvasSize, s = t.autoresize !== void 0, n = !!(t.scaleToFit && i);
		i && s && t.autoresize && console.warn("GameInterface: Both canvasSize and autoresize:true were specified. This is contradictory - autoresize will be ignored and canvas will use the specified size. Did you mean to use scaleToFit:true instead?"), t.scaleToFit && !i && console.warn("GameInterface: scaleToFit requires canvasSize to be specified. Falling back to autoresize mode.");
		const r = n || i ? !1 : t.autoresize ?? !0;
		i && (e.width = t.canvasSize.width, e.height = t.canvasSize.height), super(e, {
			size: t.canvasSize,
			autoresize: r
		}), this.gameState = "stopped", this.config = t, this.setupContainer(e, i, r, n);
	}
	setupContainer(t, e, i, s) {
		this.container = document.createElement("div");
		const n = `
      --container-background: #18181b;
      --container-border-color: #222;
      --canvas-container-background: #232326;
      --canvas-background: #18181b;
      --bar-background: #232326;
      --bar-text-color: #e6e6e6;
      --bar-border-color: #333;
      --button-background: #232326;
      --button-hover-background: #333;
      --button-border-color: #333;
      --button-text-color: #e6e6e6;
      --input-background: #232326;
      --input-border-color: #333;
      --input-text-color: #e6e6e6;
      --input-container-background: transparent;
      --label-color: #e6e6e6;
      --dialog-background: #232326;
      --dialog-title-color: #e6e6e6;
      --dialog-message-color: #b3b3b3;
      --close-button-background: #22c55e;
      --close-button-color: #18181b;
      --scl-font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      --scl-font-size: 14px;
      --scl-color-text: #e6e6e6;
      --scl-color-muted: #9ca3af;
      --scl-color-accent: #22c55e;
      --scl-input-bg: transparent;
      --scl-input-track-bg: #444;
      --scl-input-thumb-bg: #22c55e;
      --scl-input-thumb-border: #18181b;
    `;
		if (this.config.containerClass) this.container.className = this.config.containerClass;
		else if (this.config.fullscreen) this.container.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 0;
        overflow: hidden;
        background: var(--container-background);
        width: 100vw;
        height: 100vh;
        margin: 0;
        ${n}
      `, document.body.style.overflow = "hidden";
		else {
			const c = !e && i;
			this.container.style.cssText = `
        display: ${c ? "flex" : "inline-flex"};
        flex-direction: column;
        border: 1px solid var(--container-border-color);
        border-radius: 4px;
        overflow: hidden;
        background: var(--container-background);
        margin: 0 auto;
        box-sizing: border-box;
        ${c ? "width: 100%; height: 100%;" : ""}
        ${n}
      `;
		}
		if (this.config.cssVars) for (const [c, u] of Object.entries(this.config.cssVars)) this.container.style.setProperty(c, u);
		this.canvasContainer = document.createElement("div");
		const r = this.config.fullscreen;
		let a = "", l = "";
		s ? (a = `
        flex: 1;
        min-height: 0;
        container-type: size;
        aspect-ratio: ${this.config.canvasSize.width / this.config.canvasSize.height};
        max-width: ${this.config.canvasSize.width}px;
        max-height: ${this.config.canvasSize.height}px;
        height: min(calc(100vh - 128px), ${this.config.canvasSize.height}px);
      `, l = `
        width: 100cqw;
        height: 100cqh;
      `) : (r || i) && (a = "flex: 1; min-height: 0;", l = `
        width: 100%;
        height: 100%;
        ${r ? "max-width: 100vw; max-height: 100vh;" : ""}
      `), this.canvasContainer.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--canvas-container-background);
      padding: ${r ? "0" : "10px"};
      box-sizing: border-box;
      ${a}
    `, t.style.cssText = `
      border: ${r ? "none" : "1px solid #ddd"};
      border-radius: ${r ? "0" : "4px"};
      background: var(--canvas-background);
      display: block;
      ${l}
    `, this.canvasContainer.appendChild(t), this.container.appendChild(this.canvasContainer), (this.config.parent || document.body).appendChild(this.container);
	}
	/**
	* Add and return a top bar for UI components.
	* If a top bar already exists, returns the existing one.
	*/
	addTopBar() {
		return this.topBar || (this.topBar = new x(), this.container.insertBefore(this.topBar.getElement(), this.container.firstChild)), this.topBar;
	}
	/**
	* Add and return a bottom bar for UI components.
	* If a bottom bar already exists, returns the existing one.
	*/
	addBottomBar() {
		return this.bottomBar || (this.bottomBar = new y(), this.container.appendChild(this.bottomBar.getElement())), this.bottomBar;
	}
	/**
	* Get the top bar if it exists
	*/
	getTopBar() {
		return this.topBar;
	}
	/**
	* Get the bottom bar if it exists
	*/
	getBottomBar() {
		return this.bottomBar;
	}
	/**
	* Remove the top bar
	*/
	removeTopBar() {
		if (this.topBar) {
			const t = this.topBar.getElement();
			t.parentNode && t.parentNode.removeChild(t), this.topBar = void 0;
		}
		return this;
	}
	/**
	* Remove the bottom bar
	*/
	removeBottomBar() {
		if (this.bottomBar) {
			const t = this.bottomBar.getElement();
			t.parentNode && t.parentNode.removeChild(t), this.bottomBar = void 0;
		}
		return this;
	}
	/**
	* Show a simple dialog with a message
	*/
	dialog(t, e, i) {
		const s = document.createElement("dialog");
		s.style.cssText = `
      border: none;
      border-radius: 8px;
      padding: 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
      background: var(--dialog-background, #fff);
    `;
		const n = document.createElement("div");
		n.style.cssText = `
      padding: 20px;
      text-align: center;
    `;
		const r = document.createElement("h3");
		if (r.textContent = t, r.style.cssText = `
      margin: 0 0 10px 0;
      color: var(--dialog-title-color, #333);
    `, n.appendChild(r), e) {
			const l = document.createElement("p");
			l.textContent = e, l.style.cssText = `
        margin: 0 0 20px 0;
        color: var(--dialog-message-color, #666);
        line-height: 1.4;
      `, n.appendChild(l);
		}
		const a = document.createElement("button");
		return a.textContent = "OK", a.style.cssText = `
      padding: 8px 20px;
      background: var(--close-button-background, #007cba);
      color: var(--close-button-color, #fff);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `, a.addEventListener("click", () => {
			s.close(), i && i();
		}), n.appendChild(a), s.appendChild(n), s.addEventListener("click", (l) => {
			l.target === s && (s.close(), i && i());
		}), document.body.appendChild(s), s.showModal(), s.addEventListener("close", () => {
			document.body.removeChild(s);
		}), s;
	}
	/**
	* Get the main container element
	*/
	getContainer() {
		return this.container;
	}
	/**
	* Get the current game state
	*/
	getGameState() {
		return this.gameState;
	}
	/**
	* Start the game (override parent to track state)
	*/
	run() {
		super.run(), this.gameState = "running";
	}
	/**
	* Pause the game
	*/
	pause() {
		super.stop(), this.gameState = "paused";
	}
	/**
	* Resume the game
	*/
	resume() {
		super.run(), this.gameState = "running";
	}
	/**
	* Stop the game completely
	*/
	stop() {
		super.stop(), this.gameState = "stopped";
	}
	/**
	* Reset the game (alias for stop)
	*/
	reset() {
		this.stop();
	}
	/**
	* Destroy the interface and clean up DOM elements
	*/
	destroy() {
		this.container.parentNode && this.container.parentNode.removeChild(this.container);
	}
};
//#endregion
//#region main.js
var levelMap = new TileMap(64);
var currentLevel = 1;
levelMap.setLevel(currentLevel);
var gi = new T({ canvasSize: {
	width: 800,
	height: 448
} });
var iframe = 0;
var objects = {
	player: {
		x: 100,
		y: 300,
		vx: 0,
		vy: 0,
		speed: .5,
		drag: .95,
		gravity: .25,
		jumpStrength: -8,
		onGround: false,
		radius: 10,
		maxSpeed: 5,
		hearts: 3,
		lives: 3
	},
	enemy: [{
		x: 400,
		y: 300,
		vx: 0,
		vy: 0,
		speed: .5,
		drag: .95,
		gravity: .25,
		jumpStrength: -8,
		onGround: false,
		radius: 10,
		maxSpeed: 5,
		direction: 0
	}, {
		x: 300,
		y: 200,
		vx: 0,
		vy: 0,
		speed: .5,
		drag: .95,
		gravity: .25,
		jumpStrength: -8,
		onGround: false,
		radius: 10,
		maxSpeed: 5,
		direction: 0
	}],
	goal: {
		x: 1800,
		y: 500,
		radius: 10
	}
};
var timeSurvived = 0;
var level = [
	{
		id: 1,
		active: false
	},
	{
		id: 2,
		active: false
	},
	{
		id: 3,
		active: false
	}
];
var enemyAttackTimer = 0;
function resetLevel() {
	for (let i = 0; i < level.length; i++) level[i].active = false;
}
gi.addDrawing(function({ ctx }) {
	levelMap.drawMap(ctx, gi.canvas.width, gi.canvas.height);
});
gi.addDrawing(function({ ctx, width, height, elapsed, stepTime }) {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(objects.player.x - levelMap.cameraX, objects.player.y - levelMap.cameraY, objects.player.radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "purple";
	ctx.arc(objects.enemy[0].x - levelMap.cameraX, objects.enemy[0].y - levelMap.cameraY, objects.enemy[0].radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "purple";
	ctx.arc(objects.enemy[1].x - levelMap.cameraX, objects.enemy[1].y - levelMap.cameraY, objects.enemy[1].radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "gold";
	ctx.arc(objects.goal.x - levelMap.cameraX, objects.goal.y - levelMap.cameraY, objects.goal.radius, 0, Math.PI * 2);
	ctx.fill();
});
function updateGoal() {
	switch (currentLevel) {
		case 1:
			objects.goal.x = 4750;
			objects.goal.y = 250;
			break;
		case 2:
			objects.goal.x = 4300;
			objects.goal.y = 300;
			break;
		case 3:
			objects.goal.x = 1750;
			objects.goal.y = 370;
			break;
		default:
			objects.goal.x = 1800;
			objects.goal.y = 900;
	}
}
gi.addDrawing(function({ stepTime }) {
	updateGoal();
});
/**
* Updates the objects's physics and movement each frame.
* @param {object} params - The drawing parameters.
* @param {number} params.stepTime - Time elapsed since last frame.
* @param {number} params.width - Canvas width.
* @param {number} params.height - Canvas height.
*/
function updateEnemies({ stepTime, width, height }) {
	const tileSize = levelMap.tileSize;
	for (let i = 0; i < objects.enemy.length; i++) {
		const enemy = objects.enemy[i];
		if (enemy.direction === 0) enemy.direction = objects.player.x > enemy.x ? 1 : -1;
		enemy.vx = enemy.speed * enemy.direction;
		enemy.x += enemy.vx;
		let left = enemy.x - enemy.radius + 1;
		let right = enemy.x + enemy.radius - 1;
		let top = enemy.y - enemy.radius + 1;
		let bottom = enemy.y + enemy.radius - 1;
		if (enemy.vx > 0) {
			const col = Math.floor(right / tileSize);
			const rowTop = Math.floor(top / tileSize);
			const rowBottom = Math.floor(bottom / tileSize);
			for (let row = rowTop; row <= rowBottom; row++) if (levelMap.isSolidTileAt(col * tileSize + 1, row * tileSize + tileSize / 2)) {
				enemy.x = col * tileSize - enemy.radius;
				enemy.vx = 0;
				enemy.direction *= -1;
				left = enemy.x - enemy.radius + 1;
				right = enemy.x + enemy.radius - 1;
				break;
			}
		} else if (enemy.vx < 0) {
			const col = Math.floor(left / tileSize);
			const rowTop = Math.floor(top / tileSize);
			const rowBottom = Math.floor(bottom / tileSize);
			for (let row = rowTop; row <= rowBottom; row++) if (levelMap.isSolidTileAt(col * tileSize + tileSize - 1, row * tileSize + tileSize / 2)) {
				enemy.x = col * tileSize + tileSize + enemy.radius;
				enemy.vx = 0;
				enemy.direction *= -1;
				left = enemy.x - enemy.radius + 1;
				right = enemy.x + enemy.radius - 1;
				break;
			}
		}
		enemy.vy += enemy.gravity * stepTime / 10;
		enemy.y += enemy.vy;
		left = enemy.x - enemy.radius + 1;
		right = enemy.x + enemy.radius - 1;
		top = enemy.y - enemy.radius + 1;
		bottom = enemy.y + enemy.radius - 1;
		enemy.onGround = false;
		if (enemy.vy >= 0) {
			const row = Math.floor(bottom / tileSize);
			const colLeft = Math.floor(left / tileSize);
			const colRight = Math.floor(right / tileSize);
			for (let col = colLeft; col <= colRight; col++) if (levelMap.isSolidTileAt(col * tileSize + tileSize / 2, row * tileSize + 1)) {
				enemy.y = row * tileSize - enemy.radius;
				enemy.vy = 0;
				enemy.onGround = true;
				top = enemy.y - enemy.radius + 1;
				bottom = enemy.y + enemy.radius - 1;
				break;
			}
		} else if (enemy.vy < 0) {
			const row = Math.floor(top / tileSize);
			const colLeft = Math.floor(left / tileSize);
			const colRight = Math.floor(right / tileSize);
			for (let col = colLeft; col <= colRight; col++) if (levelMap.isSolidTileAt(col * tileSize + tileSize / 2, row * tileSize + tileSize - 1)) {
				enemy.y = row * tileSize + tileSize + enemy.radius;
				enemy.vy = 0;
				top = enemy.y - enemy.radius + 1;
				bottom = enemy.y + enemy.radius - 1;
				break;
			}
		}
		if (enemy.x >= levelMap.getWidth() - enemy.radius) {
			enemy.x = levelMap.getWidth() - enemy.radius;
			enemy.direction *= -1;
		}
		if (enemy.x <= enemy.radius) {
			enemy.x = enemy.radius;
			enemy.direction *= -1;
		}
		if (enemy.y <= enemy.radius) {
			enemy.y = enemy.radius;
			enemy.vy = 0;
		}
		if (enemy.y >= levelMap.getHeight() - enemy.radius) {
			enemy.y = levelMap.getHeight() - enemy.radius;
			enemy.vy = 0;
		}
	}
}
function goalCollision() {
	const dx = objects.player.x - objects.goal.x;
	const dy = objects.player.y - objects.goal.y;
	if (Math.sqrt(dx * dx + dy * dy) < objects.player.radius + objects.goal.radius) {
		currentLevel++;
		levelMap.setLevel(currentLevel);
		switch (currentLevel) {
			case 2:
				objects.player.x = 100;
				objects.player.y = 300;
				objects.enemy[0].x = 450;
				objects.enemy[0].y = 280;
				objects.enemy[1].x = 800;
				objects.enemy[1].y = 220;
				break;
			case 3:
				objects.player.x = 100;
				objects.player.y = 300;
				objects.enemy[0].x = 1300;
				objects.enemy[0].y = 240;
				objects.enemy[1].x = 1500;
				objects.enemy[1].y = 220;
				break;
			case 4:
				objects.player.x = 100;
				objects.player.y = 300;
				objects.enemy[0].x = 3e3;
				objects.enemy[0].y = 3e3;
				objects.enemy[1].x = 3e3;
				objects.enemy[1].y = 3e3;
				break;
			default:
				currentLevel = 1;
				objects.player.x = 100;
				objects.player.y = 300;
				objects.player.vx = 0;
				objects.player.vy = 0;
				objects.player.onGround = false;
				resetEnemiesForLevel(currentLevel);
				resetLevel();
		}
	}
}
gi.addDrawing(function({ stepTime }) {
	updateEnemies({ stepTime });
	goalCollision();
	checkEnemyCollision();
});
function updateobjects({ stepTime, width, height }) {
	const tileSize = levelMap.tileSize;
	const player = objects.player;
	if (!(keysDown.a || keysDown.ArrowLeft || keysDown.d || keysDown.ArrowRight) && Math.abs(player.vx) < .2) player.vx = 0;
	if (player.vx > player.maxSpeed) player.vx = player.maxSpeed;
	if (player.vx < -player.maxSpeed) player.vx = -player.maxSpeed;
	if (keysDown.a || keysDown.ArrowLeft) player.vx -= player.speed;
	if (keysDown.d || keysDown.ArrowRight) player.vx += player.speed;
	player.vx *= player.drag;
	player.x += player.vx;
	let left = player.x - player.radius + 1;
	let right = player.x + player.radius - 1;
	let top = player.y - player.radius + 1;
	let bottom = player.y + player.radius - 1;
	if (player.vx > 0) {
		const col = Math.floor(right / tileSize);
		const rowTop = Math.floor(top / tileSize);
		const rowBottom = Math.floor(bottom / tileSize);
		for (let row = rowTop; row <= rowBottom; row++) if (levelMap.isSolidTileAt(col * tileSize + 1, row * tileSize + tileSize / 2)) {
			player.x = col * tileSize - player.radius;
			player.vx = 0;
			left = player.x - player.radius + 1;
			right = player.x + player.radius - 1;
			break;
		}
	} else if (player.vx < 0) {
		const col = Math.floor(left / tileSize);
		const rowTop = Math.floor(top / tileSize);
		const rowBottom = Math.floor(bottom / tileSize);
		for (let row = rowTop; row <= rowBottom; row++) if (levelMap.isSolidTileAt(col * tileSize + tileSize - 1, row * tileSize + tileSize / 2)) {
			player.x = col * tileSize + tileSize + player.radius;
			player.vx = 0;
			left = player.x - player.radius + 1;
			right = player.x + player.radius - 1;
			break;
		}
	}
	player.vy += player.gravity * stepTime / 10;
	if ((keysDown.w || keysDown.ArrowUp) && player.onGround) {
		player.vy = player.jumpStrength;
		player.onGround = false;
	}
	player.y += player.vy;
	left = player.x - player.radius + 1;
	right = player.x + player.radius - 1;
	top = player.y - player.radius + 1;
	bottom = player.y + player.radius - 1;
	player.onGround = false;
	if (player.vy >= 0) {
		const row = Math.floor(bottom / tileSize);
		const colLeft = Math.floor(left / tileSize);
		const colRight = Math.floor(right / tileSize);
		for (let col = colLeft; col <= colRight; col++) if (levelMap.isSolidTileAt(col * tileSize + tileSize / 2, row * tileSize + 1)) {
			player.y = row * tileSize - player.radius;
			player.vy = 0;
			player.onGround = true;
			top = player.y - player.radius + 1;
			bottom = player.y + player.radius - 1;
			if (levelMap.getTileType(col * tileSize + tileSize / 2, row * tileSize + 1) === 2 && iframe <= 0) {
				objects.player.hearts -= 1;
				iframe = 100;
			}
			break;
		}
	} else if (player.vy < 0) {
		const row = Math.floor(top / tileSize);
		const colLeft = Math.floor(left / tileSize);
		const colRight = Math.floor(right / tileSize);
		for (let col = colLeft; col <= colRight; col++) if (levelMap.isSolidTileAt(col * tileSize + tileSize / 2, row * tileSize + tileSize - 1)) {
			player.y = row * tileSize + tileSize + player.radius;
			player.vy = 0;
			top = player.y - player.radius + 1;
			bottom = player.y + player.radius - 1;
			break;
		}
	}
	if (player.x >= levelMap.getWidth() - player.radius) {
		player.x = levelMap.getWidth() - player.radius;
		player.vx = 0;
	}
	if (player.x <= player.radius) {
		player.x = player.radius;
		player.vx = 0;
	}
	if (player.y <= player.radius) {
		player.y = player.radius;
		player.vy = 0;
	}
	if (player.y >= levelMap.getHeight() - player.radius) {
		player.y = levelMap.getHeight() - player.radius;
		player.vy = 0;
	}
	updateEnemies({
		stepTime,
		width,
		height
	});
	levelMap.updateCamera(objects.player.x, objects.player.y, width, height);
}
gi.addDrawing(updateobjects);
var keysDown = {
	w: false,
	a: false,
	s: false,
	d: false
};
gi.addHandler("keydown", function({ event, x, y }) {
	keysDown[event.key] = true;
	console.log("keysDown:", keysDown);
});
gi.addHandler("keyup", function({ event, x, y }) {
	keysDown[event.key] = false;
	console.log("keysDown:", keysDown);
});
gi.addDrawing(function({ ctx, width, height, elapsed, stepTime }) {
	ctx.fillStyle = "green";
	ctx.font = "20px Arial";
	ctx.fillText(`Health - ${objects.player.hearts}`, 20, 20);
	ctx.fillText(`Time - ${timeSurvived.toFixed(2)}`, width / 2, 20);
});
gi.addDrawing(function({ ctx, width, height, elapsed, stepTime }) {
	ctx.fillStyle = "blue";
	ctx.font = "20px Arial";
	ctx.fillText(`X - ${objects.player.x.toFixed(2)}`, 20, 50);
	ctx.fillText(`Y - ${objects.player.y.toFixed(2)}`, 20, 80);
	if (currentLevel === 1) {
		ctx.fillStyle = "red";
		ctx.font = "16px Arial";
		ctx.fillText(`Use WASD or arrow keys to move and jump. Reach the gold circle to win and never touch purple`, 50, height - 20);
	} else if (currentLevel === 4) {
		ctx.fillStyle = "red";
		ctx.font = "16px Arial";
		ctx.fillText(`You won! Refresh the page to play again.`, 50, height - 20);
	}
});
function checkEnemyCollision() {
	for (let i = 0; i < objects.enemy.length; i++) {
		const enemy = objects.enemy[i];
		const dx = objects.player.x - enemy.x;
		const dy = objects.player.y - enemy.y;
		if (Math.sqrt(dx * dx + dy * dy) < objects.player.radius + enemy.radius) {
			if (iframe <= 0) {
				objects.player.hearts -= 1;
				iframe = 100;
			}
		}
	}
}
function iframeTimer(stepTime) {
	if (iframe > 0) {
		iframe -= stepTime / 10;
		if (iframe < 0) iframe = 0;
	}
}
gi.addDrawing(function({ stepTime }) {
	iframeTimer(stepTime);
});
function checkPlayerHealth() {
	if (objects.player.hearts <= 0 || objects.player.y >= 437) {
		objects.player.lives -= 1;
		objects.player.hearts = 3;
		objects.player.x = 100;
		objects.player.y = 300;
		objects.player.vx = 0;
		objects.player.vy = 0;
		objects.player.onGround = false;
		resetEnemiesForLevel(currentLevel);
		resetLevel();
	}
}
gi.addDrawing(function({ stepTime }) {
	checkPlayerHealth();
});
gi.addDrawing(function({ ctx, width, height }) {
	if (objects.player.lives <= 0) gameOver(ctx, width, height);
});
function gameOver(ctx, width, height) {
	ctx.fillStyle = "grey";
	ctx.font = "50px Arial";
	ctx.fillText(`Game Over...`, width / 5, height / 2);
	gi.stop();
}
gi.addDrawing(function({ stepTime }) {
	timeSurvived += stepTime / 1e3;
});
if (enemyAttackTimer <= 0) {
	resetLevel();
	enemyAttackTimer = 500;
}
gi.run();
//#endregion

//# sourceMappingURL=index-BQF50sUS.js.map