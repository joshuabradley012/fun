let particles = [];
let flowField;
let cols, rows;
let resolution = 20;

function setup() {
  createCanvas(600, 600);
  background(0);
  
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  
  flowField = new Array(cols * rows);
  
  // Create particles
  for (let i = 0; i < 3000; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  // Generate Perlin noise flow field
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOff, yOff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      flowField[index] = v;
      xOff += 0.1;
    }
    yOff += 0.1;
  }
  
  // Update and display particles
  for (let p of particles) {
    p.follow(flowField);
    p.update();
    p.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
  }

  follow(vectors) {
    let x = floor(this.pos.x / resolution);
    let y = floor(this.pos.y / resolution);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(255, 100);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos.set(this.pos);
  }
}