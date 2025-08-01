# 🤖 EasyAiChat

一个基于 Vue 3 开发的现代化 AI 聊天界面，提供流畅的对话体验和丰富的功能。

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0-FF6B6B?style=flat-square)
![Pinia](https://img.shields.io/badge/Pinia-2.0-FDD835?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat-square&logo=vite)

## ✨ 特性

- 🎯 **多对话管理** - 支持创建、切换、删除多个独立对话
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌙 **主题切换** - 支持明暗主题无缝切换
- 📝 **Markdown 渲染** - 完整支持 Markdown 语法和代码高亮
- 🔧 **代码高亮** - 内置多种编程语言语法高亮
- 📐 **数学公式** - 支持 KaTeX 数学公式渲染
- ⌨️ **快捷键支持** - 提供常用快捷键操作
- 💾 **本地存储** - 自动保存对话历史
- 🎨 **现代化 UI** - 基于 DaisyUI 的美观界面
- 🚀 **打字效果** - 模拟真实的 AI 响应效果
- 📤 **导出功能** - 支持导出为 Markdown 或复制到剪贴板

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **状态管理**: Pinia
- **样式**: Tailwind CSS + DaisyUI
- **构建工具**: Vite
- **Markdown**: markdown-it + 插件生态
- **代码高亮**: highlight.js
- **数学渲染**: KaTeX

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0 || >= 22.12.0
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## ⌨️ 快捷键

- `Ctrl + K` - 清空当前对话
- `Ctrl + B` - 切换侧边栏
- `Ctrl + /` - 切换明暗主题
- `Esc` - 取消当前请求

## 📁 项目结构

```
src/
├── components/          # Vue 组件
│   ├── Message/        # 消息组件
│   ├── ChatArea.vue    # 聊天区域
│   ├── ChatInput.vue   # 输入组件
│   ├── Sidebar.vue     # 侧边栏
│   └── ...
├── composables/        # 组合式函数
├── stores/             # Pinia 状态管理
├── styles/             # 样式文件
├── utils/              # 工具函数
└── ...
```

## 🎯 功能说明

### 多对话管理

- **创建新对话**：点击侧边栏 "+" 按钮
- **切换对话**：点击侧边栏中的对话项
- **编辑标题**：点击对话项的编辑按钮
- **删除对话**：点击对话项的删除按钮

### 侧边栏功能

- **折叠/展开**：使用 `Ctrl + B` 或点击折叠按钮
- **历史记录**：显示所有对话及其时间
- **自动标题**：根据第一条消息自动生成对话标题

### 主题切换

- 支持明暗两种主题
- 使用 `Ctrl + /` 快速切换
- 自动保存主题偏好到本地存储

### Markdown 支持

- 完整的 Markdown 语法支持
- 代码块语法高亮（支持多种编程语言）
- 数学公式渲染（KaTeX）
- 表格、链接、列表等丰富元素
- 自定义样式适配明暗主题

### 导出功能

- **Markdown 导出**：将对话导出为 .md 文件
- **复制对话**：将全部对话复制到剪贴板
- **格式化输出**：保持原有的 Markdown 格式

## 🎨 界面特色

- **现代化设计**：采用 DaisyUI 组件库，界面简洁美观
- **响应式布局**：完美适配各种屏幕尺寸
- **紧凑聊天**：优化消息布局，提高阅读体验
- **流畅动画**：丰富的过渡效果和加载动画
- **色彩协调**：精心调配的颜色方案，护眼舒适

## 📦 脚本说明

```bash
# 开发
pnpm dev          # 启动开发服务器

# 构建
pnpm build        # 构建生产版本
pnpm preview      # 预览构建结果

# 代码质量
pnpm lint         # ESLint 代码检查
pnpm format       # Prettier 代码格式化
```

## 🔧 配置文件

- `vite.config.js` - Vite 构建配置
- `tailwind.config.js` - Tailwind CSS 配置
- `eslint.config.js` - ESLint 规则配置
- `jsconfig.json` - JavaScript 项目配置

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- 提交 [GitHub Issue](https://github.com/Castorice2109/EasyAiChat/issues)
- 发起 [GitHub Discussion](https://github.com/Castorice2109/EasyAiChat/discussions)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
