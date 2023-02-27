<script setup lang="ts">
import { useVModel } from '@vueuse/core'
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

const show = useVModel(props, 'modelValue', emit, { passive: true })

function close() {
  show.value = false
  emit('close')
}
</script>

<template>
  <div v-show="show" absolute flex flex-col mx-auto items-center top-0 justify-center z-3 w-full h-full bg="black op40" @click="close">
    <img :src="imageSrc" h="7/8" object-contain>
  </div>
</template>
