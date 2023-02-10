require('dotenv').config();
const cacheConfig = {
    secret: process.env.APP_SECRET,
    tokenExpiryTime: 3000, // seconds => 5 minutes
    redisServerPort: 6379,
    redisServerURL: process.env.REDIS_HOST,
    redisConnectionString: process.env.REDIS_URL
}

export {cacheConfig}