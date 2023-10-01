import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 4, 6, 0.5 );
const material = new THREE.MeshBasicMaterial( { color: 0x111111 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


function addButton (x, y, text) {
    const button = new THREE.BoxGeometry( 0.7, 0.7, 0.1 );
    const buttonMaterial = new THREE.MeshBasicMaterial( { color: 0xff8800 } );
    const buttonCube = new THREE.Mesh( button, buttonMaterial );

    scene.add( buttonCube );
    buttonCube.position.setZ(0.4)
    buttonCube.position.x = x
    buttonCube.position.y = y
    addText(x - 0.07, y - 0.15, text)
}

function addText (x, y, buttonText) {
    const loader = new FontLoader();
    loader.load( 'helvetiker_bold.typeface.json', function ( response ) {

        let font = response;
        let textMatereal = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        let textgeometry = new TextGeometry( buttonText, {
            font: font,
            size: 0.3,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 0.1
        });

        const text = new THREE.Mesh( textgeometry, textMatereal );

        scene.add (text)
        text.position.z = 0.5
        text.position.y = y
        text.position.x = x
    });
}
const displayGeometry = new THREE.BoxGeometry( 3.5, 1 , 0.01 );
const displayMaterial = new THREE.MeshBasicMaterial( { color: 0x444444 } );
const display = new THREE.Mesh( displayGeometry, displayMaterial );
scene.add( display );

display.position.z = 0.3
display.position.y = 2
display.position.x = 0.1
for (let i = 1; i < 10; i++) {
    let x = -1.1 + ((i - 1) % 3) * 1
    let y = -1.5 + Math.trunc((i - 1) / 3) * 1
    let text = `${i}`
    addButton(x, y, text)
}



camera.position.z = 5;
camera.position.x = 5
camera.position.y = 1
camera.rotation.y = 0.7

function animate() {
	requestAnimationFrame( animate );

/* 	cube.rotation.z += 0.01;
    cube.rotation.y += 0.01; */

	renderer.render( scene, camera );
}

animate();