class DrawableObject {
  x = 20;
  y = -10;
  height = 280;
  width = 220;
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  hitBox(ctx) {
    if (this.hitBoxTarget()) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  hitBoxTarget() {
    return (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof Minion ||
      this instanceof Coin ||
      this instanceof Boss
    );
  }

  progressLifeBar(ctx) {
    if (this instanceof Lifebar) {
        const x = this.x + 40;
        const y = this.y + 10;
        const width = this.width + 100;
        const height = this.height - 20;
        const radius = 10;
        let fillPercentage = this.healthPoints;
        const fillWidth = width * fillPercentage;

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
        ctx.fillStyle = "black"; 
        ctx.fill();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "black";
        ctx.stroke(); 

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + fillWidth - radius, y);
        ctx.arc(x + fillWidth - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
        ctx.lineTo(x + fillWidth, y + height - radius);
        ctx.arc(x + fillWidth - radius, y + height - radius, radius, 0, Math.PI * 0.5);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
        ctx.lineTo(x, y + radius);
        ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
        ctx.closePath();
        if (fillPercentage < 0.2) {
          ctx.fillStyle = "transparent";
        } else {
          ctx.fillStyle = "red";
        }
        ctx.fill();  
    }
}

progressManaBar(ctx) {
  if (this instanceof Manabar) {
      const x = this.x + 40;
      const y = this.y + 10;
      const width = this.width + 100;
      const height = this.height - 20;
      const radius = 10;
      let fillPercentage = 1;
      const fillWidth = width * fillPercentage;
      // Zeichne den Hintergrund der Progressbar (optional)
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
      ctx.fillStyle = "black"; 
      ctx.fill();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "black";
      ctx.stroke(); 
      // Zeichne die gefüllte Fläche
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + fillWidth - radius, y);
      ctx.arc(x + fillWidth - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
      ctx.lineTo(x + fillWidth, y + height - radius);
      ctx.arc(x + fillWidth - radius, y + height - radius, radius, 0, Math.PI * 0.5);
      ctx.lineTo(x + radius, y + height);
      ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
      ctx.lineTo(x, y + radius);
      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
      ctx.closePath();
      ctx.fillStyle = "blue"; 
      ctx.fill();  
  }
}
}
