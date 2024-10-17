<template>
    <div class="header-container">
      <el-menu
        ellipsis
        class="el-menu-popper-demo"
        mode="horizontal"
        :popper-offset="16"
        style="max-width: 100vw"
      >
        <el-menu-item index="1" v-on:click="handleNavigate(url.home)">返回首页</el-menu-item>
        <el-sub-menu index="2" :popper-offset="8">
          <template #title>我的文章</template>
          <el-menu-item index="2-1">事件轴</el-menu-item>
          <el-menu-item index="2-2">分类</el-menu-item>
          <el-menu-item index="2-3">标签</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">日志</el-menu-item>
        <el-menu-item index="4">关于我</el-menu-item>
        <el-menu-item index="5" class="menu-item-github">
          <span>GitHub</span> <!-- 可选的文本 -->
          <a href="https://github.com/yitaoxianyu" class="github-link">
            <i class="fa-brands fa-github"></i>
          </a>
        </el-menu-item>
      </el-menu>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { url } from '@/constants/url';
  
  const router = useRouter();
  
  const handleNavigate = (url: string) => {
    router.push(url);
  };
  </script>
  
  <style>
  .menu-item-github {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: flex-end; /* 右对齐 */
  }
  
  .github-link {
    display: inline-flex; /* 保持图标的行内特性 */
    align-items: center; /* 垂直居中 */
    margin-left: 8px; /* 图标与文本之间的间距 */
  }
  </style>
  