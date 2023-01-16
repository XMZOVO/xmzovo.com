<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const imageList
= $ref([
  '/ai/00006-3306937555-1girls, absurdres, alternate costume, arms behind back, bangs, bare shoulders, beach, bikini, blush, breasts, brown eyes, brown.png',
  '/ai/00007-1506516237-a young women in purple dress,smile.png',
  '/ai/00008-196781799-a young women in purple dress,smile.png',
  '/ai/00009-4155301374-a young women in purple dress,smile.png',
  '/ai/00030-2364034770-((masterpiece)), best quality, perfect anatomy, (1girl, solo focus_1.4), pov, looking at viewer, flower trim,(perspective, sidew.png',
  '/ai/00031-2175775102-((masterpiece)), best quality, perfect anatomy, (1girl, solo focus_1.4), pov, looking at viewer, flower trim,(perspective, sidew.png',
  '/ai/00032-2139748875-street, 130mm f1.4 lens, ,(shiny skin_1.3),, (teen age, school uniform_1.2), (glasses, black hair, medium hair with queue and br.png',
  '/ai/00033-3592312772-street, 130mm f1.4 lens, ,(shiny skin_1.3),, (teen age, school uniform_1.2), (glasses, black hair, medium hair with queue and br.png',
  '/ai/00034-210308202-street, 130mm f1.4 lens, ,(shiny skin_1.3),, (teen age, school uniform_1.2), (glasses, black hair, medium hair with queue and br.png',
  '/ai/00046-2232684427-masterpiece, best quality, ultra-detailed, illustration，women, black stocking.png',
  '/ai/00052-2784872079-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00053-697950055-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00054-1180635908-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00055-487811581-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00056-719421158-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00057-4117033441-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00058-510585084-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00059-2096397951-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00060-740839559-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00061-2079707877-masterpiece, best quality, ultra-detailed, illustration,1girl, solo, young, white-collar, working, woman, drinking, drunk, walki.png',
  '/ai/00051-62243867-1girl, solo, young, white-collar, working, woman, drinking, drunk, walking, unsteady, street, background.png',
])
const loadedImgList = ref<boolean[]>([])

watchArray(loadedImgList, async (value, oldValue) => {
  if (value.length === imageList.length) {
    for (let i = 1; i <= 3; i++) {
      const line = document.querySelector(`.c${i}`) as HTMLElement
      const speed = 200 // (in pixels per second)
      const links = line.querySelectorAll('.imgs') as any

      const tl = verticalLoop(links, (i % 2 === 0) ? speed : -speed)

      links.forEach((link: any) => {
        link.addEventListener('mouseenter', () => gsap.to(tl, { timeScale: 0, overwrite: true }))
        link.addEventListener('mouseleave', () => gsap.to(tl, { timeScale: 1, overwrite: true }))
      })
    }
  }
})

const imgColList = computed(() => {
  // 如果isLargeScreen为true将imageList分为三列
  const col1: string[] = []
  const col2: string[] = []
  const col3: string[] = []
  imageList.forEach((item, index) => {
    if (index % 3 === 0)
      col1.push(item)

    else if (index % 3 === 1)
      col2.push(item)

    else
      col3.push(item)
  })
  return [col1, col2, col3]
})

// 我也看不懂这个函数的逻辑，但是它可以实现无限循环的滚动效果
// TODO：修改循环后图片间隔增加的问题
function verticalLoop(elements: HTMLElement[], speed: number) {
  elements = gsap.utils.toArray(elements)
  const firstBounds = elements[0].getBoundingClientRect()
  const lastBounds = elements[elements.length - 1].getBoundingClientRect()
  const top = firstBounds.top - firstBounds.height - Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom)
  const bottom = lastBounds.top
  const distance = bottom - top

  const duration = Math.abs(distance / speed)
  const tl = gsap.timeline({ repeat: -1 })
  const plus = speed < 0 ? '-=' : '+='
  const minus = speed < 0 ? '+=' : '-='
  elements.forEach((el) => {
    const bounds = el.getBoundingClientRect()
    let ratio = Math.abs((bottom - bounds.top) / distance)
    if (speed < 0)
      ratio = 1 - ratio
    tl.to(el, {
      y: plus + distance * ratio,
      duration: duration * ratio,
      ease: 'none',
    }, 0)
    tl.fromTo(el, {
      y: minus + distance,
    }, {
      y: plus + (1 - ratio) * distance,
      ease: 'none',
      duration: (1 - ratio) * duration,
      immediateRender: false,
    }, duration * ratio)
  })
  return tl
}

function imgLoaded() {
  loadedImgList.value = [...loadedImgList.value, true]
}
</script>

<template>
  <div flex w-full px-20>
    <div grid grid-cols-1 md:grid-cols-3 gap-2>
      <div v-for="it, i in imgColList" :key="i" flex flex-col w-full gap-2 of-y-clip :class="[`c${i + 1}`]">
        <div v-for="item in it" :key="item" class="imgs" hover="z-2">
          <TheAiImg :src="item" @load="imgLoaded" />
        </div>
      </div>
    </div>
  </div>
</template>

