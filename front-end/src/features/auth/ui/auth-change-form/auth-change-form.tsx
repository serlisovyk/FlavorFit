import Link from 'next/link'
import { ROUTES } from '@shared/config'
import { AuthChangeTypeFormProps } from '../../types'

export function AuthChangeTypeForm({ isLogin }: AuthChangeTypeFormProps) {
  return (
    <div className="text-center text-sm">
      {isLogin ? (
        <div>
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="underline underline-offset-2 font-medium transition-colors hover:text-accent"
          >
            Sign Up
          </Link>
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
