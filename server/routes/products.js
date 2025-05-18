const express = require('express');
const router = express.Router();
const{ getAllproducts, getAllProducts } = require('../controllers/productController');

// GET 상품목록 반환
router.get('/', getAllProducts);

module.exports = router;