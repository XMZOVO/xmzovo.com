<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import gsap from 'gsap'

const props = withDefaults(defineProps<{
  modelValue: boolean
  imageSrc: string
}>(), {
  modelValue: false,
  imageSrc: '',
})
const emit = defineEmits<{
  (event: 'close'): void
  (event: 'changePage', type: 'pre' | 'next'): void
  (event: 'update:modelValue', value: boolean): void
}>()
const previewTl = gsap.timeline({ paused: true })
const previewRef = ref<HTMLDivElement>()

const show = useVModel(props, 'modelValue', emit, { passive: true })
watchEffect(() => {
  if (show.value)
    previewTl.play()

  else previewTl.reverse()
})

onMounted(() => {
  previewTl
    .to(previewRef.value!, { display: 'flex', duration: 0 })
    .from(previewRef.value!, { opacity: 0, duration: 0.2 })
})

function close() {
  show.value = false
  emit('close')
}

function changePage(type: 'pre' | 'next') {
  emit('changePage', type)
}
</script>

<template>
  <div ref="previewRef" hidden>
    <div
      absolute items-center justify-center flex
      z-0 inset-0 bg="black op70" @click="close"
    >
      <div rounded="full" bg="gray900" z-1 op60 p-2 absolute left-10 bottom-10 cursor-pointer @click.stop="changePage('pre')">
        <div text="gray200" i-carbon-arrow-left />
      </div>
      <img :src="imageSrc" h="7/8" object-contain>
      <div rounded="full" bg="gray900" op60 p-2 absolute right-10 bottom-10 cursor-pointer @click.stop="changePage('next')">
        <div text="gray200" z-1 i-carbon-arrow-right />
      </div>
    </div>
  </div>
</template>
