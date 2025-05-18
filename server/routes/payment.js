const express = require('express');
const router = express.Router();
const { requestPayment } = require('../controllers/paymentController');

// 결제 요청 POST API
router.post('/', requestPayment);

module.exports = router;