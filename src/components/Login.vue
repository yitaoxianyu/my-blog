<template>
  <div class="login-container"> <!-- 使用 Flexbox 容器 -->
    <el-row justify="center" align="middle" style="height: 100vh;"> <!-- 让行高为视口高度 -->
      <div class="button-container">
        <el-col>
          <el-input
              v-model="userName"
              class="input-field"
              placeholder="请输入用户名"
              :prefix-icon="UserFilled"
          />
        </el-col>
        <el-col>
          <el-input
              v-model="password"
              class="input-field"
              type="password"
              placeholder="请输入密码"
              show-password
          />
        </el-col>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDirectives } from 'vue';
import axios from 'axios';
import {UserFilled} from '@element-plus/icons-vue';

const userName = ref('');
const password = ref('');

async function handleLogin(){
  try {
    const response = await axios.get('/user/user/login',
    {
      params : {
        username : userName.value,
        password : password.value,
      },
      withCredentials : true
    });
    const data = response.data; // 获取返回的数据
    console.log('返回的数据:', data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}




</script>

<style>
.login-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 使容器高度为视口高度 */
}

.input-field {
  width: 240px; /* 设置输入框宽度 */
  margin-bottom: 20px; /* 设置输入框之间的间距 */
}

.button-container {
  display: flex;
  flex-direction: column; /* 垂直排列输入框和按钮 */
  align-items: center; /* 水平居中 */
}
</style>
  