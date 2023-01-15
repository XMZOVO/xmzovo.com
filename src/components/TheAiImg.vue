<script setup lang="ts">
import { gsap } from 'gsap'

defineProps<{
  src: string
}>()
const imgTl = gsap.timeline({ paused: true })
const aiImg = ref<HTMLElement>()

onMounted(() => {
})

function onMouseEnter() {
  imgTl
    .to(aiImg.value!, { zIndex: 50, duration: 0 })
    .to(aiImg.value!, { scale: 1.3, duration: 0.1 })
    .play()
}

function onMouseLeave() {
  imgTl
    .to(aiImg.value!, { zIndex: 0, duration: 0 })
    .to(aiImg.value!, { scale: 1, duration: 0.2, ease: 'none' })
    .play()
}
</script>

<template>
  <img ref="aiImg" shadow-md shadow-dark rounded :src="src" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
</template>
