const express = require("express");
const router = express.Router();
const redis = require("../redisClient");
const authenticateJWT = require("../middleware/authenticateJWT");
const User = require("../Models/userModel");
const mongoose = require("mongoose");

router.get("/top", authenticateJWT, async (req, res) => {
  try {
    const count = await redis.zcard("user_rankings");
    console.log("Redis 랭킹 개수:", count);
    const topUsers = await redis.zrange("user_rankings", 0, 49, {
      rev: true,
      withScores: true,
    });

    if (!topUsers || topUsers.length === 0) return res.json([]);

    const parsedUsers = [];
    for (let i = 0; i < topUsers.length; i += 2) {
      parsedUsers.push({ member: topUsers[i], score: topUsers[i + 1] });
    }

    const userIds = parsedUsers.map((item) => new mongoose.Types.ObjectId(item.member));
    const users = await User.find({ _id: { $in: userIds } }).select("name");

    const userMap = {};
    users.forEach((u) => {
      userMap[u._id.toString()] = u.name;
    });

    const formattedRank = parsedUsers.map((item) => ({
      name: userMap[item.member] || "알 수 없음",
      profitRate: parseFloat(item.score).toFixed(2),
    }));


    console.log("fromattedrank", formattedRank);
    res.json(formattedRank);
  } catch (error) {
    console.error("랭킹 조회 에러:", error);
    res.status(500).json({ message: "랭킹 조회 실패" });
  }
});
module.exports = router;
