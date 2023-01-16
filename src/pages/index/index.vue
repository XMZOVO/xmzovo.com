<script setup lang="ts">
import { BaseScene } from '../babylon/baseScene'

let base3D: BaseScene
const renderCanvas = ref(null)

onMounted(async () => {
  base3D = new BaseScene(renderCanvas.value!)
})
</script>

<template>
  <div flex flex-col flex-grow justify-between>
    <canvas ref="renderCanvas" outline-none />
    <p text-xl font-bold op60 py-5>
      -WIP-
    </p>
  </div>
</template>
