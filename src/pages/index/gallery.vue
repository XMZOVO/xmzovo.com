<script setup lang="ts">
import { gsap } from 'gsap'

const imageList
= [
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
]
const column1 = ref<HTMLElement | null>(null)
const column2 = ref<HTMLElement | null>(null)
const column3 = ref<HTMLElement | null>(null)
const view = ref<HTMLElement | null>(null)
const col1Size = useElementSize(column1)
const col2Size = useElementSize(column2)
const col3Size = useElementSize(column3)
const viewSize = useElementSize(view)

const imgColList = computed(() => {
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

onMounted(() => {
  setTimeout(() => {
    gsap.to('.c1', {
      duration: imageList.length * 1.5,
      ease: 'none',
      y: `-=${col1Size.height.value - viewSize.height.value}`,
      repeat: -1,
    })
    gsap.to('.c2', {
      duration: imageList.length * 1.5,
      ease: 'none',
      y: `+=${col2Size.height.value - viewSize.height.value}`,
      repeat: -1,
    })
    gsap.to('.c3', {
      duration: imageList.length * 1.5,
      ease: 'none',
      y: `-=${col3Size.height.value - viewSize.height.value}`,
      repeat: -1,
    })
  }, 300)
})
</script>

<template>
  <div flex w-full justify-between h-full gap-2 px-10>
    <div ref="view" flex flex-col w-full of-y-clip of-x-visible relative hover="z-2">
      <div ref="column1" class="c1" absolute flex flex-col gap-2>
        <TheAiImg v-for="item in imgColList[0]" :key="item" :src="item" />
      </div>
    </div>
    <div flex flex-col w-full gap-2 of-y-clip of-x-visible flex-col-reverse relative hover="z-2">
      <div ref="column2" class="c2" absolute gap-2 flex flex-col>
        <TheAiImg v-for="item in imgColList[1]" :key="item" :src="item" />
      </div>
    </div>
    <div flex flex-col w-full gap-2 of-y-clip of-x-visible relative hover="z-2">
      <div ref="column3" class="c3" absolute gap-2 flex flex-col>
        <TheAiImg v-for="item in imgColList[1]" :key="item" :src="item" />
      </div>
    </div>
  </div>
</template>
