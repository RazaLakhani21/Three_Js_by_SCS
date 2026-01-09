// scene
// camera
// mesh -> geometry & material
// renderer
// request Animation Frame

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  65, // FOV
  window.innerWidth / window.innerHeight, //  Width Ratio / Height Ratio
  0.1, // Near-limit
  100 // Far-limit
);
// camera.position.z = 5;
scene.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: "red" });
let mesh = new THREE.Mesh(box, material);
//* position
mesh.position.z = -4; // *  front and back
// mesh.position.x = 2  //! <------>   right & left
// mesh.position.y = 3  //?  up & down

//* rotation
mesh.rotation.x = 10
// mesh.rotation.z = 2
// mesh.rotation.y = 15
mesh.rotation.y = Math.PI; // 180deg rotation of block, math.pi / 2 will be 90degr and so on...

//* Scale
// mesh.scale.x = 5
// mesh.scale.y = 5
// mesh.scale.z = -0.5
scene.add(mesh);

const canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas, antialis: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

let clock = new THREE.Clock();
function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
//   mesh.scale.y += 0.1;
//   mesh.scale.x += 0.1;
//   mesh.scale.z += 0.01;
//   mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;
//   mesh.rotation.z += 0.01;
//  mesh.rotation.y = clock.getElapsedTime() * 1222222222222222222222222222;
}
// animate();
