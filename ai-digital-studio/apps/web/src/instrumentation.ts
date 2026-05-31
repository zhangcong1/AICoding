export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    return
  }

  const { ensureDb } = await import('@/lib/db')
  await ensureDb()
}
