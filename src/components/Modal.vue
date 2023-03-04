<script setup lang="ts">
import gsap from 'gsap'

const props = withDefaults(defineProps<{
  modelValue: boolean
}>(), {
  modelValue: false,
})

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:modelValue', value: boolean): void
}>()

const modalRef = ref<HTMLDivElement>()

const modalTl = gsap.timeline({ paused: true })

const show = useVModel(props, 'modelValue', emit, { passive: true })

watchEffect(() => {
  if (show.value)
    modalTl.play()
  else
    modalTl.reverse()
})

onMounted(() => {
  modalTl
    .to(modalRef.value!, { display: 'flex', duration: 0 })
    .from(modalRef.value!, { opacity: 0, duration: 0.3 })
})

const navToBook = () => {
  window.open('http://zhongpeiying.com:5244/%E6%97%A5%E8%AF%AD/%E5%B7%A5%E5%85%B7%E4%B9%A6')
}

const navToTest = () => {
  window.open('http://zhongpeiying.com:5244/%E6%97%A5%E8%AF%AD/%E7%9C%9F%E9%A2%98')
}
</script>

<template>
  <div ref="modalRef" hidden>
    <div absolute inset-0 z-0 bg="black op70" flex items-center justify-center>
      <div relative py-5 mx-5 w-sm bg="white dark:hex-121212" rounded-xl flex flex-col justify-center items-center>
        <h1 font-bold text-lg p="b3">
          Ver1.7 更新
        </h1>
        <div flex flex-col text-start items-start gap-3 select="none">
          <div>🎉 太方便了！全新的工具书与真题存储库</div>
          <div flex items-center text="lg">
            🫶
            <span text="xs" op60>
              PS:任何想要添加的书都可以从反馈功能发送
            </span>
          </div>
          <div flex w-full justify-between gap-5>
            <button w="1/2" p="x-1 y-2" bg-orange transition-all duration="200" rounded="md" text="white" hover="shadow-lg" @click="navToBook">
              🦄 去工具书
            </button>
            <button w="1/2" p="x-1 y-2" rounded="md" transition-all duration="200" bg-rose text="white" hover="shadow-lg" @click="navToTest">
              🍿 去真题
            </button>
          </div>
        </div>
        <button text-lg absolute top-2 right-2 i-carbon-close @click.stop="show = false" />
      </div>
    </div>
  </div>
</template>
