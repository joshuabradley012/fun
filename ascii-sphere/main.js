let spherePoints = [];
const R = 150;       // sphere radius
const offset = 300;  // translate sphere along z so it's in front of our "camera"
const f = 300;       // focal length for perspective scaling

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Use a monospaced font for that ASCII look
  textFont("monospace");
  textSize(20);
  textAlign(CENTER, CENTER);
  colorMode(RGB);

  // Generate points on the sphere:
  // We use a grid in theta and phi. (Note: uniform steps in theta/phi produces a denser clustering near the poles,
  // but for an ASCII sketch this works nicely.)
  const thetaStep = PI / 12;
  const phiStep = TWO_PI / 24;
  let count = 0;
  for (let theta = 0; theta <= PI; theta += thetaStep) {
    for (let phi = 0; phi < TWO_PI; phi += phiStep) {
      // Spherical coordinates conversion:
      let x = R * sin(theta) * cos(phi);
      let y = R * sin(theta) * sin(phi);
      let z = R * cos(theta);
      // Pick a digit – here we cycle through 0–9 for a bit of variety.
      let digit = String(count % 10);
      count++;
      spherePoints.push({ x, y, z, digit });
    }
  }
}

function draw() {
  background(0);
  
  // We use rotation angles that change over time to simulate a rotating sphere.
  const angleX = frameCount * 0.01;
  const angleY = frameCount * 0.01;
  
  // Loop over each point on the sphere:
  for (let pt of spherePoints) {
    // --- Apply rotation around Y (vertical) axis ---
    let x1 = cos(angleY) * pt.x + sin(angleY) * pt.z;
    let z1 = -sin(angleY) * pt.x + cos(angleY) * pt.z;
    
    // --- Apply rotation around X axis ---
    let y1 = cos(angleX) * pt.y - sin(angleX) * z1;
    let z2 = sin(angleX) * pt.y + cos(angleX) * z1;
    
    // --- Translate along z so the sphere is in front of the camera ---
    // After translation, new z coordinate:
    let zTrans = z2 + offset;
    
    // --- Perspective projection ---
    // The idea is to scale the x and y coordinates based on their depth.
    let scale = f / zTrans;
    let projX = x1 * scale;
    let projY = y1 * scale;
    
    // --- Map depth to brightness ---
    // For points on our sphere, before translation z goes from -R to R.
    // After translation, zTrans will range roughly from offset - R to offset + R.
    // Closer points (lower zTrans) are drawn white (255) while farther ones get a lower brightness.
    let brightness = map(zTrans, offset - R, offset + R, 255, 100);
    brightness = constrain(brightness, 100, 255);
    
    fill(brightness);
    noStroke();
    // Draw the ASCII digit.
    // We add width/2 and height/2 to center the drawing on the canvas.
    text(pt.digit, projX + width / 2, projY + height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}