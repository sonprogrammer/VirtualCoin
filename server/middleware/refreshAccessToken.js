const jwt = require('jsonwebtoken');

const refreshAccessToken = (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; 
        if (!refreshToken) return res.status(401).json({ error: '리프레시 토큰이 없습니다.' });

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ error: '리프레시 토큰이 유효하지 않습니다.' });

            const newAccessToken = jwt.sign(
                { kakaoId: decoded.kakaoId, name: decoded.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', newAccessToken, {
                httpOnly: true,
                // TODO 배포시 true로 변경
                secure: false, 
                maxAge: 3600000, 
            });

            res.status(200).json({ token: newAccessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '토큰 갱신 중 오류 발생' });
    }
};

module.exports = { refreshAccessToken };
