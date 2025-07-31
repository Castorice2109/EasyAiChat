<template>
  <div class="message-container">
    <!-- 用户消息 -->
    <div v-if="message.role === 'user'" class="flex justify-end mb-3">
      <div class="flex items-start space-x-3 max-w-[70%]">
        <div class="user-message-bubble">
          <div class="whitespace-pre-wrap">{{ message.content }}</div>

          <!-- 用户消息复制按钮 -->
          <div class="mt-2 flex justify-end">
            <button
              @click="copyMessage"
              class="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 transition-opacity"
              title="复制内容"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div
            class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
          >
            U
          </div>
          <div class="text-xs opacity-50 mt-1">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>
      </div>
    </div>

    <!-- AI 消息 -->
    <div v-else class="flex justify-start mb-3">
      <div class="flex items-start space-x-3 max-w-[70%]">
        <div class="flex flex-col items-center">
          <div
            class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold"
          >
            AI
          </div>
          <div class="text-xs opacity-50 mt-1">
            {{ formatTime(message.timestamp) }}
          </div>
        </div>

        <div class="ai-response-container flex-1">
          <div class="ai-response-content">
            <MarkdownRenderer :content="message.content" />
          </div>

          <!-- AI 消息复制按钮 -->
          <div class="mt-3 flex justify-start">
            <button
              @click="copyMessage"
              class="btn btn-ghost btn-xs opacity-70 hover:opacity-100 transition-opacity"
              title="复制内容"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span class="ml-1">复制</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
import MarkdownRenderer from './MarkdownRenderer.vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const { showToast } = useToast()

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const copyMessage = async () => {
  try {
    await navigator.clipboard.writeText(props.message.content)
    showToast('内容已复制到剪贴板', 'success')
  } catch (err) {
    showToast('复制失败', 'error')
  }
}
</script>

<style scoped>
/* 消息容器样式 */
.message-container {
  margin: 0 auto;
  max-width: 800px;
  padding: 0 1rem;
}

/* 通用悬停效果 */
.group:hover .btn,
div:hover .btn {
  opacity: 1;
}

/* 用户消息圆角矩形样式 */
.user-message-bubble {
  background-color: #f7f7f8;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* AI 响应平铺容器 */
.ai-response-container {
  max-width: 100%;
  width: 100%;
}

.ai-response-content {
  color: #1f2937;
  line-height: 1.6;
  word-wrap: break-word;
  word-break: break-word;
}

/* 深色主题下的样式 */
[data-theme='dark'] .user-message-bubble {
  background-color: #2d3748;
  color: #e2e8f0;
  border: 1px solid #4a5568;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.3),
    0 1px 2px 0 rgba(0, 0, 0, 0.2);
}

[data-theme='dark'] .ai-response-content {
  color: #e2e8f0;
}

/* AI 消息的复制按钮样式 */
.ai-response-container .btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .message-container {
    max-width: 100%;
    padding: 0 0.5rem;
  }
}
</style>
