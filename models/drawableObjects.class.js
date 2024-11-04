class DrawableObject {
  x = 20;
  y = -10;
  height = 280;
  width = 220;
  img;
  imageCache = {};
  currentImage = 0;
  coinsCollected = 0;
  healthPoints = 1;
  manaPoints = 1;

  /**
   * Loads a single image and assigns it to the object's image property.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images and stores them in the image cache for animation purposes.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;
      this.imageCache[path] = this.img;
    });
  }

  /**
   * Draws the object on the canvas using the assigned image.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawObjects(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the life bar progress for an object that represents the Lifebar.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  progressLifeBar(ctx) {
    if (this instanceof Lifebar) {
      let x = this.x + 40;
      let y = this.y + 10;
      let width = this.width + 100;
      let height = this.height - 20;
      let radius = 10;
      let fillPercentage = this.healthPoints;
      let fillWidth = width * fillPercentage;
      let statusColor = "#F60C08";
      this.drawStatusBarBackground(ctx, x, y, width, height, radius);
      this.drawStatusBarFillWidth(
        ctx,
        x,
        y,
        fillWidth,
        height,
        radius,
        fillPercentage,
        statusColor
      );
    }
  }

  /**
   * Draws the mana bar progress for an object that represents the Manabar.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  progressManaBar(ctx) {
    if (this instanceof Manabar) {
      let x = this.x + 40;
      let y = this.y + 10;
      let width = this.width + 100;
      let height = this.height - 20;
      let radius = 10;
      let fillPercentage = this.manaPoints;
      let fillWidth = width * fillPercentage;
      let statusColor = "#0089F3";
      this.drawStatusBarBackground(ctx, x, y, width, height, radius);
      this.drawStatusBarFillWidth(
        ctx,
        x,
        y,
        fillWidth,
        height,
        radius,
        fillPercentage,
        statusColor
      );
    }
  }

  /**
   * Draws the boss's life bar.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  progressBossLifeBar(ctx) {
    if (this instanceof Boss) {
      let x = this.x + 70;
      let y = this.y + 100;
      let width = this.width * 0.5;
      let height = 20;
      let radius = 10;
      let fillPercentage = this.healthPoints;
      let fillWidth = width * fillPercentage;
      let statusColor = "darkred";
      this.drawStatusBarBackground(ctx, x, y, width, height, radius);
      this.drawStatusBarFillWidth(
        ctx,
        x,
        y,
        fillWidth,
        height,
        radius,
        fillPercentage,
        statusColor
      );
    }
  }

  /**
   * Draws the background of a status bar with rounded corners.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {number} x - X-coordinate.
   * @param {number} y - Y-coordinate.
   * @param {number} width - Width of the bar.
   * @param {number} height - Height of the bar.
   * @param {number} radius - Radius of the corners.
   */
  drawStatusBarBackground(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.closePath();
    ctx.fillStyle = "#121B36";
    ctx.fill();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "#121B36";
    ctx.stroke();
  }

  /**
   * Draws the filled portion of a status bar, with a specific color and fill based on percentage.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {number} x - X-coordinate.
   * @param {number} y - Y-coordinate.
   * @param {number} fillWidth - Width of the filled part of the bar.
   * @param {number} height - Height of the bar.
   * @param {number} radius - Radius of the corners.
   * @param {number} fillPercentage - Percentage of the bar to fill.
   * @param {string} statusColor - Color of the filled portion.
   */
  drawStatusBarFillWidth(
    ctx,
    x,
    y,
    fillWidth,
    height,
    radius,
    fillPercentage,
    statusColor
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + fillWidth - radius, y);
    ctx.arc(
      x + fillWidth - radius,
      y + radius,
      radius,
      Math.PI * 1.5,
      Math.PI * 2
    );
    ctx.lineTo(x + fillWidth, y + height - radius);
    ctx.arc(
      x + fillWidth - radius,
      y + height - radius,
      radius,
      0,
      Math.PI * 0.5
    );
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.closePath();
    this.outOfManaOrLife(ctx, fillPercentage, statusColor);
    ctx.fill();
  }

  /**
   * Sets the fill style based on mana or life percentage.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @param {number} fillPercentage - Percentage of the bar.
   * @param {string} statusColor - Color for the fill.
   */
  outOfManaOrLife(ctx, fillPercentage, statusColor) {
    ctx.fillStyle = fillPercentage < 0.05 ? "transparent" : statusColor;
  }

  /**
   * Draws the collected coin information on the screen.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  gatheredCoins(ctx) {
    if (this instanceof CollectedCoins) {
      this.drawCoinAmount(ctx);
      this.drawXTime(ctx);
    }
  }

  /**
   * Displays the total number of collected coins.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawCoinAmount(ctx) {
    let number = this.coinsCollected;
    ctx.font = "32px pixelFont";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeText(number, this.x + 65, this.y + 28);
    ctx.fillStyle = "#000";
    ctx.fillText(number, this.x + 65, this.y + 28);
  }

  /**
   * Displays an "X" next to the coin count.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawXTime(ctx) {
    let xTimes = "X";
    ctx.font = "16px pixelFont";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeText(xTimes, this.x + 45, this.y + 28);
    ctx.fillStyle = "#000";
    ctx.fillText(xTimes, this.x + 45, this.y + 28);
  }
}
