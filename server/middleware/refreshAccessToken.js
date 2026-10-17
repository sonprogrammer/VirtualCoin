const jwt = require("jsonwebtoken");

const refreshAccessToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ error: "리프레시 토큰이 없습니다." });

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err || !user || typeof user === "string" || !user.id) {
          return res.status(401).json({
            error: "리프레시 토큰이 유효하지 않습니다.",
          });
        }

        const newAccessToken = jwt.sign(
          { id: user.id },
          process.env.JWT_ACESS_TOKEN_SECRET,
          { expiresIn: "1h" },
        );

        res.status(200).json({ token: newAccessToken });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "토큰 갱신 중 오류 발생" });
  }
};

module.exports = { refreshAccessToken };
