const redis = require("../redisClient");
const { currentPrice } = require("./getTradePrice");

async function updateRanking(userId, assetData) {
  if (!assetData.coins || assetData.coins.length === 0) return;

  const now = Math.floor(Date.now() / 1000);
  const lastUpdateKey = `last_update:${userId}`;

  const lastUpdateTime = await redis.get(lastUpdateKey);
  // * 1분 안지났으면 업데이트 건너뜀
  if (lastUpdateTime && now - parseInt(lastUpdateTime) < 60) {
    return;
  }

  const totalBuy = assetData.coins.reduce(
    (acc, coin) => acc + coin.avgBuyPrice * coin.amount,
    0,
  );
  const totalValuation = assetData.coins.reduce((acc, coin) => {
    const price = currentPrice[coin.market] || 0;
    return acc + price * coin.amount;
  }, 0);

  if (totalBuy <= 0) return;

  const profitRate = (totalValuation / totalBuy - 1) * 100;

  console.log("저장 시도:", userId, profitRate);

  await redis.zadd("user_rankings", {
    score: profitRate,
    member: userId.toString(),
  });
  // *1분뒤 키 자동 삭제
  await redis.set(`last_update:${userId}`, Math.floor(Date.now() / 1000), {
        ex: 60
    });
  console.log("랭킹 저장 완료");
}

module.exports = { updateRanking };
