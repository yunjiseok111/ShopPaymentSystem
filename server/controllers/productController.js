// DB 가져오기
const pool = require('../config/db');

// 상품 목록 조회 API
exports.getAllProducts = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch(error){
        console.error('상품 조회 실패 : ', error);
        res.status(500).json({ error : '상품 목록을 불러오는데 실패했습니다.'});
    }
};