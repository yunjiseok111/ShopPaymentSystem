<template>
    <div class="product-card">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <p><strong>{{ product.price.toLocaleString() }}원</strong></p>
        <button @click="onBuyClick">구매하기</button>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { onMounted } from 'vue';
    
    // props 선언 및 변수 받아오기
    const props = defineProps({
        product: {
            type: Object,
            required: true,
        },
    });

    // 구매 버튼 클릭 시 -> 결제 API 호출 후 checkoutUrl로 이동
    const onBuyClick = async () =>{
        const tossPayments = window.TossPayments('test_ck_6bJXmgo28eEPOBWYEXvw8LAnGKWx');
        try{
                await tossPayments.requestPayment('카드', {
                    amount: props.product.price,
                    orderId: `order_${Date.now()}`,
                    orderName: props.product.title,
                    customerName: '테스트 사용자', //임시
                    successUrl: `${window.location.origin}/payment/success`,
                    failUrl: `${window.location.origin}/pament/fail`
                });
                
        } catch(error){
            console.error('결제 실패: ', error);
        }
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

