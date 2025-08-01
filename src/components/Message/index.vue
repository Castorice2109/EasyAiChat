<template>
  <div
    ref="messageRef"
    class="flex mb-6 overflow-hidden px-4"
    :class="[inversion ? 'justify-end' : 'justify-start']"
  >
    <div class="flex max-w-[80%]" :class="[inversion ? 'flex-row-reverse' : 'flex-row']">
      <div
        class="flex items-center justify-center flex-shrink-0 h-8 overflow-hidden rounded-full basis-8"
        :class="[inversion ? 'ml-2' : 'mr-2']"
      >
        <Avatar :image="inversion" />
      </div>
      <div class="overflow-hidden text-sm" :class="[inversion ? 'items-end' : 'items-start']">
        <p class="text-xs text-[#b4bbc4]" :class="[inversion ? 'text-right' : 'text-left']">
          {{ dateTime }}
        </p>
        <div
          class="flex items-end gap-1 mt-2"
          :class="[inversion ? 'flex-row-reverse' : 'flex-row']"
        >
          <Text
            ref="textRef"
            :inversion="inversion"
            :error="error"
            :text="text"
            :loading="loading"
            :as-raw-text="asRawText"
          />
          <div class="flex flex-col">
            <button
              v-if="!inversion"
              class="mb-2 transition text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-300"
              @click="handleRegenerate"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <div class="dropdown dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="transition text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow-lg border border-base-200"
              >
                <li v-if="!inversion">
                  <a @click="handleToggleRenderType">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    {{ asRawText ? '预览' : '显示原文' }}
                  </a>
                </li>
                <li>
                  <a @click="handleCopy">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    复制
                  </a>
                </li>
                <li>
                  <a @click="handleDelete" class="text-error">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    删除
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Avatar from './Avatar.vue'
import Text from './Text.vue'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  dateTime: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  inversion: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['regenerate', 'delete'])

const { showToast } = useToast()

const textRef = ref()
const asRawText = ref(props.inversion)
const messageRef = ref()

function handleRegenerate() {
  messageRef.value?.scrollIntoView()
  emit('regenerate')
}

function handleToggleRenderType() {
  asRawText.value = !asRawText.value
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.text || '')
    showToast('复制成功', 'success')
  } catch {
    showToast('复制失败', 'error')
  }
}

function handleDelete() {
  emit('delete')
}
</script>
