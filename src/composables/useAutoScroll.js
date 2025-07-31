import { ref, nextTick } from 'vue'

export function useAutoScroll() {
  const containerRef = ref(null)

  const scrollToBottom = (smooth = true) => {
    nextTick(() => {
      if (containerRef.value) {
        containerRef.value.scrollTo({
          top: containerRef.value.scrollHeight,
          behavior: smooth ? 'smooth' : 'auto',
        })
      }
    })
  }

  const isAtBottom = () => {
    if (!containerRef.value) return true

    const { scrollTop, scrollHeight, clientHeight } = containerRef.value
    return scrollTop + clientHeight >= scrollHeight - 10 // 10px 容差
  }

  return {
    containerRef,
    scrollToBottom,
    isAtBottom,
  }
}
