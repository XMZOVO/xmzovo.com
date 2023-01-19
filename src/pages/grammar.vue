<script setup lang="ts">
import axios from 'axios'

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

let blueGrammar = $ref<Grammar[]>([])
let preGrammar = $ref<Grammar[]>([])
let masterGrammar = $ref<Grammar[]>([])
let dicGrammar = $ref<Grammar[]>([])
let imageSrc = $ref('')
let selectedImgPath = $ref('')

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
  const regex = /([^\(]*\()(\d+)(.+)/
  const match = selectedImgPath.match(regex)
  if (match) {
    const preFix = match[1]
    const page = type === 'pre' ? +match[2] - 1 : +match[2] + 1
    const suffix = match[3]
    selectedImgPath = `${preFix}${page}${suffix}`
    imageSrc = `${ip}/file/${selectedImgPath}`
  }
}
</script>

<template>
  <div grid="~ sm:cols-2" gap-2 px-8 h-full of-hidden>
    <div h-full grid="~ rows-[min-content_min-content_1fr]" of-hidden>
      <div row text-left py-4 items-center>
        <a>
          <h1>
            <span block font-600>文法查阅-3046</span>
            <span block op50 font-500 text-sm>Ver 1.3</span>
          </h1>
        </a>
        <div :class="{ 'i-material-symbols-light-mode-outline': !isDark, 'i-material-symbols-dark-mode-outline-rounded': isDark }" cursor-pointer transition duration-500 hover="rotate-180" ml-5 @click="toggleDark()" />
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
              <div hidden sm:block>
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
    <div h-full of-hidden p="md:x8 t8" relative text="gray100">
      <div v-if="imageSrc !== ''" absolute w-8 h-8 flex items-center justify-center left-1 sm:left-10 top="1/2" hover="bg-op80" bg="gray700 op20" rounded-full @click="changePage('pre')">
        <div i-material-symbols-arrow-back-rounded />
      </div>
      <div v-if="imageSrc !== ''" absolute w-8 h-8 flex items-center justify-center right-5 sm:right-13 top="1/2" hover="bg-op80" bg="gray700 op20" rounded-full @click="changePage('next')">
        <div i-material-symbols-arrow-forward />
      </div>
      <div of-auto h-full>
        <img
          :src="imageSrc"
        >
      </div>
    </div>
  </div>
</template>
