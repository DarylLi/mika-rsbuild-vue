<template>
  <div class="content" :style="{ width: '100%', display: 'flex', justifyContent: 'center' }">
    <img src="static/img/logo.png" alt="" :style="{ width: '60%' }" />
    <h1>Rsbuild with Vue</h1>
    <p>Start building amazing things with Rsbuild.</p>
  </div>
</template>
<script setup>
console.log('killa');
</script>
<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
