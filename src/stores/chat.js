import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // 状态
  const conversations = ref([]) // 所有对话会话
  const currentConversationId = ref(null) // 当前活跃的对话ID
  const isLoading = ref(false)
  const currentModel = ref('GPT-3.5')
  const theme = ref('light')
  const sidebarCollapsed = ref(false) // 桌面端侧边栏折叠状态
  const mobileSidebarOpen = ref(false) // 移动端侧边栏打开状态

  // 计算属性
  const currentConversation = computed(() => {
    return conversations.value.find((conv) => conv.id === currentConversationId.value) || null
  })

  const messages = computed(() => {
    return currentConversation.value?.messages || []
  })

  const hasMessages = computed(() => messages.value.length > 0)
  const lastMessage = computed(() => messages.value[messages.value.length - 1])

  const hasConversations = computed(() => conversations.value.length > 0)

  // Actions
  const createNewConversation = (title = '新对话') => {
    const conversation = {
      id: `conv_${Date.now()}`,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    conversations.value.unshift(conversation)
    currentConversationId.value = conversation.id

    // 保存到本地存储
    saveConversationsToStorage()

    return conversation
  }

  const switchConversation = (conversationId) => {
    const conversation = conversations.value.find((conv) => conv.id === conversationId)
    if (conversation) {
      currentConversationId.value = conversationId
    }
  }

  const deleteConversation = (conversationId) => {
    const index = conversations.value.findIndex((conv) => conv.id === conversationId)
    if (index !== -1) {
      conversations.value.splice(index, 1)

      // 如果删除的是当前对话，切换到其他对话或创建新对话
      if (currentConversationId.value === conversationId) {
        if (conversations.value.length > 0) {
          currentConversationId.value = conversations.value[0].id
        } else {
          currentConversationId.value = null
        }
      }

      saveConversationsToStorage()
    }
  }

  const updateConversationTitle = (conversationId, newTitle) => {
    const conversation = conversations.value.find((conv) => conv.id === conversationId)
    if (conversation) {
      conversation.title = newTitle
      conversation.updatedAt = new Date()
      saveConversationsToStorage()
    }
  }

  const addMessage = (message) => {
    if (!currentConversation.value) {
      createNewConversation()
    }

    const newMessage = {
      id: Date.now(),
      content: message.content,
      role: message.role, // 'user' | 'assistant'
      timestamp: new Date(),
    }

    currentConversation.value.messages.push(newMessage)
    currentConversation.value.updatedAt = new Date()

    // 如果是第一条用户消息且标题是默认的，则更新标题
    if (
      message.role === 'user' &&
      currentConversation.value.title === '新对话' &&
      currentConversation.value.messages.length === 1
    ) {
      const title =
        message.content.length > 20 ? message.content.substring(0, 20) + '...' : message.content
      updateConversationTitle(currentConversation.value.id, title)
    }

    saveConversationsToStorage()
  }

  const addUserMessage = (content) => {
    addMessage({
      content,
      role: 'user',
    })
  }

  const addAssistantMessage = (content) => {
    addMessage({
      content,
      role: 'assistant',
    })
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const clearMessages = () => {
    if (currentConversation.value) {
      currentConversation.value.messages = []
      currentConversation.value.updatedAt = new Date()
      saveConversationsToStorage()
    }
  }

  const deleteMessage = (messageId) => {
    if (currentConversation.value) {
      const index = currentConversation.value.messages.findIndex((m) => m.id === messageId)
      if (index !== -1) {
        currentConversation.value.messages.splice(index, 1)
        currentConversation.value.updatedAt = new Date()
        saveConversationsToStorage()
      }
    }
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    // 保存到 localStorage
    localStorage.setItem('easy-ai-chat-theme', newTheme)
  }

  const setModel = (model) => {
    currentModel.value = model
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebar-collapsed', sidebarCollapsed.value.toString())
  }

  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed
    localStorage.setItem('sidebar-collapsed', collapsed.toString())
  }

  const toggleMobileSidebar = () => {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  }

  const setMobileSidebarOpen = (open) => {
    mobileSidebarOpen.value = open
  }

  // 本地存储相关方法
  const saveConversationsToStorage = () => {
    try {
      localStorage.setItem('easy-ai-chat-conversations', JSON.stringify(conversations.value))
      localStorage.setItem('current-conversation-id', currentConversationId.value || '')
    } catch (error) {
      console.error('保存对话到本地存储失败:', error)
    }
  }

  const loadConversationsFromStorage = () => {
    try {
      const saved = localStorage.getItem('easy-ai-chat-conversations')
      const savedCurrentId = localStorage.getItem('current-conversation-id')
      const savedSidebarState = localStorage.getItem('sidebar-collapsed')

      if (saved) {
        conversations.value = JSON.parse(saved)
        // 转换日期字符串为 Date 对象
        conversations.value.forEach((conv) => {
          conv.createdAt = new Date(conv.createdAt)
          conv.updatedAt = new Date(conv.updatedAt)
          conv.messages.forEach((msg) => {
            msg.timestamp = new Date(msg.timestamp)
          })
        })
      }

      if (savedCurrentId && conversations.value.find((conv) => conv.id === savedCurrentId)) {
        currentConversationId.value = savedCurrentId
      }

      if (savedSidebarState) {
        sidebarCollapsed.value = savedSidebarState === 'true'
      }
    } catch (error) {
      console.error('从本地存储加载对话失败:', error)
    }
  }

  // 初始化主题（从 localStorage 读取）
  const initTheme = () => {
    const savedTheme = localStorage.getItem('easy-ai-chat-theme')
    if (savedTheme) {
      theme.value = savedTheme
    }
  }

  // 模拟 AI 响应（带打字效果）
  const simulateAIResponse = async (userMessage) => {
    setLoading(true)

    // 模拟 AI 响应内容
    const responses = [
      '这是一个很好的问题！让我来为您详细解答。\n\n首先，我需要了解您的具体需求。根据您的描述，我建议采用以下几个步骤：\n\n1. **分析需求**：明确目标和约束条件\n2. **制定方案**：设计合适的解决策略\n3. **实施执行**：按计划逐步完成\n4. **验证测试**：确保结果符合预期\n\n希望这些建议对您有帮助！',

      '根据您的描述，我建议采用以下技术方案：\n\n```javascript\n// 示例代码\nconst solution = {\n  framework: "Vue 3",\n  stateManagement: "Pinia",\n  styling: "Tailwind CSS + DaisyUI",\n  features: [\n    "响应式设计",\n    "Markdown 支持",\n    "主题切换",\n    "键盘快捷键"\n  ]\n}\n\n// 实现步骤\nfunction implementSolution() {\n  console.log("开始实施方案...")\n  // 具体实现逻辑\n}\n```\n\n这个方案具有以下优势：\n- 🚀 性能优异\n- 📱 移动端友好\n- 🎨 界面美观\n- 🔧 易于维护',

      '感谢您的提问！这个话题确实很有意思。让我为您详细解释：\n\n## 核心概念\n\n### 基础理论\n首先，我们需要理解基本原理。这涉及到几个关键要素：\n\n1. **理论基础**\n   - 概念定义\n   - 基本原理\n   - 应用场景\n\n2. **实际应用**\n   - 具体案例\n   - 最佳实践\n   - 常见问题\n\n### 深入分析\n\n> 💡 **重要提示**：在实际应用中，需要根据具体情况进行调整。\n\n通过这种方式，我们可以:\n- ✅ 提高效率\n- ✅ 降低成本\n- ✅ 优化体验\n\n希望这些信息对您有帮助！如果还有其他问题，随时可以询问。',

      '让我为您提供一个完整的解决方案：\n\n## 🎯 解决方案概览\n\n### 📋 准备阶段\n\n首先，我们需要做好以下准备工作：\n\n| 步骤 | 内容 | 预计时间 |\n|------|------|----------|\n| 1 | 需求分析 | 1-2天 |\n| 2 | 技术选型 | 0.5天 |\n| 3 | 环境搭建 | 0.5天 |\n| 4 | 原型设计 | 1天 |\n\n### 🚀 实施步骤\n\n#### 第一步：环境配置\n```bash\n# 安装依赖\nnpm install vue@latest\nnpm install @tailwindcss/vite daisyui\nnpm install pinia vue-router\n```\n\n#### 第二步：项目结构\n```\nsrc/\n├── components/     # 组件目录\n├── stores/        # 状态管理\n├── composables/   # 组合式函数\n└── assets/        # 静态资源\n```\n\n#### 第三步：核心功能实现\n这里是关键的实现逻辑...\n\n### ✨ 预期效果\n\n完成后，您将获得：\n- 🎨 美观的用户界面\n- ⚡ 流畅的交互体验  \n- 📱 完美的响应式支持\n- 🌙 明暗主题切换\n\n如果在实施过程中遇到任何问题，请随时告诉我！',
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

    // 创建消息对象
    const messageId = Date.now()
    const aiMessage = {
      id: messageId,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
    }

    // 添加空的 AI 消息
    if (currentConversation.value) {
      currentConversation.value.messages.push(aiMessage)
      currentConversation.value.updatedAt = new Date()
    }
    setLoading(false)

    // 实现打字效果
    const chars = randomResponse.split('')
    let currentText = ''

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i]

      // 找到对应的消息并更新内容
      if (currentConversation.value) {
        const messageIndex = currentConversation.value.messages.findIndex((m) => m.id === messageId)
        if (messageIndex !== -1) {
          currentConversation.value.messages[messageIndex].content = currentText
        }
      }

      // 控制打字速度
      const delay = chars[i] === '\n' ? 100 : Math.random() * 50 + 20
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    // 保存到本地存储
    saveConversationsToStorage()
  }

  return {
    // 状态
    conversations,
    currentConversationId,
    currentConversation,
    messages,
    isLoading,
    currentModel,
    theme,
    sidebarCollapsed,
    mobileSidebarOpen,
    // 计算属性
    hasMessages,
    hasConversations,
    lastMessage,
    // Actions
    createNewConversation,
    switchConversation,
    deleteConversation,
    updateConversationTitle,
    addUserMessage,
    addAssistantMessage,
    setLoading,
    clearMessages,
    deleteMessage,
    setTheme,
    setModel,
    toggleSidebar,
    setSidebarCollapsed,
    toggleMobileSidebar,
    setMobileSidebarOpen,
    initTheme,
    loadConversationsFromStorage,
    saveConversationsToStorage,
    simulateAIResponse,
  }
})
