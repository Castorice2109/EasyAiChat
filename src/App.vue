<template>
  <div class="min-h-screen flex" :data-theme="theme">
    <!-- 主内容区域 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 侧边栏 -->
      <SidebarWrapper />

      <!-- 折叠侧边栏时的展开按钮（仅桌面端） -->
      <div
        v-if="sidebarCollapsed"
        class="fixed top-1/2 left-2 z-50 transform -translate-y-1/2 hidden lg:block"
      >
        <button
          @click="toggleSidebar"
          class="btn btn-circle btn-sm bg-base-100 shadow-lg border border-base-200"
          title="展开侧边栏"
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
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- 聊天区域 -->
      <div class="flex-1 flex flex-col">
        <ChatArea />
        <!-- 底部输入区域 -->
        <ChatInput />
      </div>
    </div>

    <!-- Toast 通知 -->
    <ToastNotification />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import { useToast } from '@/composables/useToast'
import SidebarWrapper from '@/components/SidebarWrapper.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'
import ToastNotification from '@/components/ToastNotification.vue'

const chatStore = useChatStore()
const { theme, sidebarCollapsed } = storeToRefs(chatStore)
const { showToast } = useToast()

// 折叠/展开侧边栏
const toggleSidebar = () => {
  chatStore.toggleSidebar()
}

// 键盘快捷键
useKeyboardShortcuts({
  clearChat: () => {
    if (chatStore.hasMessages) {
      chatStore.clearMessages()
      showToast('对话已清空 (Ctrl+K)', 'success')
    }
  },
  toggleSidebar: () => {
    toggleSidebar()
  },
  cancelRequest: () => {
    if (chatStore.isLoading) {
      chatStore.setLoading(false)
      showToast('已取消当前请求', 'warning')
    }
  },
})

// 初始化主题和数据
onMounted(() => {
  chatStore.initTheme()
  chatStore.loadConversationsFromStorage()
})
</script>

<style scoped>
/* 确保应用占满整个视口 */
#app {
  min-height: 100vh;
}
</style>
