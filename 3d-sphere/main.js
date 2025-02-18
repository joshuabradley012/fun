let scene, camera, renderer, particles;

function setup() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Set background to grey (200)
  
  // Create camera with adjusted FOV and position
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 300;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(400, 400);
  document.body.appendChild(renderer.domElement);
  
  // Create particle geometry
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const numParticles = 1000;
  const radius = 100;
  
  // Generate Fibonacci sphere points
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  
  for (let i = 0; i < numParticles; i++) {
    const t = i / numParticles;
    const inclination = Math.acos(1 - 2 * t);
    const azimuth = 2 * Math.PI * i / goldenRatio;
    
    const x = radius * Math.sin(inclination) * Math.cos(azimuth);
    const y = radius * Math.sin(inclination) * Math.sin(azimuth);
    const z = radius * Math.cos(inclination);
    
    positions.push(x, y, z);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
  // Create particle material with custom depth fade
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      cameraNear: { value: camera.near },
      cameraFar: { value: camera.far },
    },
    vertexShader: `
      varying vec4 vPosition;
      void main() {
        vPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * vPosition;
        gl_PointSize = 4.0;
      }
    `,
    fragmentShader: `
      varying vec4 vPosition;
      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;
        
        float smoothWidth = 0.05;
        float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
        
        // Calculate depth based on distance from camera
        float depth = length(vPosition.xyz);
        float maxDepth = 400.0;
        
        // Reverse the depth so front particles are more opaque
        float opacity = mix(1.0, 0.1, depth / maxDepth) * alpha;
        gl_FragColor = vec4(1.0, 1.0, 1.0, opacity);
      }
    `
  });
  
  // Create particle system
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.x += 0.005;
  particles.rotation.y += 0.005;
  renderer.render(scene, camera);
}

setup();
