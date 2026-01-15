import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();


const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2); // white light with intensity 1 (simulates sunlight)
highIntensityLight.position.set(10, 20, 15)
scene.add(highIntensityLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // white light with intensity 0.5 (provides additional lighting)
directionalLight.position.set(5, 10, 7.5)
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light (fills shadows with a soft light)
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100); // white light with intensity 1 and distance 100 (simulates a light bulb)
pointLight.position.set(0, 5, 0)
scene.add(pointLight);

const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5)
scene.add(highIntensityLightHelper)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(directionalLightHelper)
// const ambientLightHelper = new THREE.AmbientLightHelper()
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5)
scene.add(pointLightHelper)

let loader = new THREE.TextureLoader()
let color = loader.load("../text/color.jpg")
let roughness = loader.load("../text/roughness.jpg")
let normal = loader.load("../text/normal.png")
let height = loader.load("../text/height.png")

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//! controls.update() must be called after any manual changes to the camera's transform

camera.position

const geometry = new THREE.BoxGeometry(3, 1.8, 2);
// const geometry = new THREE.SphereGeometry(1, 5, 5, 2.5, 1.2);

//* FOR CylinderGeometry
// radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number
// const geometry = new THREE.CylinderGeometry(2, 2, 3, 10, 10, false, 150, 105);
// const material = new THREE.MeshBasicMaterial({ color: "red", wireframe:false, roughness: 1, metalness: 1 });
// const material = new THREE.MeshStandardMaterial({ color: "red", wireframe:false, roughness: 1, metalness: 1 });
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal, displacementMap: height, displacementScale: 0.8 });
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
// controls.autoRotate = true;
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