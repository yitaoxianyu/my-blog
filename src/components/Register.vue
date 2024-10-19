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
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="Age" prop="age">
            <el-input v-model.number="ruleForm.age" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Submit
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 可以在这里添加其他内容 -->
      <div class="additional-content">
        <p>这是其他内容，可以放在父级元素中。</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  
  const ruleFormRef = ref<FormInstance>()
  
  const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
      } else {
        if (value < 18) {
          callback(new Error('Age must be greater than 18'))
        } else {
          callback()
        }
      }
    }, 1000)
  }
  
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass')
      }
      callback()
    }
  }
  
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }
  
  const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
  })
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
  })
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
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
    width: 100%; /* 使输入框容器宽度为100% */
    max-width: 600px; /* 限制最大宽度 */
  }
  
  .additional-content {
    position: absolute; /* 绝对定位的内容 */
    top: 10px; /* 可以根据需要调整位置 */
    right: 10px; /* 可以根据需要调整位置 */
    color: #333; /* 其他内容的样式 */
  }
  </style>
  