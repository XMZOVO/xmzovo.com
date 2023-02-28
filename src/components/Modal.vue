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
</script>

<template>
  <div ref="modalRef" hidden>
    <div absolute inset-0 z-0 bg="black op70" flex items-center justify-center>
      <div relative py-5 mx-5 w-sm bg="white dark:hex-121212" rounded-xl flex flex-col justify-center items-center>
        <h1 font-bold text-lg p="b3">
          Ver1.6 更新
        </h1>
        <div flex flex-col text-start items-start gap-3 select="none">
          <div>🫠 修复了搜索和图片加载卡顿</div>
          <div>🤔 添加了初版图片大图预览功能</div>
          <div>📧 反馈功能改为邮件发送</div>
        </div>
        <div text-lg absolute top-2 right-2 i-carbon-close @click.stop="show = false" />
      </div>
    </div>
  </div>
</template>
