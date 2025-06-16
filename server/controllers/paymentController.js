const axios = require('axios');
require('dotenv').config();

// 결제 요청 처리 함수
exports.confirmPayment = async (req, res) => {
    const { paymentKey, orderId, amount, productId } = req.body;
    const userId = req.user?.id; // JWT 인증을 통해 얻은 사용자 ID

    // 토스API 개발서를 통한 작성
    try{
        const response = await axios.post(
            'https://api.tosspayments.com/v1/payments/confirm',
            { paymentKey, orderId, amount },
            {
                headers: {
                    Authorization: 'Basic ' + Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64'),
                    'Content-Type': 'application/json',
                },
            }
        );

        // 주문 정보 DB에 저장하는 절차
        await pool.query(
            'INSERT INTO orders (user_id, product_id, order_id, payment_key, amount, status) VALUES(?, ?, ?, ?, ?, ?)',
            [userId, productId, orderId, paymentKey, amount, 'SUCCESS']
        );

        res.status(200).json({ success: true, data: response.data });
    } catch(error){
        console.error('결제 승인 실패: ', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
};