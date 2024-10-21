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
        <!-- 火狐浏览器自动填充不做适配 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="text" style="width: 400px;" show-password 
            pattern="^[^\u4e00-\u9fa5]*$" title="密码不能包含汉字"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input
              v-model="ruleForm.checkPassword"
              type="password"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" style="flex: 1;" />
              <el-button type="success" plain style="margin-left: 10px;" @click="handleSendEmail">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
              <el-input v-model="ruleForm.captcha" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="submitForm(ruleFormRef)" style="margin:auto;">
              提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)" type="primary" plain style="margin: auto;"> 清空</el-button>
          </el-form-item>
          <!-- prop这里用来定义规则 -->
        </el-form>
      </div>
      <!-- 可以在这里添加其他内容 -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { Callback, FormInstance, FormRules } from 'element-plus'
  import axios from 'axios';
  import {ElMessage} from 'element-plus';
  
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
            
            if(value.length < 6) return callback(new Error('密码过短，不少于6位'))
            else if(value.length >= 16) return callback(new Error('密码过长,不超过16位'))
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

  const validateEmail = (rule:any,value:any,callback:any) => {
    if(!value) return callback(new Error('请输入邮箱'))
    callback()
  }

  const ruleForm = reactive({
    password: '',
    checkPassword: '',
    username: '',
    email: '',
    captcha:'',
  })
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }],
    username: [{ validator: checkUsername, trigger: 'blur' }],
    email: [
      {validator:validateEmail,trigger:'blur'},
      {type:'email',message:'邮箱格式不正确',trigger:'blur'}
    ],
    captcha:[{len:6,message:'验证码格式不正确',trigger:'blur'},
      {required:true,message:'请输入验证码',trigger:'blur'}
    ]
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
                    email: ruleForm.email,
                    captcha: ruleForm.captcha,
                },
                {
                    withCredentials:true,
                    timeout:5000,
                }
            )
            const data = response.data
            ElMessage({
                message: '注册成功！',
                type: 'success',
            })//消息提示
            console.log("返回的数据:",data)
        }catch(e : any){
          ElMessage({
                message: '注册失败！',
                type: 'error',
            })//消息提示
            if(e.response){
              console.log("服务器错误:",e.response.data.msg)
            }
            else console.log("错误信息:",e.message)
        }
        finally{
          formEl.resetFields()
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

  const handleSendEmail = async () =>{
    //email发送到后端
    try{
      const response = await axios.post(`/notify/captcha`,
      {
        email:ruleForm.email,
        username:ruleForm.username,
      },
      {
        withCredentials: true,
      }
    )
    const data = response.data
    console.log('返回的数据:',data)
    }catch(e : any){
      if(e.response){
        console.log("服务器错误:",e.response.data.msg)
      }
      else console.log('错误信息:',e.message)
    }
   
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
  