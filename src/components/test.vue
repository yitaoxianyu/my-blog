<template>
    <el-container class="layout-container">
      <el-header>
        <el-menu
          :default-active="currentView"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="articles">文章</el-menu-item>
          <el-menu-item index="about">关于</el-menu-item>
          <el-menu-item index="contact">联系</el-menu-item>
        </el-menu>
      </el-header>
  
      <el-main>
        <el-row v-if="currentView === 'home'">
          <el-col :span="24">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>欢迎来到我的博客</span>
                </div>
              </template>
              <div class="text item">
                在这里，我分享我的想法、经验和见解
              </div>
              <el-button type="primary" @click="currentView = 'articles'">浏览文章</el-button>
            </el-card>
          </el-col>
        </el-row>
  
        <el-row v-if="currentView === 'articles'" :gutter="20">
          <el-col v-for="article in articles" :key="article.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-card class="box-card" @click="selectArticle(article)">
              <template #header>
                <div class="card-header">
                  <span>{{ article.title }}</span>
                </div>
              </template>
              <div class="text item">
                {{ article.excerpt }}
              </div>
              <div class="text item">
                <el-tag size="small">{{ article.date }}</el-tag>
                <el-tag size="small" type="info">{{ article.author }}</el-tag>
              </div>
            </el-card>
          </el-col>
        </el-row>
  
        <el-row v-if="currentView === 'article'">
          <el-col :span="24">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{ selectedArticle.title }}</span>
                  <el-button class="button" text @click="currentView = 'articles'">返回</el-button>
                </div>
              </template>
              <div class="text item">
                <p>{{ selectedArticle.date }} | {{ selectedArticle.author }}</p>
                <div v-html="selectedArticle.content"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
  
        <el-row v-if="currentView === 'about'">
          <el-col :span="24">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>关于我</span>
                </div>
              </template>
              <div class="text item">
                我是一名热爱写作和分享的博主。通过这个博客，我希望能够与大家分享我的知识和经验。
              </div>
            </el-card>
          </el-col>
        </el-row>
  
        <el-row v-if="currentView === 'contact'">
          <el-col :span="24">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>联系我</span>
                </div>
              </template>
              <el-form :model="contactForm" label-width="120px">
                <el-form-item label="姓名">
                  <el-input v-model="contactForm.name" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="contactForm.email" />
                </el-form-item>
                <el-form-item label="留言">
                  <el-input v-model="contactForm.message" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitContact">发送</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
  
      <el-footer>
        <el-divider />
        <p>&copy; 2023 我的个人博客. 保留所有权利.</p>
      </el-footer>
    </el-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  
  const currentView = ref('home')
  const selectedArticle = ref(null)
  
  const articles = ref([
    {
      id: 1,
      title: "Vue 3 的新特性",
      date: "2023-05-15",
      author: "张三",
      excerpt: "Vue 3 带来了许多激动人心的新特性,包括组合式 API、更好的性能和更小的包大小...",
      content: "<p>Vue 3 带来了许多激动人心的新特性,包括组合式 API、更好的性能和更小的包大小。本文将深入探讨这些新特性，并讨论它们如何改变我们的开发方式。</p><p>首先，组合式 API 是 Vue 3 最显著的新特性之一。它允许我们更灵活地组织组件逻辑，使得代码更易于理解和维护。通过使用 setup 函数，我们可以将相关的逻辑组合在一起，而不是分散在不同的选项中。</p><p>其次，Vue 3 的性能得到了显著提升。新的编译器可以生成更高效的渲染代码，而且 Vue 3 的响应式系统也进行了重写，使得它更快、更节省内存。</p><p>最后，尽管功能更强大，Vue 3 的核心包大小却比 Vue 2 更小。这要归功于更好的树摇（tree-shaking）支持和新的编译策略。</p>"
    },
    {
      id: 2,
      title: "如何优化你的 Vue 应用",
      date: "2023-05-10",
      author: "李四",
      excerpt: "优化 Vue 应用性能的几个关键点:合理使用 v-if 和 v-show、使用 computed 属性...",
      content: "<p>优化 Vue 应用性能的几个关键点包括：合理使用 v-if 和 v-show、使用 computed 属性、适当使用 keep-alive 组件等。本文将详细讨论这些优化策略。</p><p>首先，v-if 和 v-show 都可以用来控制元素的显示和隐藏，但它们的工作方式不同。v-if 会完全移除或重新创建元素，而 v-show 只是切换元素的 CSS display 属性。对于频繁切换的元素，v-show 通常更高效。</p><p>其次，computed 属性可以缓存计算结果，只有当依赖发生变化时才会重新计算。这对于复杂的计算或频繁访问的值非常有用。</p><p>最后，keep-alive 组件可以缓存不活动的组件实例，而不是销毁它们。这对于需要频繁切换的组件非常有用，可以显著提高性能。</p>"
    },
    {
      id: 3,
      title: "Vue 3 与 TypeScript",
      date: "2023-05-05",
      author: "王五",
      excerpt: "Vue 3 对 TypeScript 的支持更加友好,本文将介绍如何在 Vue 3 项目中使用 TypeScript...",
      content: "<p>Vue 3 对 TypeScript 的支持更加友好，本文将介绍如何在 Vue 3 项目中使用 TypeScript，以及它带来的好处。</p><p>首先，Vue 3 的源码就是用 TypeScript 编写的，这意味着 Vue 3 天生就对 TypeScript 有很好的支持。在 Vue 3 项目中使用 TypeScript，我们可以获得更好的类型检查和 IDE 支持。</p><p>其次，Vue 3 的组合式 API 与 TypeScript 配合得非常好。我们可以轻松地为 props、ref、reactive 等添加类型声明，使得我们的代码更加健壮。</p><p>最后，使用 TypeScript 可以帮助我们更早地发现潜在的错误，提高代码质量。虽然学习曲线可能会稍微陡峭一些，但长期来看，使用 TypeScript 可以显著提高开发效率和代码可维护性。</p>"
    }
  ])
  
  const contactForm = ref({
    name: '',
    email: '',
    message: ''
  })
  
  const handleSelect = (key) => {
    currentView.value = key
  }
  
  const selectArticle = (article) => {
    selectedArticle.value = article
    currentView.value = 'article'
  }
  
  const submitContact = () => {
    ElMessage({
      message: '感谢您的留言！我们会尽快回复您。',
      type: 'success',
    })
    contactForm.value = { name: '', email: '', message: '' }
  }
  </script>
  
  <style scoped>
  .layout-container {
    min-height: 100vh;
  }
  
  .el-header {
    padding: 0;
  }
  
  .el-main {
    padding: 20px;
  }
  
  .el-footer {
    text-align: center;
  }
  
  .box-card {
    margin-bottom: 20px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }
  
  .el-tag {
    margin-right: 5px;
  }
  </style>