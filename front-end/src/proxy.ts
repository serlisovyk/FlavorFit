import { NextRequest, NextResponse } from 'next/server'
import { getTokens, loginRedirect } from '@shared/server'
import { jwtVerifyServer } from '@shared/server'

export async function proxy(request: NextRequest) {
  const tokens = await getTokens(request)
  if (!tokens) return loginRedirect(request)

  if (tokens.isRefreshedAccessToken) {
    const response = NextResponse.next()

    if (tokens.setCookie) response.headers.set('Set-Cookie', tokens.setCookie)

    return response
  }

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return loginRedirect(request)

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
