import './css/style.styl'
import grassTextureSource from './images/textures/house/grass.jpg'

import * as THREE from 'three'

import Planet from './js/Planet.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const grassTexture = textureLoader.load(grassTextureSource)
// grassTexture.wrapS = THREE.RepeatWrapping
// grassTexture.wrapT = THREE.RepeatWrapping
// grassTexture.repeat.x = 4
// grassTexture.repeat.y = 4

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Planet
 */
const planet = new Planet({ textureLoader: textureLoader })
scene.add(planet.container)

// /**
//  * House
//  */
// const house = new THREE.Object3D()
// scene.add(house)

// // Wall
// const wall = new THREE.Mesh(
//     new THREE.BoxGeometry(1.5, 1, 1.5),
//     new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, color: 0xffcc99 })
// )
// wall.castShadow = true
// wall.receiveShadow = true
// house.add(wall)

// // Floor
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(4, 4),
//     new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, map: grassTexture })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// floor.position.y = - 0.5
// house.add(floor)

// // Bushes
// for(let i = 0; i < 30; i++)
// {
//     const radius = Math.random() * 0.2

//     const bush = new THREE.Mesh(
//         new THREE.SphereGeometry(radius),
//         new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, color: 0x228833 })
//     )
//     bush.castShadow = true
//     bush.receiveShadow = true
//     bush.position.x = (Math.random() - 0.5) * 4
//     bush.position.z = (Math.random() - 0.5) * 4
//     bush.position.y = - 0.5 + radius * 0.5
//     house.add(bush)
// }

// // Roof
// const roof = new THREE.Mesh(
//     new THREE.ConeGeometry(1.25, 0.5, 4),
//     new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.8, color: 0x885522 })
// )
// roof.castShadow = true
// roof.position.y = 0.5 + 0.25
// roof.rotation.y = Math.PI * 0.25
// house.add(roof)

/**
 * Lights
 */
// const doorLight = new THREE.PointLight()
// doorLight.castShadow = true
// doorLight.position.x = - 1.02
// house.add(doorLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1.2)
sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = 1.20
sunLight.shadow.camera.bottom = - 1.20
sunLight.shadow.camera.left = - 1.20
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
scene.add(sunLight)

// /**
//  * Shader
//  */
// const shaderGeometry = new THREE.SphereGeometry(1.5, 64, 64)
// const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms:
//     {
//         uTime: { value: 0 }
//     },
//     vertexShader:
//     `
// uniform float uTime;

// varying vec3 vNormal;
// varying float vWaveEffect;

// void main()
// {
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);

//     float waveEffect = sin(modelPosition.y * 30.0 + uTime * 0.03);
//     modelPosition.xyz += normal * vec3(waveEffect) * 0.2;

//     vNormal = normal;
//     vWaveEffect = waveEffect;

//     gl_Position = projectionMatrix * viewMatrix * modelPosition;
// }
//     `,
//     fragmentShader:
//     `
// varying vec3 vNormal;
// varying float vWaveEffect;

// void main()
// {
//     vec3 color = vNormal + vec3(vWaveEffect);
//     gl_FragColor = vec4(color, 1.0);
// }
//     `
// })
// const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
// scene.add(shaderMesh)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // // Update shader
    // shaderMaterial.uniforms.uTime.value += 1

    // // Update house
    // house.rotation.y += 0.003

    // Update camera
    camera.position.x = cursor.x * 3
    camera.position.y = - cursor.y * 3
    camera.lookAt(new THREE.Vector3())

    // Renderer
    renderer.render(scene, camera)
}
loop()

// // Hot reload
// if(module.hot)
// {
//     module.hot.accept()

//     module.hot.dispose(() =>
//     {
//         document.body.removeChild($image)
//     })
// }
