# 🤖 ChatGPT Mock Web

一个基于 Vue 3 的现代化 ChatGPT 模拟界面应用，具备完整的对话功能、Markdown 渲染、主题切换和导出功能。

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-FF6B6B?style=flat-square)
![Pinia](https://img.shields.io/badge/Pinia-2.0-FDD835?style=flat-square)
![TypeScript](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat-square&logo=vite)

## ✨ 特性亮点

- 🎨 **现代化界面**：使用 Tailwind CSS + DaisyUI 构建的美观 UI
- 🌓 **主题切换**：支持明暗主题，设置持久化保存
- 💬 **智能对话**：多轮对话支持，模拟真实 AI 交互体验
- 📝 **Markdown 渲染**：完整支持 Markdown 语法和代码高亮
- ⚡ **打字效果**：逼真的 AI 响应打字动画
- 📱 **响应式设计**：完美适配桌面端和移动端
- ⌨️ **快捷键支持**：丰富的键盘快捷键操作
- 📤 **导出功能**：支持导出为 Markdown 文件或复制到剪贴板
- 🔧 **模型选择**：支持切换不同 AI 模型
- 🚀 **性能优化**：基于 Vite 的快速开发和构建

## 🛠️ 技术栈

- **Frontend**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Styling**: Tailwind CSS + DaisyUI
- **Markdown**: Markdown-it + Highlight.js
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0 || >= 22.12.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev
```

访问 http://localhost:5174 查看应用

### 生产构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 📖 使用说明

### 基本操作

1. **发送消息**: 在底部输入框输入内容，按 `Enter` 发送
2. **多行输入**: 使用 `Shift + Enter` 换行
3. **清空对话**: 点击清空按钮或按 `Ctrl/Cmd + K`
4. **切换主题**: 点击主题按钮或按 `Ctrl/Cmd + /`
5. **复制消息**: 点击消息旁的复制按钮
6. **导出对话**: 使用导出功能保存对话记录

### 快捷键

| 快捷键          | 功能         |
| --------------- | ------------ |
| `Enter`         | 发送消息     |
| `Shift + Enter` | 换行         |
| `Ctrl/Cmd + K`  | 清空对话     |
| `Ctrl/Cmd + /`  | 切换主题     |
| `Esc`           | 取消当前请求 |

### 功能特色

- 🤖 **AI 模拟响应**: 智能的预设回复，支持代码、列表、表格等格式
- 📋 **消息管理**: 完整的对话历史记录和状态管理
- 🎯 **智能滚动**: 自动滚动到底部，智能显示滚动按钮
- 🔒 **数据持久化**: 主题设置等用户偏好自动保存

## 🎨 自定义配置

### 主题配置

在 `tailwind.config.js` 中可以自定义 DaisyUI 主题：

```javascript
daisyui: {
  themes: ["light", "dark", "cupcake", "cyberpunk"],
  // 更多主题选项...
}
```

### AI 响应内容

在 `src/stores/chat.js` 中可以自定义 AI 回复内容：

```javascript
const responses = [
  '自定义回复内容...',
  // 添加更多预设回复
]
```

## 📁 项目结构

```
src/
├── components/          # Vue 组件
│   ├── ChatArea.vue    # 聊天区域
│   ├── ChatInput.vue   # 输入框
│   ├── ChatMessage.vue # 消息组件
│   ├── MarkdownRenderer.vue # Markdown 渲染器
│   ├── NavBar.vue      # 导航栏
│   └── ToastNotification.vue # 通知组件
├── composables/        # 组合式函数
│   ├── useAutoScroll.js # 自动滚动
│   ├── useKeyboardShortcuts.js # 快捷键
│   └── useToast.js     # 通知
├── stores/             # Pinia 状态管理
│   └── chat.js         # 聊天状态
├── utils/              # 工具函数
│   └── export.js       # 导出功能
├── App.vue             # 根组件
├── main.js             # 入口文件
└── style.css           # 全局样式
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🎯 路线图

- [ ] 添加聊天历史记录管理
- [ ] 支持文件上传和图片识别
- [ ] 添加语音输入功能
- [ ] 支持插件系统
- [ ] 添加多语言支持
- [ ] 集成真实 AI API

---

**Enjoy chatting!** 🚀✨
