const bcrypt = require('bcrypt'); // 비밀번호 해싱을 위해 사용
const jwt = require('jsonwebtoken'); // 보안을 위한 jwt토큰을 사용
const pool = require('../config/db'); // db연결
require('dotenv').config(); // 닷엔브 사용

// 회원가입
// 비동기 async await 사용 (동기 코드처럼 작성할 수 있고, 가독성과 에러처리 쉬움)
// 동기 보다 요청 처리가 빠르기도 함.
exports.register = async(req, res) => {
    const{ email, password, name } = req.body;

    try{
        // 이메일 중복 확인 (데이터베이스에는 UNIQUE로 막기도 해놨음)
        const [existing] = await pool.query('SELECT* FROM users WHERE email = ?', [email]);
        if(existing.length > 0){
            return res.status(400).json({error: '이미 존재하는 이메일입니다.'});
        }

        const hashedPw = await bcrypt.hash(password, 10); // 비밀번호 해싱
        await pool.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPw, name]);

        res.status(201).json({ message: '회원가입을 완료했습니다.'});
    } catch(error){
        res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.'});
    }
};

// 로그인
exports.login = async(req, res) => {
    const{ email, password } = req.body;

    try{
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if(!user) return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.'});

        // 입력한 비밀번호와 해싱되어 데이터베이스에 저장된 값과 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.'});

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // jwt토큰 발급 유효기간 1시간
        });
        
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch(error){
        res.status(500).json({ error: '로그인 중 오류 발생'});
    }
};

// 내 정보 확인 (토큰 필요함)
exports.getMe = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT id, email, name, created_at FROM users WHERE id = ?', [req.user.id]);
        res.json(rows[0]);
    } catch(error){
        res.status(500).json({ error: '사용자 정보 조회 실패'});
    }
};
