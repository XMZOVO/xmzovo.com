<script setup lang="ts">
import gsap from 'gsap'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const gradCover = ref<HTMLDivElement | null>(null)
const card = ref<HTMLDivElement | null>(null)
const gradCoverTl = gsap.timeline({ paused: true })
const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  initThree()
  gradCoverTl.to(gradCover.value, { duration: 0, display: 'block' })
    .to(gradCover.value, { duration: 0.2, opacity: 0.8 })
})

const activate = () => {
  gradCoverTl.play()
}

const deActivate = () => {
  gradCoverTl.reverse()
}

const navToBook = () => {
  window.open('http://zhongpeiying.com:5244/%E6%97%A5%E8%AF%AD/%E5%B7%A5%E5%85%B7%E4%B9%A6')
}

const navToTest = () => {
  window.open('http://zhongpeiying.com:5244/%E6%97%A5%E8%AF%AD/%E7%9C%9F%E9%A2%98')
}

const navToStorage = () => {
  window.open('http://zhongpeiying.com:5244/')
}

const navToGithub = () => {
  window.open('https://github.com/XMZOVO')
}

let renderer: WebGLRenderer
let camera: PerspectiveCamera
let scene: Scene
let model: any
function initThree() {
  camera = new PerspectiveCamera(70, canvas.value!.parentElement!.clientWidth
        / canvas.value!.parentElement!.clientHeight, 0.01, 100)
  camera.position.set (0, 10, -0.2)
  camera.quaternion.set(-0.7, 0.016, 0.016, 0.7)
  camera.rotation.set(-1.5, -1.35, -0.013)

  scene = new Scene()

  const loader = new GLTFLoader().setPath('/gang_bear/')
  loader.load('scene.gltf', (gltf) => {
    scene.add(gltf.scene)
    model = gltf.scene.children[0]
  })

  renderer = new WebGLRenderer({ canvas: canvas.value!, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio))
  renderer.setClearColor(0x49A0C6, 1)
  renderer.setAnimationLoop(animation)

  const controls = new OrbitControls(camera, canvas.value!)
  controls.addEventListener('change', animation) // use if there is no animation loop
  controls.minDistance = 2
  controls.maxDistance = 10
  controls.target.set(0, 0, -0.2)
  controls.update()
}

function animation(time: number) {
  if (model)
    model.rotation.z = time * 0.0005
  renderer.render(scene, camera)
}

onUnmounted(() => {
  renderer.dispose()
})
</script>

<template>
  <div bg="black" h="full" p-5 flex flex-col gap="0.5">
    <div h="2/3" flex gap="0.5">
      <div sm="flex" hidden w="4/7" home-card bg="white" rounded="lg" text="black 7xl" font-lobster items-center justify-center>
        Let's Change the World Together
      </div>
      <div sm="w-3/14" w="full" flex flex-col gap="0.5">
        <div flex sm="hidden" text="gray200 lg" pb-2 gap-2 justify-end>
          <div>ABOUT</div>
          <button @click="navToGithub">
            GITHUB
          </button>
        </div>
        <div ref="card" relative h="1/2" home-card bg="white" rounded="lg" text="black 2xl" flex items-center justify-center @click="$router.push('grammar')" @mouseenter="activate" @mouseleave="deActivate">
          <div ref="gradCover" op0 hidden absolute w-full h="2/3" bg="gradient-linear " rounded="lg" from-transparent to="black" bottom-0>
            <h1 absolute bottom-0 right-0 text="gray200 sm" p-2>
              文法查阅-3046
            </h1>
          </div>
          <img src="/NewsLetter.png" w="1/2">
        </div>
        <div h="1/2" flex flex-col gap="0.5">
          <button p="x-5" rounded="lg" h="1/3" bg="amber" flex items-center justify-between @click="navToBook">
            <div w-3 h-3 rounded="full" bg="black" />
            <h1 text="gray900">
              工具书
            </h1>
          </button>
          <button p="x-5" rounded="lg" shadow="~" h="1/3" bg="white" rotate-10 hover="rotate-0" transition-transform duration="100" flex items-center justify-between @click="navToTest">
            <div w-3 h-3 rounded="full" bg="black" />
            <h1 text="gray900">
              真题
            </h1>
          </button>
          <div p-5 text="gray-200 xl" flex items-end h="1/3" justify-start>
            <button @click="navToStorage">
              More
            </button>
          </div>
        </div>
      </div>
      <div sm="flex" hidden w="3/14" flex-col gap="0.5">
        <div h="1/2" flex justify-between p-5>
          <div flex flex-col items-start gap-5 text="gray200">
            <button>ABOUT</button>
            <button @click="navToGithub">
              GITHUB
            </button>
            <button>
              NONSCENE
            </button>
          </div>
          <div text="gray200" i-carbon-user-online />
        </div>
        <div h="1/2" flex flex-col />
      </div>
    </div>
    <div flex-grow flex flex-col sm="flex-row h-1/3" gap="0.5">
      <div w="full" flex sm="flex-row w-4/7" flex-col h-full>
        <div sm="w-1/2" w="full" rounded="lg" h-full>
          <canvas ref="canvas" flex-1 rounded="lg" w-full h-full />
        </div>
        <div hidden sm="w-1/2 flex" w="full" home-card rounded="lg" items-center justify-center>
          <h1 text="2xl">
            More...
          </h1>
        </div>
      </div>
      <div sm="w-3/7 flex" hidden w="full" rounded="lg" home-card items-center justify-center>
        <h1 text="2xl">
          And More... In the Future
        </h1>
      </div>
    </div>
  </div>
</template>
