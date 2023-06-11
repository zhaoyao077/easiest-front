<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    ><img src="../../public/img/logo.jpg" alt="图标加载错误">
      <el-menu-item index="0"><router-link to="/">SentiStrength</router-link></el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1"><router-link to="/">Brief Introduction</router-link></el-menu-item>
      <el-sub-menu index="2">
        <template #title>Sentiment Analyze</template>
        <el-menu-item index="2-1"><router-link to="/modeAnalyze">Analyze with mode</router-link></el-menu-item>
        <el-menu-item index="2-2" ><router-link to="/colAnalyze">Analyze with column</router-link></el-menu-item>
      </el-sub-menu>
      <el-sub-menu index ="3">
        <template #title>Show Information</template>
        <el-menu-item index="3-1"><router-link to="/showOutcome">Show OutComes</router-link></el-menu-item>
        <el-menu-item index="3-2"><router-link to="showNotes">Show notes</router-link></el-menu-item>
        <el-menu-item index="3-3"><router-link to="/showDetails">Show Details</router-link></el-menu-item>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  a{
    text-decoration: none;

  }
  .router-link-active{
   text-decoration: none; 
  }
  .el-menu{
    background: -webkit-linear-gradient(left,rgba(255, 255, 255, 0),#a1dd5d,rgba(255,255,255,0));
        background: linear-gradient(to right, rgba(255, 255, 255, 0),#a1dd5d,rgba(255,255,255,0));
    }
  
  </style>
  