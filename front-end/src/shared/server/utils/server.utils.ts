'use server'

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { CombinedGraphQLErrors } from '@apollo/client'
import { JWT_SECRET_ENV, ROUTES } from '@shared/config'
import { fetchRefreshToken } from '../services'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../constants'
import { JwtVerifyResult } from '../types'

export async function getTokens(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value

  if (!refreshToken) {
    request.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)
    return null
  }

  if (!accessToken) {
    try {
      const refreshResponse = await fetchRefreshToken(request)
      if (!refreshResponse.ok) return null

      const setCookie = refreshResponse.headers.get('set-cookie')

      return {
        isRefreshedAccessToken: true,
        setCookie,
      }
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const isInvalid = error.errors.some(
          (err) =>
            err.message.includes('Invalid token') ||
            err.extensions?.code === 'UNAUTHENTICATED',
        )

        if (isInvalid) {
          console.log('Access token is invalid, deleting cookie')
          request.cookies.delete(ACCESS_TOKEN_COOKIE_NAME)
          request.cookies.delete(REFRESH_TOKEN_COOKIE_NAME)
          return null
        }
      }

      return null
    }
  }

  return { refreshToken, accessToken }
}

export async function jwtVerifyServer(accessToken: string | undefined) {
  if (!accessToken) return null

  try {
    const { payload }: JwtVerifyResult = await jwtVerify(
      accessToken,
      new TextEncoder().encode(JWT_SECRET_ENV),
    )

    return payload
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('exp claim timestamp check failed')
    ) {
      console.log('Access token expired')
      return null
    }

    console.error('Error verifying JWT:', error)
    return null
  }
}

export function loginRedirect(request: NextRequest) {
  return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
}
