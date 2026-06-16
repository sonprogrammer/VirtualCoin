const Asset = require('./Models/assetModel');
const mongoose = require('mongoose');
require('dotenv').config();
const { updateRanking } = require('./utils/rankUtils');
const redis = require('./redisClient');

console.log("DB URL 확인:", process.env.MONGO_URI);
console.log("Redis URL 확인:", process.env.UPSTASH_REDIS_REST_URL);

const initRanking = async () => {
    try {
        // 1. DB 연결 대기
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB 연결 성공");

        const allAssets = await Asset.find({});
        console.log(`총 ${allAssets.length}명의 데이터를 랭킹에 반영합니다.`);

        for (const asset of allAssets) {
            try {
                await updateRanking(asset.userId, asset);
                console.log(`유저 ${asset.userId} 반영 완료`);
            } catch (e) {
                console.error(`유저 ${asset.userId} 실패:`, e);
            }
        }
        console.log("작업 종료");
    } catch (err) {
        console.error("에러 발생:", err);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};

initRanking();