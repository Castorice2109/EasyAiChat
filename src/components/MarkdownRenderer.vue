<template>
  <div
    class="markdown-body"
    :class="{ 'markdown-body-dark': isDarkTheme }"
    v-html="renderedContent"
  ></div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'github-markdown-css/github-markdown-light.css'
import 'github-markdown-css/github-markdown-dark.css'
import { useChatStore } from '@/stores/chat'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const chatStore = useChatStore()
const { theme } = storeToRefs(chatStore)

const isDarkTheme = computed(() => theme.value === 'dark')

// 配置 Markdown 渲染器
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }
    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})

const renderedContent = computed(() => {
  return md.render(props.content)
})
</script>

<style scoped>
/* GitHub 样式基础设置 */
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

/* 浅色主题（默认） */
.markdown-body {
  color: #1f2328;
  background-color: transparent;
}

/* 浅色主题代码高亮 */
.markdown-body :deep(.hljs) {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
}

.markdown-body :deep(.hljs-comment),
.markdown-body :deep(.hljs-quote) {
  color: #998;
  font-style: italic;
}

.markdown-body :deep(.hljs-keyword),
.markdown-body :deep(.hljs-selector-tag),
.markdown-body :deep(.hljs-subst) {
  color: #333;
  font-weight: bold;
}

.markdown-body :deep(.hljs-number),
.markdown-body :deep(.hljs-literal),
.markdown-body :deep(.hljs-variable),
.markdown-body :deep(.hljs-template-variable),
.markdown-body :deep(.hljs-tag .hljs-attr) {
  color: #008080;
}

.markdown-body :deep(.hljs-string),
.markdown-body :deep(.hljs-doctag) {
  color: #d14;
}

.markdown-body :deep(.hljs-title),
.markdown-body :deep(.hljs-section),
.markdown-body :deep(.hljs-selector-id) {
  color: #900;
  font-weight: bold;
}

.markdown-body :deep(.hljs-subst) {
  font-weight: normal;
}

.markdown-body :deep(.hljs-type),
.markdown-body :deep(.hljs-class .hljs-title) {
  color: #458;
  font-weight: bold;
}

.markdown-body :deep(.hljs-tag),
.markdown-body :deep(.hljs-name),
.markdown-body :deep(.hljs-attribute) {
  color: #000080;
  font-weight: normal;
}

.markdown-body :deep(.hljs-regexp),
.markdown-body :deep(.hljs-link) {
  color: #009926;
}

.markdown-body :deep(.hljs-symbol),
.markdown-body :deep(.hljs-bullet) {
  color: #990073;
}

.markdown-body :deep(.hljs-built_in),
.markdown-body :deep(.hljs-builtin-name) {
  color: #0086b3;
}

.markdown-body :deep(.hljs-meta) {
  color: #999;
  font-weight: bold;
}

.markdown-body :deep(.hljs-deletion) {
  background: #fdd;
}

.markdown-body :deep(.hljs-addition) {
  background: #dfd;
}

.markdown-body :deep(.hljs-emphasis) {
  font-style: italic;
}

.markdown-body :deep(.hljs-strong) {
  font-weight: bold;
}

/* 深色主题 */
.markdown-body-dark {
  color: #e6edf3 !important;
  background-color: transparent !important;
}

/* 深色主题代码高亮 */
.markdown-body-dark :deep(.hljs) {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #e6edf3;
  background: #0d1117;
}

.markdown-body-dark :deep(.hljs-comment),
.markdown-body-dark :deep(.hljs-quote) {
  color: #7d8590;
  font-style: italic;
}

.markdown-body-dark :deep(.hljs-keyword),
.markdown-body-dark :deep(.hljs-selector-tag),
.markdown-body-dark :deep(.hljs-subst) {
  color: #ff7b72;
  font-weight: bold;
}

.markdown-body-dark :deep(.hljs-number),
.markdown-body-dark :deep(.hljs-literal),
.markdown-body-dark :deep(.hljs-variable),
.markdown-body-dark :deep(.hljs-template-variable),
.markdown-body-dark :deep(.hljs-tag .hljs-attr) {
  color: #79c0ff;
}

.markdown-body-dark :deep(.hljs-string),
.markdown-body-dark :deep(.hljs-doctag) {
  color: #a5d6ff;
}

.markdown-body-dark :deep(.hljs-title),
.markdown-body-dark :deep(.hljs-section),
.markdown-body-dark :deep(.hljs-selector-id) {
  color: #d2a8ff;
  font-weight: bold;
}

.markdown-body-dark :deep(.hljs-subst) {
  font-weight: normal;
}

.markdown-body-dark :deep(.hljs-type),
.markdown-body-dark :deep(.hljs-class .hljs-title) {
  color: #ffa657;
  font-weight: bold;
}

.markdown-body-dark :deep(.hljs-tag),
.markdown-body-dark :deep(.hljs-name),
.markdown-body-dark :deep(.hljs-attribute) {
  color: #7ee787;
  font-weight: normal;
}

.markdown-body-dark :deep(.hljs-regexp),
.markdown-body-dark :deep(.hljs-link) {
  color: #a5d6ff;
}

.markdown-body-dark :deep(.hljs-symbol),
.markdown-body-dark :deep(.hljs-bullet) {
  color: #ffa657;
}

.markdown-body-dark :deep(.hljs-built_in),
.markdown-body-dark :deep(.hljs-builtin-name) {
  color: #ffa657;
}

.markdown-body-dark :deep(.hljs-meta) {
  color: #7d8590;
  font-weight: bold;
}

.markdown-body-dark :deep(.hljs-deletion) {
  background: #67060c;
}

.markdown-body-dark :deep(.hljs-addition) {
  background: #033a16;
}

.markdown-body-dark :deep(.hljs-emphasis) {
  font-style: italic;
}

.markdown-body-dark :deep(.hljs-strong) {
  font-weight: bold;
}

/* 深色主题下的其他元素样式覆盖 */
.markdown-body-dark :deep(h1),
.markdown-body-dark :deep(h2),
.markdown-body-dark :deep(h3),
.markdown-body-dark :deep(h4),
.markdown-body-dark :deep(h5),
.markdown-body-dark :deep(h6) {
  color: #e6edf3 !important;
  border-bottom-color: #30363d !important;
}

.markdown-body-dark :deep(code) {
  background-color: rgba(110, 118, 129, 0.4) !important;
  color: #e6edf3 !important;
}

.markdown-body-dark :deep(pre) {
  background-color: #0d1117 !important;
  color: #e6edf3 !important;
}

.markdown-body-dark :deep(blockquote) {
  color: #7d8590 !important;
  border-left-color: #30363d !important;
}

.markdown-body-dark :deep(table th),
.markdown-body-dark :deep(table td) {
  border-color: #30363d !important;
}

.markdown-body-dark :deep(table th) {
  background-color: #161b22 !important;
  color: #e6edf3 !important;
}

.markdown-body-dark :deep(table tr:nth-child(2n)) {
  background-color: #0d1117 !important;
}

.markdown-body-dark :deep(a) {
  color: #58a6ff !important;
}

.markdown-body-dark :deep(a):hover {
  color: #79c0ff !important;
}

.markdown-body-dark :deep(hr) {
  background-color: #30363d !important;
}
</style>
