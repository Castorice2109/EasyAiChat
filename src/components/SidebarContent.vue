<template>
  <div class="flex flex-col h-full">
    <!-- 侧边栏头部 -->
    <div class="flex items-center justify-between p-4 border-b border-base-300">
      <div class="flex items-center">
        <h2 class="text-lg font-semibold">历史会话</h2>
      </div>
      <div class="flex items-center space-x-2">
        <!-- 主题切换按钮 -->
        <button
          @click="toggleTheme"
          class="btn btn-ghost btn-sm"
          :title="`切换到${theme === 'light' ? '深色' : '浅色'}主题`"
        >
          <svg
            v-if="theme === 'light'"
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
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <svg
            v-else
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
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

        <!-- 新建对话按钮 -->
        <button @click="createNewChat" class="btn btn-ghost btn-sm" title="新建对话">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        <!-- 移动端关闭按钮 -->
        <button
          v-if="isMobile"
          @click="closeMobileSidebar"
          class="btn btn-ghost btn-sm lg:hidden"
          title="关闭"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- 桌面端折叠按钮 -->
        <button
          v-if="!isMobile"
          @click="toggleSidebar"
          class="btn btn-ghost btn-sm hidden lg:flex"
          title="折叠侧边栏"
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
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 对话列表 -->
    <div class="flex-1 overflow-y-auto p-2 space-y-1">
      <div v-for="conversation in conversations" :key="conversation.id" class="group relative">
        <div
          class="w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer relative"
          :class="[
            currentConversationId === conversation.id
              ? 'bg-base-300/60 border-l-4 border-l-primary'
              : 'bg-base-100 hover:bg-base-200',
          ]"
          @click="switchToConversation(conversation.id)"
        >
          <!-- 对话标题 -->
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <div
                v-if="editingConversationId === conversation.id"
                class="flex items-center space-x-2"
                @click.stop
              >
                <input
                  ref="titleInput"
                  v-model="editingTitle"
                  @blur="finishEditing"
                  @keyup.enter="finishEditing"
                  @keyup.escape="cancelEditing"
                  class="input input-xs flex-1 bg-base-100 text-base-content border-primary/50"
                />
              </div>
              <div v-else class="truncate">
                <h3 class="text-sm font-medium truncate">
                  {{ conversation.title }}
                </h3>
                <p class="text-xs opacity-60 mt-1">
                  {{ formatTime(conversation.updatedAt) }}
                </p>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div
              class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
              @click.stop
            >
              <!-- 编辑标题 -->
              <button
                @click="startEditing(conversation)"
                class="btn btn-ghost btn-xs hover:bg-base-300 hover:text-base-content"
                title="编辑标题"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <!-- 删除对话 -->
              <button
                @click="deleteChat(conversation.id)"
                class="btn btn-ghost btn-xs hover:bg-error/20 hover:text-error"
                title="删除对话"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3"
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
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!hasConversations" class="text-center py-8 text-base-content/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mx-auto mb-3 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p class="text-sm">暂无聊天记录</p>
        <p class="text-xs mt-1">开始新的对话吧！</p>
      </div>
    </div>

    <!-- 侧边栏底部 -->
    <div class="p-4 border-t border-base-300">
      <div class="text-xs text-base-content/60 text-center">
        <p>共 {{ conversations.length }} 个对话</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const chatStore = useChatStore()
const { conversations, currentConversationId, hasConversations, sidebarCollapsed, theme } =
  storeToRefs(chatStore)

const { showToast } = useToast()

// 主题切换
const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  chatStore.setTheme(newTheme)
  showToast(`已切换到${newTheme === 'light' ? '浅色' : '深色'}主题`, 'success')
}

// 编辑状态
const editingConversationId = ref(null)
const editingTitle = ref('')
const titleInput = ref(null)

// 创建新对话
const createNewChat = () => {
  const conversation = chatStore.createNewConversation()
  if (props.isMobile) {
    chatStore.setMobileSidebarOpen(false)
  }
  showToast('已创建新对话', 'success')
}

// 切换对话
const switchToConversation = (conversationId) => {
  if (editingConversationId.value) return
  chatStore.switchConversation(conversationId)
  if (props.isMobile) {
    chatStore.setMobileSidebarOpen(false)
  }
}

// 删除对话
const deleteChat = (conversationId) => {
  const conversation = conversations.value.find((conv) => conv.id === conversationId)
  if (conversation) {
    chatStore.deleteConversation(conversationId)
    showToast(`已删除对话 "${conversation.title}"`, 'success')
  }
}

// 开始编辑标题
const startEditing = (conversation) => {
  editingConversationId.value = conversation.id
  editingTitle.value = conversation.title
  nextTick(() => {
    titleInput.value?.focus()
    titleInput.value?.select()
  })
}

// 完成编辑
const finishEditing = () => {
  if (editingConversationId.value && editingTitle.value.trim()) {
    chatStore.updateConversationTitle(editingConversationId.value, editingTitle.value.trim())
    showToast('标题已更新', 'success')
  }
  editingConversationId.value = null
  editingTitle.value = ''
}

// 取消编辑
const cancelEditing = () => {
  editingConversationId.value = null
  editingTitle.value = ''
}

// 折叠侧边栏（桌面端）
const toggleSidebar = () => {
  chatStore.toggleSidebar()
}

// 关闭移动端侧边栏
const closeMobileSidebar = () => {
  chatStore.setMobileSidebarOpen(false)
}

// 时间格式化
const formatTime = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (diffInDays === 1) {
    return '昨天'
  } else if (diffInDays < 7) {
    return `${diffInDays}天前`
  } else {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    })
  }
}
</script>
