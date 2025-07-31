import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // 状态
  const messages = ref([])
  const isLoading = ref(false)
  const currentModel = ref('GPT-3.5')
  const theme = ref('light')

  // 计算属性
  const hasMessages = computed(() => messages.value.length > 0)
  const lastMessage = computed(() => messages.value[messages.value.length - 1])

  // Actions
  const addMessage = (message) => {
    messages.value.push({
      id: Date.now(),
      content: message.content,
      role: message.role, // 'user' | 'assistant'
      timestamp: new Date(),
    })
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
    messages.value = []
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    // 保存到 localStorage
    localStorage.setItem('chatgpt-theme', newTheme)
  }

  const setModel = (model) => {
    currentModel.value = model
  }

  // 初始化主题（从 localStorage 读取）
  const initTheme = () => {
    const savedTheme = localStorage.getItem('chatgpt-theme')
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
    messages.value.push(aiMessage)
    setLoading(false)

    // 实现打字效果
    const chars = randomResponse.split('')
    let currentText = ''

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i]

      // 找到对应的消息并更新内容
      const messageIndex = messages.value.findIndex((m) => m.id === messageId)
      if (messageIndex !== -1) {
        messages.value[messageIndex].content = currentText
      }

      // 控制打字速度
      const delay = chars[i] === '\n' ? 100 : Math.random() * 50 + 20
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  return {
    // 状态
    messages,
    isLoading,
    currentModel,
    theme,
    // 计算属性
    hasMessages,
    lastMessage,
    // Actions
    addUserMessage,
    addAssistantMessage,
    setLoading,
    clearMessages,
    setTheme,
    setModel,
    initTheme,
    simulateAIResponse,
  }
})
