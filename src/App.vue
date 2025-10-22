<script setup lang="ts">
import * as Sentry from '@sentry/vue'

const testSentry = () => {
  // 测试 Sentry 错误捕获
  try {
    throw new Error('这是一个测试错误')
  } catch (error) {
    Sentry.captureException(error)
    console.log('错误已发送到 Sentry')
  }
}
</script>

<template>
  <div>
    <h1>Expore Remote Track Site</h1>
    <button @click="testSentry">测试 Sentry</button>
  </div>
</template>

<style scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #35a372;
}
</style>
