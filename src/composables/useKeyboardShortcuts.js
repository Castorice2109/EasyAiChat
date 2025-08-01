import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts(shortcuts = {}) {
  const handleKeydown = (event) => {
    // Ctrl/Cmd + K: 清空对话
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      if (shortcuts.clearChat) {
        shortcuts.clearChat()
      }
    }

    // Ctrl/Cmd + /: 切换主题
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault()
      if (shortcuts.toggleTheme) {
        shortcuts.toggleTheme()
      }
    }

    // Ctrl/Cmd + B: 切换侧边栏
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault()
      if (shortcuts.toggleSidebar) {
        shortcuts.toggleSidebar()
      }
    }

    // Esc: 取消当前请求（如果正在加载）
    if (event.key === 'Escape') {
      if (shortcuts.cancelRequest) {
        shortcuts.cancelRequest()
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
