import * as THREE from "three";
import * as lil from "lil-gui";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

let ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

let directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(-5, 5, 1);
scene.add(directional);

let point = new THREE.PointLight(0xffffff, 1, 10, 2);
point.position.set(1, -1, 1);
scene.add(point);

// let ambientHelper = new THREE.Amb
let directionalLightHelper = new THREE.DirectionalLightHelper(directional, 2);
scene.add(directionalLightHelper);

const sphereSize = 0.2;
let pointLightHelper = new THREE.PointLightHelper(point, sphereSize);
scene.add(pointLightHelper);

//! Removed lights variable as learning more deeply about lights
// const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2); // white light with intensity 1 (simulates sunlight)
// highIntensityLight.position.set(10, 20, 15);
// scene.add(highIntensityLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // white light with intensity 0.5 (provides additional lighting)
// directionalLight.position.set(5, 10, 7.5);
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight(0x404040); // soft white light (fills shadows with a soft light)
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1, 100); // white light with intensity 1 and distance 100 (simulates a light bulb)
// pointLight.position.set(0, 5, 0);
// scene.add(pointLight);

// const highIntensityLightHelper = new THREE.DirectionalLightHelper(
//   highIntensityLight,
//   5
// );
// scene.add(highIntensityLightHelper);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   5
// );
// scene.add(directionalLightHelper);

// // const ambientLightHelper = new THREE.AmbientLightHelper()
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
// scene.add(pointLightHelper);

let loader = new THREE.TextureLoader();
let color = loader.load("../text/color.jpg");
let roughness = loader.load("../text/roughness.jpg");
let normal = loader.load("../text/normal.png");
let height = loader.load("../text/height.png");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//! controls.update() must be called after any manual changes to the camera's transform

camera.position.set(0, 0, 8);
const geometry = new THREE.BoxGeometry(3, 1.8, 2);
// const geometry = new THREE.SphereGeometry(1, 5, 5, 2.5, 1.2);

//* FOR CylinderGeometry
// radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean, thetaStart?: number, thetaLength?: number
// const geometry = new THREE.CylinderGeometry(2, 2, 3, 10, 10, false, 150, 105);
// const material = new THREE.MeshBasicMaterial({ color: "red", wireframe:false, roughness: 1, metalness: 1 });
// const material = new THREE.MeshStandardMaterial({ color: "red", wireframe:false, roughness: 1, metalness: 1 });
const material = new THREE.MeshStandardMaterial({
  // map: color,
  color: "blue",
  roughnessMap: roughness,
  normalMap: normal,
  // displacementMap: height,
  // displacementScale: 0.8,
});
const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);
// camera.position.z = 5;
// camera.position.z = 5;

const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  side: THREE.DoubleSide,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = -1;
renderer.outputEncoding = THREE.sRGBEncoding;

//ADD HDRI Lighting
const rgbeloader = new RGBELoader();
rgbeloader.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/zwartkops_pit_4k.hdr",
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture;
  }
);

const gltfLoader = new GLTFLoader();
gltfLoader.load("wooden_box.glb", function (gltf) {
  gltf.scene.position.y = -1;
  scene.add(gltf.scene);
});

//! responsiveness
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//Create a GUI panel for material and mesh settings
const gui = new lil.GUI();

// Adding lil-gui panel for Lights
const lightFolder = gui.addFolder("Lights");

const ambientFolder = lightFolder.addFolder("Ambient Light");
ambientFolder.add(ambientLight, "intensity", 0, 2).name("Intensity");
ambientFolder.open();

// Directional Light Controls
const directionalFolder = lightFolder.addFolder("Directional Light");
directionalFolder.add(directional, "intensity", 0, 5).name("Intensity");
directionalFolder.add(directional.position, "x", -10, 10).name("Position X");
directionalFolder.add(directional.position, "y", -10, 10).name("Position Y");
directionalFolder.add(directional.position, "z", -10, 10).name("Position Z");
directionalFolder.open();

// Point Light Controls
const pointFolder = lightFolder.addFolder("Point Light");
pointFolder.add(point, "intensity", 0, 5).name("Intensity");
pointFolder.add(point.position, "x", -10, 10).name("Position X");
pointFolder.add(point.position, "y", -10, 10).name("Position Y");
pointFolder.add(point.position, "z", -10, 10).name("Position Z");
pointFolder.open();

// Material Settings
const materialFolder = gui.addFolder("Material");
materialFolder.add(material, "roughness", 0, 1).name("Roughness");
materialFolder.add(material, "metalness", 0, 1).name("Metalness");
materialFolder.open();

// Mesh settings
const meshFolder = gui.addFolder("Mesh");
meshFolder.add(cube.scale, "x", 0.1, 5).name("Scale X");
meshFolder.add(cube.scale, "y", 0.1, 5).name("Scale Y");
meshFolder.add(cube.scale, "z", 0.1, 5).name("Scale Z");
meshFolder.add(cube.position, "x", -10, 10).name("Position X");
meshFolder.add(cube.position, "y", -10, 10).name("Position Y");
meshFolder.add(cube.position, "z", -10, 10).name("Position Z");
meshFolder.open();

document.body.appendChild(renderer.domElement);

//! controlling orbits(Orbit Control)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
//* controls.autoRotateSpeed = 12.0;
controls.enableZoom = true;
controls.dampingFactor = 0.021;

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // cube.rotation.x -= 0.001;
  // cube.rotation.y += 0.01;
  controls.update();
}
animate();

// renderer.setAnimationLoop(animate);


//! ------------------//!*? THREE JS BASIX COMPLETED--------------