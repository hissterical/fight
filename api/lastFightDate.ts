import { NowRequest, NowResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || ''
});

const LAST_FIGHT_KEY = 'lastFightDate';

export default async (req: NowRequest, res: NowResponse) => {
  try {
    if (req.method === 'GET') {
      const lastFightDate = await redis.get(LAST_FIGHT_KEY) || new Date().toISOString();
      res.status(200).json({ lastFightDate });
    } else if (req.method === 'POST') {
      const date = new Date(req.body.date).toISOString();
      await redis.set(LAST_FIGHT_KEY, date);
      res.status(200).json({ message: 'Date updated successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Redis operation failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};