<script setup lang="ts">
import gsap from 'gsap'

const tl = gsap.timeline({ paused: true })

onMounted(() => {
  tl.to('.icon', { duration: 1, scale: 1.2, opacity: 1, repeat: -1, yoyo: true, ease: 'none' })
  tl.play()
})
</script>

<template>
  <div flex flex-col items-center flex-grow justify-between>
    <div class="icon" i-carbon-construction text-2xl flex-1 op50 />
    <p text-xl font-bold op60 py-5>
      -WIP-
    </p>
  </div>
</template>
