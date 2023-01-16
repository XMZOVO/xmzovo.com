<script>
import { webVitals } from './vitals'
const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID
webVitals({
  path: window.location.pathname,
  analyticsId,
})
</script>

<template>
  <main font-sans h-screen text=" center gray-700 dark:gray-200">
    <RouterView />
  </main>
</template>
