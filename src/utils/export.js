export function exportChatToMarkdown(messages, title = 'ChatGPT 对话记录') {
  const timestamp = new Date().toLocaleString('zh-CN')

  let markdown = `# ${title}\n\n`
  markdown += `**导出时间**: ${timestamp}\n\n`
  markdown += `---\n\n`

  messages.forEach((message, index) => {
    const role = message.role === 'user' ? '👤 用户' : '🤖 AI 助手'
    const time = new Date(message.timestamp).toLocaleTimeString('zh-CN')

    markdown += `## ${role} (${time})\n\n`
    markdown += `${message.content}\n\n`

    if (index < messages.length - 1) {
      markdown += `---\n\n`
    }
  })

  return markdown
}

export function downloadAsFile(content, filename, type = 'text/markdown') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

export function exportChatAsMarkdown(messages) {
  if (messages.length === 0) {
    throw new Error('没有对话内容可导出')
  }

  const markdown = exportChatToMarkdown(messages)
  const timestamp = new Date().toISOString().slice(0, 10)
  const filename = `easy-ai-chat-conversation-${timestamp}.md`

  downloadAsFile(markdown, filename)
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}
