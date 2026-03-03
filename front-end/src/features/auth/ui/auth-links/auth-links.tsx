import Link from 'next/link'
import { ROUTES } from '@shared/config'
import { AuthLinksProps } from '../../types'

export function AuthLinks({ isLogin }: AuthLinksProps) {
  return (
    <div className="text-center text-sm">
      {isLogin ? (
        <div>
          <div>
            Don&apos;t have an account?{' '}
            <Link
              href={ROUTES.REGISTER}
              className="underline underline-offset-2 font-medium transition-colors hover:text-accent"
            >
              Sign Up
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="underline underline-offset-2 font-medium transition-colors hover:text-accent"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      ) : (
        <div>
          Already have an account?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="underline underline-offset-2 font-medium transition-colors hover:text-accent"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  )
}
