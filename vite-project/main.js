import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';
//Scene
const scene = new THREE.Scene();

//Sizes
const sizes = {
  width: innerWidth,
  height: innerHeight
}


//Element/Ball 
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
    roughness: 0.8
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


//Light
const light = new THREE.PointLight(0xffffff, 3, 180);
light.position.set(40, 50, 40, 0);
light.intensity = 3;
scene.add(light);


//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
camera.position.z = 30
scene.add(camera);


//Render
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width , sizes.height);
renderer.render(scene, camera); 
renderer.setPixelRatio(2);


//Resizing
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  renderer.setSize( sizes.width, sizes.height);
  camera.updateProjectionMatrix();
});


//MOvement
const controls = new OrbitControls(camera, canvas)
controls.autoRotate = false;

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame( loop );
  controls.update()
}
loop()

//Animations
const tl = gsap.timeline({
  defaults: {duration: 1}
});
tl.fromTo(mesh.scale, {z:0 , x:0, y:0}, {z:1 , x:1, y:1});
tl.fromTo('h1', {y:"300%"}, {y:"-85%"})


//Mouse-changing color
let mouseDown = false;
let rgb = [ ];

window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
});






