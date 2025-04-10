import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL || '',
  token: process.env.UPSTASH_REDIS_TOKEN || ''
});

const LAST_FIGHT_KEY = 'lastFightDate';

export async function GET() {
  try {
    const lastFightDate = await redis.get(LAST_FIGHT_KEY) || new Date().toISOString();
    return NextResponse.json({ lastFightDate });
  } catch (error) {
    console.error('Redis operation failed:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const date = new Date(body.date).toISOString();
    await redis.set(LAST_FIGHT_KEY, date);
    return NextResponse.json({ message: 'Date updated successfully' });
  } catch (error) {
    console.error('Redis operation failed:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}