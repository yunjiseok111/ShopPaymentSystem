<!-- 로그인 페이지 -->
<template>
    <div>
        <h2>로그인</h2>
        <from @submit.prevent="login"> <!-- 로그인 폼 제출 시 기본 동작(페이지 새로고침)을 막고 login 메서드를 실행-->
            <input v-model="email" placeholder="이메일" required /> <!-- v-model = 양방향 데이터 바인딩, required = 이메일을 입력 안 하면 폼 제출을 불가능하게 해줌 -->
            <input v-model="password" type="password" placeholder="비밀번호" required />
            <button type="submit">로그인</button>
        </from>
        <p v-if="error">{{ error }}</p> <!-- 조건부 렌더링, error값이 true라면 <p>가 화면에 출력 -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref(''); // ref('') Vue3에서 반응형 상태를 만들 때 사용하기 위한 함수
const password = ref(''); // 빈 문자열로 초기화한 이유는 email, password, error등은 초기값이 문자열인 상태를 갖기 때문
const error = ref(''); // 즉, 초기 상태에서 undefined 오류를 방지할 수 있으며 v-model로 양방향 바인딩이 가능함
const router = useRouter();

const login = async () => {
    try{
        const res = await axios.post('http://localhost:4000/api/users/login', {
            email: email.value,
            password: password.value
        });

        localStorage.setItem('token', res.data.token); // 사용자local에 토큰 저장
        router.push('/'); // 홈으로 이동
    } catch(error){
        error.value = error.response?.data?.error || '로그인 실패';
    }
};

</script>