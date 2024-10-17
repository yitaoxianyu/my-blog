<template>
    <div>
      <Loading v-if="isLoading" />
      <div v-else>
        <!-- 显示数据 -->
        <Header/>
      </div>
    </div>
  </template>
 
 <!-- 使用setup会将这个组件自动导出，并且会将导入的子组件自动注册 -->
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import Loading from '@/components/Loading.vue'; // 确保路径正确
  import Header from '@/layout/Header.vue';

      const isLoading = ref(true);
      onMounted(() => {
        setTimeout(() => {
          isLoading.value = false; // 2秒后更新为 false
        }, 2000);
      })
  </script>
  
  <style scoped>
  /* 你的样式 */
  </style>
  