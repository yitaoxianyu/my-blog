<template>
  <div class="login-container">
    <el-row justify="center" align="middle" style="height: 100vh;">
      <el-form ref="ruleFormRef" :model="ruleForm" label-width="0" class="button-container">
        <el-col>
          <el-form-item prop="userName">
            <el-input
              v-model="ruleForm.username"
              class="input-field"
              placeholder="请输入用户名"
              :prefix-icon="UserFilled"
              size="large"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              class="input-field"
              type="password"
              placeholder="请输入密码"
              show-password
              size="large"
              pattern="^[^\u4e00-\u9fa5]*$"
              title="密码不能包含汉字"
            />
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" @click="handleLogin(ruleFormRef)" style="width: 180px; height: 30px;" plain>登录</el-button>
          <el-button type="success" @click="navigateToRegister()" style="width: 180px; height: 30px;" plain>注册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<!-- 用户名和密码缺少限制功能 -->

<script lang="ts" setup>
import { reactive, ref, withDirectives, nextTick } from 'vue';
import axios , {AxiosError} from 'axios';
import {UserFilled} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { url } from '@/constants/url';
import { FormInstance , ElMessage } from 'element-plus';
import useUserStore from '@/stores/User';
import DashBoard from './DashBoard.vue';

const router = useRouter()
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: '',
  password: '', 
})
const userStore = useUserStore();

async function handleLogin(formEI : FormInstance | undefined): Promise<void> {
  if(!formEI) return ;
  //这里应该先进行校验
  try {
    const response = await axios.post('/notify/login', 
      {
        username: ruleForm.username,
        password: ruleForm.password,
      }, 
      {
        withCredentials: true, // 确保携带凭证
        timeout: 5000 // 设置超时时间为 5000 毫秒 (5 秒)
      }
    );

    const data = response.data
    const status = response.data.code; // 获取返回的数据
    if(status){
      ElMessage({
          message : "登录成功",
          type : "success",
        })
        const token = data.data.token
        sessionStorage.setItem('token',token);
        userStore.setUserType(data.data.role);
        await nextTick();
        router.push({name : 'dashboard'});
    }
    else{
      const message = response.data.msg;
      ElMessage({
        message:message,
        type:"error",
      })
    }    
    console.log('返回的数据:', data);
    //todo:这里将返回的token，设置到Sessionstorage
  } catch (error : any) { // 不设置 error 的类型
    // 检查是否是 AxiosError
    if (axios.isAxiosError(error)) {
        ElMessage({
          message:'服务器异常',
          type:'info',
        })
    }
    else console.log('未知错误')
  } 
}

function navigateToRegister(){
    router.push(url.reg);
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
  width: 400px; /* 设置输入框宽度 */
  margin-bottom: 20px; /* 设置输入框之间的间距 */
}

.button-container {
  display: flex;
  flex-direction: column; /* 垂直排列输入框和按钮 */
  align-items: center;
}
</style>
  