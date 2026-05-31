import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedis() {
  if (!redis) {
    const url = process.env.REDIS_URL ?? 'redis://localhost:6379'
    redis = new Redis(url, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    })
  }
  return redis
}

export async function publishEvent(channel: string, payload: unknown) {
  try {
    const client = getRedis()
    if (client.status !== 'ready') {
      await client.connect()
    }
    await client.publish(channel, JSON.stringify(payload))
  } catch (error) {
    console.warn('[redis] publish failed:', error)
  }
}
