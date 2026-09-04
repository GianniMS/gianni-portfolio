import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  const store = await cookies()
  const authed = await verifySessionToken(store.get(SESSION_COOKIE_NAME)?.value)
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
