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
  (event: 'update:modelValue', value: boolean): void
}>()
const previewTl = gsap.timeline({ paused: true })
const previewRef = ref<HTMLDivElement>()

const show = useVModel(props, 'modelValue', emit, { passive: true })
watchEffect(() => {
  if (show.value)
    previewTl.play()
  else
    previewTl.reverse()
})

onMounted(() => {
  previewTl
    .to(previewRef.value!, { display: 'flex', duration: 0 })
    .from(previewRef.value!, { opacity: 0, duration: 0.3 })
})

function close() {
  show.value = false
  emit('close')
}
</script>

<template>
  <div
    ref="previewRef" hidden absolute flex-col mx-auto items-center
    top-0 justify-center z-3 w-full h-full bg="black op70" @click="close"
  >
    <img :src="imageSrc" h="7/8" object-contain>
  </div>
</template>
