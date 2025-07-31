<template>
  <div class="min-h-screen flex flex-col" :data-theme="theme">
    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 聊天区域 -->
    <ChatArea />

    <!-- 底部输入区域 -->
    <ChatInput />

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
import NavBar from '@/components/NavBar.vue'
import ChatArea from '@/components/ChatArea.vue'
import ChatInput from '@/components/ChatInput.vue'
import ToastNotification from '@/components/ToastNotification.vue'

const chatStore = useChatStore()
const { theme } = storeToRefs(chatStore)
const { showToast } = useToast()

// 键盘快捷键
useKeyboardShortcuts({
  clearChat: () => {
    if (chatStore.hasMessages) {
      chatStore.clearMessages()
      showToast('对话已清空 (Ctrl+K)', 'success')
    }
  },
  toggleTheme: () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    chatStore.setTheme(newTheme)
    showToast(`已切换到${newTheme === 'light' ? '浅色' : '深色'}主题 (Ctrl+/)`, 'success')
  },
  cancelRequest: () => {
    if (chatStore.isLoading) {
      chatStore.setLoading(false)
      showToast('已取消当前请求', 'warning')
    }
  },
})

// 初始化主题
onMounted(() => {
  chatStore.initTheme()
})
</script>

<style scoped>
/* 确保应用占满整个视口 */
#app {
  min-height: 100vh;
}
</style>
