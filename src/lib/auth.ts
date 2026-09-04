const encoder = new TextEncoder()

export const SESSION_COOKIE_NAME = 'admin_session'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToBuf(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set')
  return secret
}

async function importKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function createSessionToken(): Promise<string> {
  const nonce = bufToHex(crypto.getRandomValues(new Uint8Array(8)).buffer)
  const payload = `${Date.now()}.${nonce}`
  const key = await importKey()
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return `${payload}.${bufToHex(signature)}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [issuedAt, nonce, signatureHex] = parts
  const payload = `${issuedAt}.${nonce}`

  let valid: boolean
  try {
    const key = await importKey()
    valid = await crypto.subtle.verify(
      'HMAC',
      key,
      hexToBuf(signatureHex) as BufferSource,
      encoder.encode(payload)
    )
  } catch {
    return false
  }
  if (!valid) return false

  const age = Date.now() - Number(issuedAt)
  return Number.isFinite(age) && age >= 0 && age <= SESSION_MAX_AGE_SECONDS * 1000
}

async function sha256Hex(value: string): Promise<string> {
  return bufToHex(await crypto.subtle.digest('SHA-256', encoder.encode(value)))
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export async function credentialsMatch(username: string, password: string): Promise<boolean> {
  const [uHash, uExpected, pHash, pExpected] = await Promise.all([
    sha256Hex(username),
    sha256Hex(process.env.ADMIN_USERNAME ?? ''),
    sha256Hex(password),
    sha256Hex(process.env.ADMIN_PASSWORD ?? ''),
  ])
  return constantTimeEqual(uHash, uExpected) && constantTimeEqual(pHash, pExpected)
}
