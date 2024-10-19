<template>
    <div class="register-container">
      <div class="input-field-container">
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px; width: 100%;"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="text" autocomplete="off" style="width: 400px;"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input
              v-model="ruleForm.checkPassword"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 可以在这里添加其他内容 -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import axios from 'axios';
  
  const ruleFormRef = ref<FormInstance>()
  
  const checkUsername = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('请输入用户名'))
    }
    setTimeout(() => {
     {
       if(value.includes(' ')) callback(new Error('含有非法字符(空格)'))
        if (value.length >= 10) {
          callback(new Error('用户名长度不超过10位'))
        } else {
          callback()
        }
      }
    }, 1000)
  }
  
  const validatePass = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('请输入密码'))
    } else {
        setTimeout(() => {
            if(value.includes(' ')) return callback(new Error('含有非法字符(空格)'))
            if(value.length >= 16) return callback(new Error('密码过长,不超过16位'))
            callback();
        },1000)
    }
  }
  
  const validateCheckPassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
      return callback(new Error('请确认密码'))
    } else{
        setTimeout(() => {
            if(value !== ruleForm.password) return callback(new Error('两次密码不一致'));
            callback()
        },1000)
    }
  }
  
  const ruleForm = reactive({
    password: '',
    checkPassword: '',
    username: '',
  })
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }],
    username: [{ validator: checkUsername, trigger: 'blur' }],
  })
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        try{
            const response = await axios.post('/notify/register',
                {
                    username : ruleForm.username,
                    password : ruleForm.password,
                },
                {
                    withCredentials:true,
                    timeout:5000,
                }
            )
            const data = response.data
            console.log("返回的数据:",data)
        }catch(e){
            
        }
      } else {
        console.log('存在非法字段!')
      }
    })
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  </script>
  
  <style>
  .register-container {
    position: relative; /* 允许子元素使用绝对定位 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 使容器高度为视口高度 */
  }
  
  .input-field-container {
    display: flex;
    justify-content: center; /* 水平居中内容 */
    align-items: center;
    max-width: 600px; /* 限制最大宽度 */
    height: 100vh;
  }
  
  </style>
  