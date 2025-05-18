<template>
    <div>
        <h2>전자책 상품 목록</h2>
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import ProductCard from '@/components/ProductCard.vue';

    const products = ref([]); // 상품 목록 상태 변수

    // 마운트 될 때 상픔 목록 API 호출
    onMounted(async () => {
        try{
            const response = await axios.get('http://localhost:4000/api/products');
            products.value = response.data;
        } catch(error){
            console.error('상품 목록을 불러오는데 실패 : ', error);
        }
    });
</script>