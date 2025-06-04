<template>
  <div>
    <h2> 결제 완료</h2>
    <p>서버에 결제 승인 요청을 보냈습니다.</p>
    <p>10초 후 홈으로 이동합니다...</p>
    <button @click="goHome">홈으로 바로 이동</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const goHome = () => {
  router.push('/');
};

onMounted(async () => {
  const { paymentKey, orderId, amount } = route.query;

  try {
    const response = await axios.post('http://localhost:4000/api/payment/confirm', {
      paymentKey,
      orderId,
      amount,
    });
    console.log('결제 확인 성공: ', response.data);
  } catch (error) {
    console.error('결제 확인 실패: ', error.response?.data || error.message);
  }

  setTimeout(goHome, 10000); // 10초 후 자동 이동
});
</script>
