//---IMPORTS---
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
//Create Basic Three.js Stuff
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

//Set Renderer Size and Pixel Ratio, Then Add it to Page
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

//Listen For Window Resize
window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
});
//Listen For Click
document.addEventListener("mousedown", () => {
	if (xOYRPF > 0) {
		rotationX = rotationX * -1;
	} else if (xOYRPF < 0) {
		rotationY = rotationY * -1;
	}
	rotation = rotation * -1;
});
//Create Sphere
const sphereMesh = new THREE.Mesh(
	new THREE.SphereGeometry(5, 50, 50, 0, Math.PI * 2, 0, Math.PI), 
	new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./src/obama.png'), flatShading: THREE.FlatShading })								 
);
//Make Sphere Jagged and Add it to Scene
const {array} = sphereMesh.geometry.attributes.position;
/*
for (var i = 0; i < array.length; i += 3) {
	const x = array[i];
	const y = array[i + 1];
	const z = array[i + 2];

	array[i + 2] = z + Math.random() * 0.25;
}
*/
scene.add(sphereMesh);
//Position Camera and Light
const light = new THREE.DirectionalLight(0xffffff, 1);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
const bottomLight = new THREE.DirectionalLight(0xffffff, 1);
const leftLight = new THREE.DirectionalLight(0xffffff, 1);
const rightLight = new THREE.DirectionalLight(0xffffff, 1);
new OrbitControls(camera, renderer.domElement)
camera.position.z = 8;
light.position.set(0, 0, 1);
backLight.position.set(0, 0, -1);
topLight.position.set(0, -1, 0);
bottomLight.position.set(0, 1, 0);
leftLight.position.set(-1, 0, 0);
rightLight.position.set(1, 0, 0);
scene.add(light);
scene.add(backLight);
scene.add(topLight);
scene.add(bottomLight);
scene.add(leftLight);
scene.add(rightLight);
//Render and Animate
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	sphereMesh.rotation.y += 0.01;
}
animate();