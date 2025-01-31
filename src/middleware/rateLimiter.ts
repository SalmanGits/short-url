import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { Request, Response, NextFunction } from 'express';

const redisClient = new Redis({ enableOfflineQueue: false });

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 5,
    duration: 1,
    useRedisPackage: true,
});

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter.consume(req.ip as string)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Too Many Requests' });
        });
};

export default rateLimiterMiddleware;