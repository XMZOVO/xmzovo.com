<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push('/')
}
</script>

<template>
  <div flex flex-col w-full h-full items-center justify-center>
    <h1 text="8xl">
      404
    </h1>
    <h1>Not Found</h1>
    <div h-5 />
    <button bg="gray200 op40" hover="bg-op60" shadow p="x-2 y-1" rounded @click="back">
      Back
    </button>
  </div>
</template>
