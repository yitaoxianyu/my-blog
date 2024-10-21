<script setup lang="ts">
import { computed } from 'vue';
import useUserStore from '@/stores/User';
import { watchEffect,watch } from 'vue';


const userStore = useUserStore();
console.log(userStore.userType)
const userType = computed(() => userStore.userType)

</script>

<template>
<!-- 使用条件渲染 -->
<!-- 并且有路由守卫，如果没有token则直接返回主页 -->
<div v-if="userType === 'admin'">后台面板</div>
<div v-else>用户中心</div>
</template>

<style scoped>

</style>