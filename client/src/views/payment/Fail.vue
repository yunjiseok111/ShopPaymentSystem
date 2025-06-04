<template>
  <div>
    <h2> 결제 실패</h2>
    <p>문제가 발생했습니다. 다시 시도해 주세요.</p>
    <p>10초 후 홈으로 이동합니다...</p>
    <button @click="goHome">홈으로 바로 이동</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

onMounted(() => {
  setTimeout(goHome, 10000); // 10초 후 자동 이동
});
</script>
