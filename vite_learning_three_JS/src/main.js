import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//! controls.update() must be called after any manual changes to the camera's transform

camera.position

// const geometry = new THREE.BoxGeometry(1, 10, 10, 10);
// const geometry = new THREE.SphereGeometry(1, 5, 5, 2.5, 1.2);

//* FOR CylinderGeometry
// radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number
const geometry = new THREE.CylinderGeometry(2, 2, 3, 10, 10, false, 150, 105);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe:true });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, side: THREE.DoubleSide });
renderer.setSize(window.innerWidth, window.innerHeight);

//! responsiveness
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

document.body.appendChild(renderer.domElement);

//! controlling orbits(Orbit Control)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;
controls.autoRotate = true;
//* controls.autoRotateSpeed = 12.0;
controls.enableZoom = true;
controls.dampingFactor = 0.021


function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // cube.rotation.x -= 0.001;
  // cube.rotation.y += 0.01;
  controls.update();
}
animate();

// renderer.setAnimationLoop(animate);
