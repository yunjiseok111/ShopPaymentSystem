const express = require('express');
const router = express.Router();
const { confirmPayment } = require('../controllers/paymentController');

// 결제 요청 POST API
router.post('/confirm', confirmPayment);

module.exports = router;