const canvasExample5 = document.querySelector('.canvas-example-5');
const canvasExampleCopy5 = document.querySelector('.canvas-example-5-copy');

function drawExample5(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
  camera.position.z = 5;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xb2b27f });
  const square = new THREE.Mesh(geometry, material);
  scene.add(square);
  renderer.render(scene, camera);
}

drawExample5(canvasExample5);
drawExample5(canvasExampleCopy5)