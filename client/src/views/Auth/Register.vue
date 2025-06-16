<!-- 회원가입 페이지 -->

<template>
    <div>
        <h2>회원가입</h2>
        <form @submit.prevent="register">
            <input v-model="name" placeholder="이름" required />
            <inpit v-model="email" placeholder="이메일" required />
            <input v-mode="password" type="password" placeholder="비밀번호" required />
            <button type="submit">회원가입</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axois from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const message = ref('');
const router = userRouter();

const register = async () => {
    try{
        await axios.post('http://localhost:4000/api/users/register', {
            name: name.value,
            password: password.value,
            email: email.value
        });
        message.value = '회원가입에 성공했습니다.';
        setTimeout(() => router.push('/login'), 1500); // 회원가입 성공 후 로그인 페이지로 자동 이동 
    } catch(error){
        message.value = error.response?.data?.error || '회원가입에 실패했습니다.';
    }
};

</script>