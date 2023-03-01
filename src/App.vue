<script setup lang="ts">
import reportWebVitals from './reportWebVitals'
import { sendToVercelAnalytics } from './vitals'

reportWebVitals(sendToVercelAnalytics)
</script>

<template>
  <main font-sans absolute inset-0 text=" center gray-700 dark:gray-200">
    <RouterView />
  </main>
</template>
