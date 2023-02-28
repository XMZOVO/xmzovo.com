<script setup lang="ts">
import { onClickOutside, useElementBounding, useElementSize } from '@vueuse/core'
import axios from 'axios'
import gsap from 'gsap'
import { isRomaji, toKana } from 'wanakana'

import { IP } from './utils/cons'

interface Book {
  name: string
  active: boolean
}
interface Grammar {
  id: number
  title: string
  path: string
  level: null | number
}

let blueGrammar = $ref<Grammar[]>([])
let preGrammar = $ref<Grammar[]>([])
let masterGrammar = $ref<Grammar[]>([])
let dicGrammar = $ref<Grammar[]>([])
let imageSrc = $ref('')
let selectedImgPath = $ref('')
const newFeatureVisible = $ref(false)
const previewVisible = $ref(false)
const feedbackBtn = ref(null)
const feebackBtnBounding = reactive(useElementBounding(feedbackBtn))
const feedbackBtnSize = reactive(useElementSize(feedbackBtn))
const feedbackForm = ref(null)
onClickOutside(feedbackForm, (_) => {
  gsap.to(feedbackForm.value, { display: 'none', duration: 0 })
})
let feedbackMessage = $ref('')
const pagePathInfo = computed(() => {
  const regex = /([^\(]*\()(\d+)(.+)/
  const match = selectedImgPath.match(regex)
  if (match)
    return match
})
const ip = IP
const inputContent = ref('')
const bookList = $ref<Book[]>([
  { name: '蓝宝书', active: true },
  { name: '考前对策', active: true },
  { name: '完全掌握', active: false },
  { name: '文型辞典', active: false },
])
const activeBookList = computed(() => {
  return bookList.map((book) => {
    switch (book.name) {
      case '蓝宝书':
        return book.active ? blueGrammar : []
      case '考前对策':
        return book.active ? preGrammar : []
      case '完全掌握':
        return book.active ? masterGrammar : []
      case '文型辞典':
        return book.active ? dicGrammar : []
      default:
        return null
    }
  })
})
const currentVersion = $ref('1.6')

watch(inputContent, (val) => {
  if (val === '') {
    blueGrammar = []
    preGrammar = []
    masterGrammar = []
    dicGrammar = []
    return
  }
  if (isRomaji(val))
    val = toKana(val)
  fetchGrammar(val)
})

async function fetchGrammar(title: string) {
  const res = await axios({ url: `${ip}/getGrammar/${title}`, method: 'GET' })
  if (res.data) {
    blueGrammar = res.data.blue
    preGrammar = res.data.pre
    masterGrammar = res.data.master
    dicGrammar = res.data.sentence
  }
}

function selectGrammar(grammar: Grammar) {
  imageSrc = `${ip}/static${grammar.path}`
  selectedImgPath = grammar.path
}

function changePage(type: 'pre' | 'next') {
  const preFix = pagePathInfo.value![1]
  const page = type === 'pre' ? +pagePathInfo.value![2] - 1 : +pagePathInfo.value![2]! + 1
  const suffix = pagePathInfo.value![3]
  selectedImgPath = `${preFix}${page}${suffix}`
  imageSrc = `${ip}/static${selectedImgPath}`
}

async function toggleFeedback() {
  const x = feebackBtnBounding.x + feedbackBtnSize.width / 2
  const y = feebackBtnBounding.y + feedbackBtnSize.height
  gsap
    .to(feedbackForm.value, { display: 'flex', x, y, duration: 0 })
  gsap
    .from(feedbackForm.value, { opacity: 0, scaleX: 0, scaleY: 0, ease: 'back', transformOrigin: 'top left', duration: 0.3 })
}

async function sendFeedback() {
  axios({ url: `${ip}/sendEmail`, method: 'POST', params: { content: feedbackMessage } })
  feedbackMessage = ''
}

function navigateToBiliBili() {
  window.open('https://space.bilibili.com/65988295/')
}
</script>

<template>
  <div ref="feedbackForm" overflow-hidden absolute hidden border="~ gray500 op20" rounded bg="white dark:hex-121212" z-2>
    <div flex-col p="2" gap-2 w-50 max-h-80 flex>
      <div row items-center justify-center gap-1>
        <input v-model="feedbackMessage" placeholder="反馈会发往开发者邮箱" border="~ gray500 op20" bg="dark:hex-121212" rounded text-xs p="x2 y-1" flex-1 outline-none>
        <div i-carbon-send text-gray-500 cursor-pointer @click="sendFeedback" />
      </div>
    </div>
  </div>
  <div grid="~ md:cols-2" gap-2 px-8 h-full of-hidden>
    <div h-full grid="~ rows-[min-content_min-content_1fr]" of-hidden>
      <div row text-left py-4 items-center>
        <a>
          <h1>
            <span block font-600 cursor-pointer @click="navigateToBiliBili">文法查阅-3046</span>
            <div flex items-center gap="2">
              <span block op50 font-500 text-sm flex>Ver {{ currentVersion }}
              </span>
              <span
                cursor-pointer bg="red op60" hover="bg-op100" transition-all duration-250 rounded-sm px-1
                text="white xs" @click="() => { newFeatureVisible = true }"
              >New</span>
            </div>
          </h1>
        </a>
        <div :class="{ 'i-material-symbols-light-mode-outline': !isDark, 'i-material-symbols-dark-mode-outline-rounded': isDark }" cursor-pointer transition duration-500 hover="rotate-180" ml-3 md:ml-5 @click="toggleDark()" />
        <div ref="feedbackBtn" i-carbon-ibm-watson-assistant hidden sm:block cursor-pointer transition duration-500 ml-3 md:ml-5 @click="toggleFeedback" />
        <div flex-auto />
        <div row items-center gap4 text-sm>
          <div v-for="item, index in bookList" :key="item.name">
            <div row items-center text-xs cursor-pointer gap1 @click="item.active = !item.active">
              <div
                :class="{
                  'i-fa-book text-blue': index === 0,
                  'i-fa-book text-yellow': index === 1,
                  'i-fa-book text-orange': index === 2,
                  'i-fa-book text-purple': index === 3,
                  'grayscale': !item.active,
                }"
              />
              <div hidden lg:block>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div row items-center border="~ rounded gray-400 op20" font-200 text-2xl shadow relative>
        <input v-model="inputContent" p="x6 y4" autocomplete="off" type="text" w-full placeholder="日本語！(支持罗马字)" bg-transparent border-none outline-none>
        <div v-if="inputContent !== ''" cursor-pointer mr-3 text="gray400 op60" i-carbon-close @click="inputContent = ''" />
      </div>
      <div border="l b r gray-400 op20" mx-2 of-auto>
        <div v-for="item, index in activeBookList" :key="index">
          <div v-for="i in item" :key="i.id" hover=" bg-op-10 op100" bg="gray-300 op0" op70 border="b gray-400 op20" row gap-3 text-left items-center p="x2 y3" cursor-pointer select-none @click="selectGrammar(i)">
            <div
              p="1" w-6 text-center :class="{
                'bg-blue': i.level === 5,
                'bg-green': i.level === 4,
                'bg-yellow': i.level === 3,
                'bg-orange': i.level === 2,
                'bg-rose': i.level === 1,
              }" rounded text="xs gray100"
            >
              {{ typeof (i.level) === "number" ? `N${i.level}` : '' }}
            </div>
            <div>{{ i.title }}</div>
            <div flex-1 />
            <div w-4 mr-2>
              <div

                :class="{
                  'i-fa-book text-blue': index === 0,
                  'i-fa-book text-yellow': index === 1,
                  'i-fa-book text-orange': index === 2,
                  'i-fa-book text-purple': index === 3,
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="imageSrc" h-full of-hidden p="md:l4 sm:t8" text="gray100" flex flex-col>
      <div of-y-auto h-full flex flex-col gap-5 rounded>
        <img
          cursor-pointer
          object-cover
          :src="imageSrc"
          @click="() => { previewVisible = true }"
        >
      </div>
      <div row justify-end text="sm gray400 op80" gap-2 m="y2">
        <button border="~ gray400 op20 hover:op80" transition duration-200 p="x4 y1" rounded @click="changePage('pre')">
          上一页
        </button>
        <button border="~ gray400 op20 hover:op80" p="x4 y1" transition duration-200 rounded @click="changePage('next')">
          下一页
        </button>
      </div>
    </div>
  </div>
  <PreviewImg v-model="previewVisible" :image-src="imageSrc" @change-page="changePage" />
  <Modal v-model="newFeatureVisible" />
</template>

<style>
#feedbackList::-webkit-scrollbar {
    display: none;
}
</style>
