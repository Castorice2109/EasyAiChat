<template>
  <div class="text-base-content" :class="wrapClass">
    <div ref="textRef" class="leading-relaxed break-words">
      <div v-if="loading" class="flex items-center space-x-2">
        <div class="loading loading-dots loading-sm"></div>
        <span>AI 正在思考...</span>
      </div>
      <div v-else-if="!inversion">
        <div
          v-if="!asRawText"
          class="markdown-body"
          :class="{ 'markdown-body-generate': loading }"
          v-html="text"
        />
        <div v-else class="whitespace-pre-wrap" v-text="text" />
      </div>
      <div v-else class="whitespace-pre-wrap" v-text="text" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import MdKatex from '@vscode/markdown-it-katex'
import MdLinkAttributes from 'markdown-it-link-attributes'
import hljs from 'highlight.js'

const props = defineProps({
  inversion: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  asRawText: {
    type: Boolean,
    default: false,
  },
})

const textRef = ref()

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(MdLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } }).use(MdKatex)

const wrapClass = computed(() => {
  return [
    'text-wrap',
    'min-w-[20px]',
    'rounded-md',
    'px-3 py-2',
    props.inversion ? 'bg-user-message' : 'bg-ai-message',
    props.inversion ? 'message-request' : 'message-reply',
    { 'text-red-500': props.error },
  ]
})

const text = computed(() => {
  const value = props.text ?? ''
  if (!props.asRawText) {
    // 对数学公式进行处理，自动添加 $$ 符号
    const escapedText = escapeBrackets(escapeDollarNumber(value))
    return mdi.render(escapedText)
  }
  return value
})

function highlightBlock(str, lang) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

function addCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.parentElement?.nextElementSibling?.textContent
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            btn.textContent = '已复制'
            setTimeout(() => {
              btn.textContent = '复制代码'
            }, 1000)
          })
        }
      })
    })
  }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.removeEventListener('click', () => {})
    })
  }
}

function escapeDollarNumber(text) {
  let escapedText = ''

  for (let i = 0; i < text.length; i += 1) {
    let char = text[i]
    const nextChar = text[i + 1] || ' '

    if (char === '$' && nextChar >= '0' && nextChar <= '9') char = '\\$'

    escapedText += char
  }

  return escapedText
}

function escapeBrackets(text) {
  const pattern = /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\\]|\\\((.*?)\\\)/g
  return text.replace(pattern, (match, codeBlock, squareBracket, roundBracket) => {
    if (codeBlock) return codeBlock
    else if (squareBracket) return `$$${squareBracket}$$`
    else if (roundBracket) return `$${roundBracket}$`
    return match
  })
}

onMounted(() => {
  addCopyEvents()
})

onUpdated(() => {
  addCopyEvents()
})

onUnmounted(() => {
  removeCopyEvents()
})
</script>

<style scoped>
/* 消息背景色 */
.bg-user-message {
  background-color: #d2f9d1;
}

.bg-ai-message {
  background-color: #f4f6f8;
}

[data-theme='dark'] .bg-user-message {
  background-color: #a1dc95;
}

[data-theme='dark'] .bg-ai-message {
  background-color: #1e1e20;
}

/* Markdown样式 */
:deep(.markdown-body) {
  background-color: transparent;
  font-size: 14px;
}

:deep(.markdown-body p) {
  white-space: pre-wrap;
}

:deep(.markdown-body ol) {
  list-style-type: decimal;
}

:deep(.markdown-body ul) {
  list-style-type: disc;
}

:deep(.markdown-body pre code),
:deep(.markdown-body pre tt) {
  line-height: 1.65;
}

:deep(.markdown-body .highlight pre),
:deep(.markdown-body pre) {
  background-color: #fff;
  font-size: 14px;
  line-height: 1.5;
}

/* 深色主题下的代码块背景 */
:deep([data-theme='dark'] .markdown-body .highlight pre),
:deep([data-theme='dark'] .markdown-body pre) {
  background-color: #282c34 !important;
}

/* 确保深色主题下的代码块样式 */
[data-theme='dark'] :deep(.code-block-wrapper) {
  background-color: #282c34 !important;
}

[data-theme='dark'] :deep(.markdown-body pre),
[data-theme='dark'] :deep(.markdown-body .highlight pre) {
  background-color: #282c34 !important;
}

:deep(.markdown-body code.hljs) {
  padding: 0;
}

:deep(.code-block-wrapper) {
  position: relative;
  padding-top: 24px;
}

:deep(.code-block-header) {
  position: absolute;
  top: 5px;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b3b3b3;
}

:deep(.code-block-header__copy) {
  cursor: pointer;
  margin-left: 0.5rem;
  user-select: none;
}

:deep(.code-block-header__copy:hover) {
  color: #65a665;
}

/* 生成动画 */
:deep(.markdown-body-generate > *:last-child::after) {
  animation: blink 1s steps(5, start) infinite;
  color: #000;
  content: '_';
  font-weight: 700;
  margin-left: 3px;
  vertical-align: baseline;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

/* 深色主题 */
:deep([data-theme='dark'] .markdown-body-generate > *:last-child::after) {
  color: #65a665;
}

/* 深色主题下的消息回复文本颜色 */
:deep([data-theme='dark'] .message-reply .whitespace-pre-wrap) {
  color: #c9d1d9;
}

:deep(.dark .message-reply .whitespace-pre-wrap) {
  white-space: pre-wrap;
  color: var(--tw-text-opacity);
}

:deep(.dark .markdown-body .highlight pre),
:deep(.dark .markdown-body pre) {
  background-color: #282c34;
}

/* 移动端优化 */
@media screen and (max-width: 533px) {
  :deep(.markdown-body .code-block-wrapper) {
    padding: unset;
  }

  :deep(.markdown-body .code-block-wrapper code) {
    padding: 24px 16px 16px 16px;
  }
}
</style>
