<template>
    <div class="product-card">
        <h3>{{ sampleProducts.title }}</h3>
        <p>{{ sampleProducts.description }}</p>
        <p><strong>{{ sampleProducts.price.toLocaleString() }}원</strong></p>
        <button @click="onBuyClick">구매하기</button>
    </div>
</template>

<script setup>
    //defineProps - 부모 컴포넌트에서 전달받은 props를 정의
    defineProps({
        //product라는 이름의 prop를 객체 형태로 전달받음
        product: Object, 
    });

    //기능구현 전이라 일단 alert 알림창만 표시되도록 함. <수정 예정>
    const onBuyClick = () => {
        alert(`"${product.title}" 상품 구매를 시작합니다.`);
    };
</script>

<!-- product-card에 대한 스타일시트 -->
<style scoped>
    .product-card{
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
</style>

