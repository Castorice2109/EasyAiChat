<template>
  <div class="p-4 bg-base-100 border-t border-base-200">
    <div class="max-w-4xl mx-auto">
      <div class="relative flex items-end">
        <textarea
          ref="textareaRef"
          v-model="message"
          @keydown="handleKeydown"
          :disabled="isLoading"
          placeholder="输入您的问题... (Shift+Enter 换行，Enter 发送)"
          class="textarea textarea-bordered w-full pr-14 resize-none min-h-[3rem] max-h-32 flex-1"
          :class="{ 'textarea-disabled': isLoading }"
          rows="1"
        ></textarea>

        <button
          @click="sendMessage"
          :disabled="!canSend"
          class="btn btn-primary btn-sm absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 min-h-8"
          :class="{ 'btn-disabled': !canSend }"
          title="发送消息"
        >
          <svg
            v-if="!isLoading"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
          <span v-else class="loading loading-spinner loading-xs"></span>
        </button>
      </div>

      <!-- 提示信息 -->
      <div class="flex justify-between items-center mt-2 text-xs opacity-60">
        <div>
          {{ isLoading ? 'AI 正在回复中...' : '按 Enter 发送，Shift+Enter 换行' }}
        </div>
        <div>{{ message.length }}/2000</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const { isLoading } = storeToRefs(chatStore)

const message = ref('')
const textareaRef = ref(null)

// 计算是否可以发送消息
const canSend = computed(() => {
  return message.value.trim().length > 0 && !isLoading.value && message.value.length <= 2000
})

// 自动调整 textarea 高度
const adjustTextareaHeight = () => {
  nextTick(() => {
    if (textareaRef.value) {
      const textarea = textareaRef.value

      // 重置高度计算准确的 scrollHeight
      textarea.style.height = 'auto'

      const scrollHeight = textarea.scrollHeight
      const minHeight = 48 // 3rem
      const maxHeight = 128 // max-h-32

      // 设置高度
      const newHeight = Math.max(minHeight, Math.min(scrollHeight, maxHeight))
      textarea.style.height = newHeight + 'px'

      // 只有当内容真正超过最大高度时才显示滚动条
      if (scrollHeight > maxHeight) {
        textarea.classList.add('has-scroll')
      } else {
        textarea.classList.remove('has-scroll')
      }
    }
  })
}

// 监听消息变化，调整高度
watch(message, adjustTextareaHeight)

// 处理键盘事件
const handleKeydown = (event) => {
  // Enter 发送消息（非 Shift+Enter）
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// 发送消息
const sendMessage = async () => {
  if (!canSend.value) return

  const userMessage = message.value.trim()
  message.value = ''

  // 重置 textarea 高度
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })

  // 添加用户消息
  chatStore.addUserMessage(userMessage)

  // 模拟 AI 响应
  await chatStore.simulateAIResponse(userMessage)
}
</script>

<style scoped>
/* 确保 textarea 的基本样式正确 */
textarea {
  line-height: 1.5;
  padding-top: 0.6875rem; /* 调整到合适的值让 placeholder 居中 */
  padding-bottom: 0.6875rem;
  overflow-y: hidden;
  transition: all 0.2s ease;
}

/* placeholder 样式 */
textarea::placeholder {
  line-height: 1.5;
  opacity: 0.6;
}

/* 当有内容且超过一行时显示滚动条 */
textarea.has-scroll {
  overflow-y: auto;
}

/* 优化聚焦状态 */
textarea:focus {
  outline: none;
}
</style>
