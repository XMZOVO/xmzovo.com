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
    name: 'Grammar3046',
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
  <div h-full flex flex-col>
    <div py-9 px-5vw flex items-center justify-between gap10>
      <a cursor-pointer font-bold text-2xl @click="gotoPage('/')">
        XMZOVO
      </a>
      <div md:flex items-center justify-center gap10 font-bold hidden>
        <a v-for="item, index in navItem" :key="index" :class="[activeRoute === item.link ? 'op100' : 'op70']" hover="op100" cursor-pointer @click="gotoPage(item.link)">
          {{ item.name }}
        </a>
      </div>
      <div flex items-center justify-center gap-2 cursor-pointer>
        <a rounded-full border="2 gray-700 op10" hover="border-op-100" transition duration-200 p2 @click="toggleDark()">
          <div i-carbon-sun />
        </a>
        <a rounded-full border-2 p2 border="2 gray-700 op10" hover="border-op-100" href="https://github.com/XMZOVO/xmzovo.com" transition duration-200 cursor-pointer>
          <div i-carbon-code />
        </a>
      </div>
    </div>
    <RouterView />
  </div>
</template>
