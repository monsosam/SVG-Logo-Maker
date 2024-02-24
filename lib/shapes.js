class Shape {
  constructor(color = "") {
    this.color = color;
  }

  setColor(colorVar) {
    this.color = colorVar;
  }
}

class Triangle extends Shape {
  constructor() {
    super();
    this.base = 200;
    this.height = 150;
  }

  render() {
    return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
  }

  setDimensions(base, height) {
    if (base > 0 && height > 0) {
      this.base = base;
      this.height = height;
    }
  }
}

class Square extends Shape {
  constructor() {
    super();
    this.width = 160;
    this.height = 160;
  }

  render() {
    // Returns polygon with color input
    return `<rect x="73" y="40" width="${this.width}" height="${this.height}" fill="${this.color}" />`;
  }

  setDimensions(width, height) {
    if (width > 0 && height > 0) {
      this.width = width;
      this.height = height;
    }
  }
}

class Circle extends Shape {
  constructor() {
    super();
    this.radius = 80;
  }

  render() {
    return `<circle cx="150" cy="115" r="${this.radius}" fill="${this.color}" />`;
  }

  setRadius(radius) {
    if (radius > 0) {
      this.radius = radius;
    }
  }
}

module.exports = { Circle, Square, Triangle };
