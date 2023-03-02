<script setup lang="ts">
// import { webVitals } from './vitals'

// const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID
// if (analyticsId) {
//   webVitals({
//     path: location.pathname,
//     params: location.search,
//     analyticsId,
//     debug: import.meta.env.DEV,
//   })
// }
</script>

<template>
  <main font-sans absolute inset-0 text=" center gray-700 dark:gray-200">
    <RouterView />
  </main>
</template>
