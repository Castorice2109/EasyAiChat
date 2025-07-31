<template>
  <div class="flex-1 overflow-hidden relative flex flex-col">
    <!-- 聊天操作工具栏 - 固定在顶部 -->
    <div v-if="hasMessages" class="px-4 py-3 border-b border-base-200">
      <div class="flex justify-start items-center space-x-4">
        <!-- 模型信息 -->
        <div class="flex items-center space-x-3">
          <span class="text-sm opacity-70">当前模型:</span>
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
              <span class="text-sm font-medium">{{ currentModel }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow-lg border border-base-200"
            >
              <li>
                <a @click="setModel('GPT-3.5')" class="justify-between">
                  <span>GPT-3.5</span>
                  <span v-if="currentModel === 'GPT-3.5'" class="text-primary">✓</span>
                </a>
              </li>
              <li>
                <a @click="setModel('GPT-4')" class="justify-between">
                  <span>GPT-4</span>
                  <span v-if="currentModel === 'GPT-4'" class="text-primary">✓</span>
                </a>
              </li>
              <li>
                <a @click="setModel('自定义模型')" class="justify-between">
                  <span>自定义模型</span>
                  <span v-if="currentModel === '自定义模型'" class="text-primary">✓</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 导出功能 -->
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="ml-1">导出</span>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border border-base-200"
          >
            <li>
              <a @click="exportAsMarkdown">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                导出为 Markdown
              </a>
            </li>
            <li>
              <a @click="copyAllMessages">
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
                复制全部对话
              </a>
            </li>
          </ul>
        </div>

        <!-- 清空对话 -->
        <button @click="clearChat" class="btn btn-ghost btn-sm" title="清空当前对话 (Ctrl+K)">
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span class="ml-1">清空</span>
        </button>
      </div>
    </div>

    <!-- 消息列表 -->
    <div ref="containerRef" class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
      <!-- 欢迎消息 -->
      <div v-if="!hasMessages" class="text-center py-16">
        <div class="hero">
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">👋</h1>
              <h2 class="text-2xl font-bold py-6">欢迎使用 ChatGPT Mock</h2>
              <p class="py-6">
                这是一个基于 Vue 3 开发的 ChatGPT 模拟界面。您可以在下方输入框中输入问题，体验 AI
                对话的乐趣！
              </p>

              <!-- 模型选择器 -->
              <div class="flex justify-center mb-6">
                <div class="flex items-center space-x-3">
                  <span class="text-sm font-medium">选择模型:</span>
                  <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-outline btn-sm">
                      <span class="text-sm">{{ currentModel }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <ul
                      tabindex="0"
                      class="dropdown-content menu bg-base-100 rounded-box z-[1] w-48 p-2 shadow-lg border border-base-200"
                    >
                      <li>
                        <a @click="setModel('GPT-3.5')" class="justify-between">
                          <span>GPT-3.5</span>
                          <span v-if="currentModel === 'GPT-3.5'" class="text-primary">✓</span>
                        </a>
                      </li>
                      <li>
                        <a @click="setModel('GPT-4')" class="justify-between">
                          <span>GPT-4</span>
                          <span v-if="currentModel === 'GPT-4'" class="text-primary">✓</span>
                        </a>
                      </li>
                      <li>
                        <a @click="setModel('自定义模型')" class="justify-between">
                          <span>自定义模型</span>
                          <span v-if="currentModel === '自定义模型'" class="text-primary">✓</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div class="card bg-base-200 shadow-sm">
                  <div class="card-body p-4">
                    <h3 class="card-title text-sm">💡 示例问题</h3>
                    <p class="text-xs opacity-70">解释一下什么是 Vue 3 的组合式 API</p>
                  </div>
                </div>
                <div class="card bg-base-200 shadow-sm">
                  <div class="card-body p-4">
                    <h3 class="card-title text-sm">🔧 技术支持</h3>
                    <p class="text-xs opacity-70">支持 Markdown 渲染和代码高亮</p>
                  </div>
                </div>
              </div>
              <div class="mt-8 text-sm opacity-60">
                <p>💡 小贴士：</p>
                <p>• 使用 Ctrl+K 快速清空对话</p>
                <p>• 使用 Ctrl+/ 切换明暗主题</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 消息列表 -->
      <div v-for="message in messages" :key="message.id" class="group">
        <ChatMessage :message="message" />
      </div>

      <!-- 加载中提示 -->
      <div v-if="isLoading" class="message-container">
        <div class="flex justify-start mb-3">
          <div class="flex items-start space-x-3 max-w-[70%]">
            <div class="flex flex-col items-center">
              <div
                class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold"
              >
                AI
              </div>
            </div>

            <div class="ai-thinking-container flex-1">
              <div class="ai-thinking-content">
                <div class="flex items-center space-x-2">
                  <span class="loading loading-dots loading-sm"></span>
                  <span>AI 正在思考...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 滚动到底部按钮 -->
    <div v-if="showScrollButton" class="absolute bottom-4 right-4">
      <button
        @click="scrollToBottom"
        class="btn btn-circle btn-sm bg-base-100 shadow-lg border border-base-200"
        title="滚动到底部"
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
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { useAutoScroll } from '@/composables/useAutoScroll'
import { useToast } from '@/composables/useToast'
import { exportChatAsMarkdown, exportChatToMarkdown, copyToClipboard } from '@/utils/export'
import ChatMessage from './ChatMessage.vue'

const chatStore = useChatStore()
const { messages, isLoading, hasMessages, currentModel } = storeToRefs(chatStore)
const { showToast } = useToast()

const { containerRef, scrollToBottom, isAtBottom } = useAutoScroll()
const showScrollButton = ref(false)

// 监听滚动，决定是否显示滚动到底部按钮
const handleScroll = () => {
  showScrollButton.value = !isAtBottom()
}

// 监听消息变化，自动滚动到底部
watch(
  messages,
  () => {
    if (isAtBottom()) {
      scrollToBottom()
    }
  },
  { deep: true },
)

watch(isLoading, (loading) => {
  if (loading) {
    scrollToBottom()
  }
})

// 添加滚动监听器
watch(
  containerRef,
  (container) => {
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
  },
  { immediate: true },
)

// 清空对话
const clearChat = () => {
  if (chatStore.hasMessages) {
    chatStore.clearMessages()
    showToast('对话已清空', 'success')
  }
}

// 设置模型
const setModel = (model) => {
  chatStore.setModel(model)
  showToast(`已切换到 ${model}`, 'success')
}

// 导出为Markdown
const exportAsMarkdown = () => {
  try {
    exportChatAsMarkdown(messages.value)
    showToast('对话已导出为 Markdown 文件', 'success')
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 复制全部对话
const copyAllMessages = async () => {
  try {
    const markdown = exportChatToMarkdown(messages.value)
    await copyToClipboard(markdown)
    showToast('全部对话已复制到剪贴板', 'success')
  } catch (error) {
    showToast('复制失败', 'error')
  }
}
</script>

<style scoped>
/* 思考中消息容器样式 */
.message-container {
  margin: 0 auto;
  max-width: 800px;
  padding: 0 1rem;
}

/* AI 思考容器 */
.ai-thinking-container {
  max-width: 100%;
  width: 100%;
}

.ai-thinking-content {
  color: #1f2937;
  opacity: 0.8;
}

/* 深色主题下的样式 */
[data-theme='dark'] .ai-thinking-content {
  color: #e2e8f0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .message-container {
    max-width: 100%;
    padding: 0 0.5rem;
  }
}
</style>
