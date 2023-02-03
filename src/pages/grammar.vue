<script setup lang="ts">
import axios from 'axios'
import { onClickOutside, useElementBounding, useElementSize } from '@vueuse/core'
import gsap from 'gsap'

interface Book {
  name: string
  active: boolean
}
interface Grammar {
  id: number
  title: string
  page: string
  path: string
  level: null | string
}
interface Feedback {
  id: number
  content: string
  sendTime: string
  likes: number
  status: number
}

let blueGrammar = $ref<Grammar[]>([])
let preGrammar = $ref<Grammar[]>([])
let masterGrammar = $ref<Grammar[]>([])
let dicGrammar = $ref<Grammar[]>([])
let imageSrc = $ref('')
let selectedImgPath = $ref('')
const feedbackBtn = ref(null)
const feebackBtnBounding = reactive(useElementBounding(feedbackBtn))
const feedbackBtnSize = reactive(useElementSize(feedbackBtn))
const feedbackForm = ref(null)
onClickOutside(feedbackForm, (_) => {
  gsap.to(feedbackForm.value, { display: 'none', duration: 0 })
})
let feedbackMessage = $ref('')
let feedbackList = $ref<Feedback[]>([])
const pagePathInfo = computed(() => {
  const regex = /([^\(]*\()(\d+)(.+)/
  const match = selectedImgPath.match(regex)
  if (match)
    return match
})
const ip = 'https://zhongpeiying.com:8081'
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

watch(inputContent, (val) => {
  if (val === '') {
    blueGrammar = []
    preGrammar = []
    masterGrammar = []
    dicGrammar = []
    return
  }
  fetchGrammar(val)
})

async function fetchGrammar(title: string) {
  const res = await axios({ url: `${ip}/grammar/title/${title}`, method: 'GET' })
  if (res.data) {
    blueGrammar = res.data.blue
    preGrammar = res.data.pre
    masterGrammar = res.data.master
    dicGrammar = res.data.dic
  }
}

function selectGrammar(grammar: Grammar) {
  imageSrc = `${ip}/file/${grammar.path}`
  selectedImgPath = grammar.path
}

function changePage(type: 'pre' | 'next') {
  const preFix = pagePathInfo.value![1]
  const page = type === 'pre' ? +pagePathInfo.value![2] - 1 : +pagePathInfo.value![2]! + 1
  const suffix = pagePathInfo.value![3]
  selectedImgPath = `${preFix}${page}${suffix}`
  imageSrc = `${ip}/file/${selectedImgPath}`
}

async function toggleFeedback() {
  const x = feebackBtnBounding.x + feedbackBtnSize.width / 2
  const y = feebackBtnBounding.y + feedbackBtnSize.height
  gsap
    .to(feedbackForm.value, { display: 'flex', x, y, duration: 0 })
  gsap.from(feedbackForm.value, { opacity: 0, scaleX: 0, scaleY: 0, ease: 'back', transformOrigin: 'top left', duration: 0.3 })
  const res = await axios.get(`${ip}/grammar/feedback`)
  feedbackList = res.data
}

async function sendFeedback() {
  await axios.post(`${ip}/grammar/feedback`, { content: feedbackMessage })
  feedbackMessage = ''
  const res = await axios.get(`${ip}/grammar/feedback`)
  feedbackList = res.data
}

async function toggleLike(id: number) {
  await axios.post(`${ip}/grammar/feedback/like/${id}`)
  const res = await axios.get(`${ip}/grammar/feedback`)
  feedbackList = res.data
}
</script>

<template>
  <div ref="feedbackForm" overflow-hidden absolute hidden border="~ gray500 op20" rounded bg="white dark:hex-121212" z-50>
    <div flex-col p="2" gap-2 w-50 max-h-80 flex>
      <div row items-center justify-center gap-1>
        <input v-model="feedbackMessage" placeholder="留下你的反馈" border="~ gray500 op20" bg="dark:hex-121212" rounded text-xs p="x2 y-1" flex-1 outline-none>
        <div i-carbon-send text-gray-500 cursor-pointer @click="sendFeedback" />
      </div>
      <div id="feedbackList" flex flex-col overflow-y-auto gap-2 flex-1>
        <div v-for="item in feedbackList" :key="item.id" w-full h-20 flex flex-col border="~ gray500 op20" text-xs rounded p-2>
          <p text-left flex-1>
            {{ item.content.length > 40 ? `${item.content.slice(0, 40)}...` : item.content }}
          </p>
          <div row justify-end items-center gap-1>
            <div i-carbon-thumbs-up cursor-pointer @click="toggleLike(item.id)" />
            <p text-left w-5>
              {{ item.likes }}
            </p>
            <div
              :class="{
                'i-carbon-ai-status-queued op40': item.status === 0,
                'i-carbon-ai-status-in-progress text-orange': item.status === 1,
                'i-carbon-ai-status-complete text-green': item.status === 2,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div grid="~ md:cols-2" gap-2 px-8 h-full of-hidden>
    <div h-full grid="~ rows-[min-content_min-content_1fr]" of-hidden>
      <div row text-left py-4 items-center>
        <a>
          <h1>
            <span block font-600>文法查阅-3046</span>
            <span block op50 font-500 text-sm>Ver 1.4</span>
          </h1>
        </a>
        <div :class="{ 'i-material-symbols-light-mode-outline': !isDark, 'i-material-symbols-dark-mode-outline-rounded': isDark }" cursor-pointer transition duration-500 hover="rotate-180" ml-3 md:ml-5 @click="toggleDark()" />
        <div ref="feedbackBtn" i-carbon-ibm-watson-assistant cursor-pointer transition duration-500 ml-3 md:ml-5 @click="toggleFeedback" />
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
        <input v-model="inputContent" p="x6 y4" autocomplete="off" type="text" w-full placeholder="日本語！" bg-transparent border-none outline-none>
        <div v-if="inputContent !== ''" cursor-pointer mr-3 text="gray400 op60" i-carbon-close @click="inputContent = ''" />
      </div>
      <div border="l b r gray-400 op20" mx-2 of-auto>
        <div v-for="item, index in activeBookList" :key="index">
          <div v-for="i in item" :key="i.id" hover=" bg-op-10 op100" bg="gray-300 op0" op70 border="b gray-400 op20" row gap-3 text-left items-center p="x2 y3" cursor-pointer select-none @click="selectGrammar(i)">
            <div
              p="1" w-6 text-center :class="{
                'bg-blue': i.level === 'N5',
                'bg-green': i.level === 'N4',
                'bg-yellow': i.level === 'N3',
                'bg-orange': i.level === 'N2',
                'bg-rose': i.level === 'N1',
              }" rounded text="xs gray100"
            >
              {{ i.level }}
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
      <div of-y-scroll of-auto h-full flex flex-col gap-5 rounded>
        <img
          object-cover
          :src="imageSrc"
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
</template>

<style>
#feedbackList::-webkit-scrollbar {
    display: none;
}
</style>
