const axios = require('axios');
require('dotenv').config();

// 결제 요청 처리 함수
exports.requestPayment = async(req, res) => {
    const { amount, orderName, customerName } = req.body;

    // 디버깅용 로그 추가
    console.log(" 요청 바디:", req.body);
    console.log(" amount:", amount);
    console.log(" orderName:", orderName);
    console.log(" customerName:", customerName);
    console.log(" 시크릿 키 존재 여부:", !!process.env.TOSS_SECRET_KEY);
    
    //토스 API사용에서 orderId 중복방지로 따로 뺐음.
    const orderId = `ORDER_${Date.now()}`;

    try{
        const response = await axios.post(
            'https://api.tosspayments.com/v1/payments/ready',
            {
                amount,
                orderId,
                orderName,
                customerName,
                successUrl: `${process.env.CLIENT_URL}/payment/success`,
                failUrl: `${process.env.CLIENT_URL}/payment/fail`,
                paymentType: "CARD"
            },
            {
                headers: {
                    Authorization:
                    'Basic ' + Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString('base64'),
                    'Content-Type': 'application/json',
                },
            }
        );
        //Toss가 제공한 결제창 URL을 클라이언트에 전달
        res.status(200).json({ checkoutUrl: response.data.checkout.url });
    } catch(error) {
        console.error(' Toss 결제 API 요청 실패 : ', error.response?.data || error.message);
        res.status(500).json({error: '결제 요청 중 오류 발생'});
    }
};