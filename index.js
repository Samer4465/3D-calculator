import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import Hoverer from './Hoverer';
import Calculator from './calc.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const loader = new FontLoader();
loader.load( 'helvetiker_bold.typeface.json', function ( response ) {

let calculator = new Calculator(updatedisplay);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff )
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 3.5);
scene.add(light2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 4.5, 5.2, 0.5 );
const material = new THREE.MeshLambertMaterial( { color: 0x111111 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

let buttons = []

let hoverer = new Hoverer(renderer.domElement, camera)

renderer.domElement.addEventListener('mousemove', event => {
    hoverer.setMouse(event.clientX, event.clientY)
});




function addButton (x, y, text, color = 0xff8800, textPostion = 0) {
    const button = new THREE.BoxGeometry( 0.7, 0.5, 0.1 );
    const buttonMaterial = new THREE.MeshLambertMaterial( { color } );
    let buttonCube = new THREE.Mesh( button, buttonMaterial );
    buttonCube.name = text

    scene.add( buttonCube );
    buttonCube.position.z = 0.3
    buttonCube.position.x = x
    buttonCube.position.y = y
    let textObject = addText(x - 0.07, y - 0.15, text, textPostion)
    buttonCube.textObject = textObject
    buttons.push(buttonCube)
}

function addText (x, y, buttonText, textPostion) {
    
        let font = response;
        let textMatereal = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        let textgeometry = new TextGeometry( buttonText, {
            font: font,
            size: 0.26,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 0.1
        });

        const text = new THREE.Mesh( textgeometry, textMatereal );

        scene.add (text)
        text.position.z = 0.35
        text.position.y = y
        text.position.x = x + textPostion - 0.05

        return text
}
const displayGeometry = new THREE.BoxGeometry( 3.7, 1 , 0.1 );
const displayMaterial = new THREE.MeshLambertMaterial( { color: 0xbebea4 } );
const display = new THREE.Mesh( displayGeometry, displayMaterial );
scene.add( display );

display.position.z = 0.3
display.position.y = 1.8
display.position.x = 0.05

let displayTextObj
let displayText = '0'

updatedisplay(displayText)

function updatedisplay ( displayText ) {
    if (displayTextObj) {
        scene.remove (displayTextObj)
    }
    let font = response;
    let textMatereal = new THREE.MeshLambertMaterial( { color: 0x000000 } );
    let textgeometry = new TextGeometry( displayText, {
        font: font,
        size: 0.5,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 0.1
    });
    textgeometry.computeBoundingBox()

    const text = new THREE.Mesh( textgeometry, textMatereal );
    displayTextObj = text
    scene.add (text)
    text.position.z = 0.35
    text.position.y = 1.5
    text.position.x = 1.8 - textgeometry.boundingBox.max.x 
    return text
}

for (let i = 1; i < 10; i++) {
    let x = -1.45 + ((i - 1) % 3) * 1
    let y = -1.4 + Math.trunc((i - 1) / 3) * 0.7
    let text = `${i}`
    addButton(x, y, text)
}

let topBtns = ["C", "+/-", "%"]

for(let i = 0; i < 3; i++) {
    let x = -.45 + ((i - 1) % 3) * 1
    let y = .7
    let text =  topBtns[i]
    if (text == "+/-") {
        addButton(x, y, text, 0x888888, -0.15)
    } else {
        addButton(x, y, text, 0x888888)
    }
}
let bottomBtns = ["0", "00", "."]
for(let i = 0; i < 3; i++) {
    let x = -.45 + ((i - 1) % 3) * 1
    let y = -2.1
    let text =  bottomBtns[i]
    if (text == "00") {
        addButton(x, y, text, 0xff8800, -0.15)
    } else {
        addButton(x, y, text, 0xff8800)
    }
}
let rightBtns = ["/", "*", "+", "-", "="]
rightBtns = rightBtns.reverse()
for (let i = 0; i < 5; i++) {
    let x = 1.55
    let y  = -1.4 + (i - 1) * 0.7
    let text = rightBtns[i]
    addButton(x, y, text, 0x888888)
}

let hoveredButton 

hoverer.add( buttons )

hoverer.onMouseOver(obj => {
    hoveredButton = obj
})

hoverer.onMouseOut(obj => {
    hoveredButton.position.z = .3
    hoveredButton.textObject.position.z = .35
    hoveredButton = null
})
document.addEventListener('mousedown', () => {
    if (!hoveredButton) return
    hoveredButton.position.z = .21
    hoveredButton.textObject.position.z = .26
    if (!isNaN(parseInt(hoveredButton.name))) {
        calculator.numberClick(hoveredButton.name)
    }
    if (hoveredButton.name == 'C') {
        calculator.clear()
    }
    if (hoveredButton.name == '.') {
        calculator.addDot()
    }
    if (hoveredButton.name == '+/-') {
        calculator.plusMinus()
    }
})
document.addEventListener('mouseup', () => {
    if (!hoveredButton) return
    hoveredButton.position.z = .3
    hoveredButton.textObject.position.z = .35
})


camera.position.z = 5;
camera.position.x = 5
camera.position.y = 1
camera.rotation.y = 0.7

const controls = new OrbitControls( camera, renderer.domElement );
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

function animate() {
	requestAnimationFrame( animate );
    hoverer.update()
    controls.update();
	renderer.render( scene, camera );
}

animate();
})