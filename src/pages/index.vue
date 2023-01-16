<script setup lang="ts">
const navItem = $ref<{ name: string; link: string }[]>([
  {
    name: 'AI Gallery',
    link: '/gallery',
  },
  {
    name: 'Nonsense',
    link: '/nonsense',
  },
  {
    name: 'Grammar3406',
    link: '/grammar',
  },
])

const router = useRouter()
const route = useRoute()
let activeRoute = $ref(route.path)

onBeforeRouteUpdate((to, from) => {
  activeRoute = to.path
})

const gotoPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div h-full>
    <div px-5vw pb-9 flex items-center justify-between gap10>
      <a href="/" font-bold text-2xl>
        Newborn
      </a>
      <div flex items-center justify-center gap10 font-bold>
        <a v-for="item, index in navItem" :key="index" :class="[activeRoute === item.link ? 'op100' : 'op70']" hover="op100" cursor-pointer @click="gotoPage(item.link)">
          {{ item.name }}
        </a>
      </div>
      <div flex items-center justify-center>
        <a rounded-full border-2 p2 @click="toggleDark()">
          <div i-carbon-sun />
        </a>
      </div>
    </div>
    <RouterView />
  </div>
</template>
