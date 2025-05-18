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
    //상품 목록 데이터 임포트
    import { sampleProducts } from '../data/sampleProducts';

    //재사용 가능한 카드 컴포넌트 임포트
    import ProductCard from '../components/ProductCard.vue';

    const products = sampleProducts;
</script>