<template>
  <!-- 移动端汉堡菜单按钮 -->
  <button
    class="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost btn-sm bg-base-100 shadow-lg border border-base-200"
    @click="toggleMobileSidebar"
    title="菜单"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <!-- 移动端遮罩层 -->
  <div
    v-if="mobileSidebarOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    @click="closeMobileSidebar"
  ></div>

  <!-- 桌面端侧边栏 -->
  <div
    class="hidden lg:flex flex-col h-full bg-base-200 border-r border-base-300 transition-all duration-300"
    :class="[sidebarCollapsed ? 'w-0 opacity-0' : 'w-80']"
  >
    <SidebarContent />
  </div>

  <!-- 移动端侧边栏 -->
  <div
    class="lg:hidden fixed top-0 left-0 h-full bg-base-200 border-r border-base-300 z-50 transition-transform duration-300 w-80"
    :class="[mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full']"
  >
    <SidebarContent :is-mobile="true" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import SidebarContent from './SidebarContent.vue'

const chatStore = useChatStore()
const { sidebarCollapsed, mobileSidebarOpen } = storeToRefs(chatStore)

const closeMobileSidebar = () => {
  chatStore.setMobileSidebarOpen(false)
}

const toggleMobileSidebar = () => {
  chatStore.toggleMobileSidebar()
}
</script>
