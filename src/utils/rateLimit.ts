import clientPromise from '@/lib/mongodb';

interface RateLimit {
  ip: string;
  count: number;
  date: Date;
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const client = await clientPromise;
  const db = client.db("ai-image-generator");
  const rateLimits = db.collection<RateLimit>("rate_limits");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find or create rate limit document for this IP
  let rateLimit = await rateLimits.findOne({ 
    ip,
    date: { $gte: today }
  });

  if (!rateLimit) {
    rateLimit = {
      ip,
      count: 0,
      date: today
    };
    await rateLimits.insertOne(rateLimit);
  }

  const DAILY_LIMIT = 20;
  const remaining = Math.max(0, DAILY_LIMIT - rateLimit.count);
  const allowed = rateLimit.count < DAILY_LIMIT;

  if (allowed) {
    // Increment count if allowed
    await rateLimits.updateOne(
      { ip, date: { $gte: today } },
      { $inc: { count: 1 } }
    );
  }

  return { allowed, remaining };
} 