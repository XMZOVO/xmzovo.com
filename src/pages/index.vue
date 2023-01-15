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

let activeRoute = $ref('/')
const router = useRouter()

onBeforeRouteUpdate((to, from) => {
  activeRoute = to.path
})

const gotoPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div h-full>
    <div px-4 pb-5 flex items-center justify-between gap10>
      <div font-bold text-2xl>
        Newborn
      </div>
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
