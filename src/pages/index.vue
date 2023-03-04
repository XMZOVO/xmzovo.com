<script setup lang="ts">
import gsap from 'gsap'

const gradCover = ref<HTMLDivElement | null>(null)
const card = ref<HTMLDivElement | null>(null)
const gradCoverTl = gsap.timeline({ paused: true })

onMounted(() => {
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
        <div sm="w-1/2" w="full" rounded="lg" h-full flex items-center justify-center>
          <img src="/Star2.png" w="2/5">
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
