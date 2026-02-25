import { NextRequest, NextResponse } from 'next/server'
import { ROUTES } from '@shared/config'

export async function proxy(request: NextRequest) {
  if (!request.cookies.get('accessToken')) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
