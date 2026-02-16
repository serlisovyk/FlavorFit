import Link from 'next/link'
import { ROUTES } from '@shared/config'
import { AuthChangeTypeFormProps } from '../../types'

export function AuthChangeTypeForm({ isLogin }: AuthChangeTypeFormProps) {
  return (
    <div className="text-center">
      {isLogin ? (
        <div>
          Don&apos;t have an account?{' '}
          <Link href={ROUTES.REGISTER} className="underline">
            Register
          </Link>
        </div>
      ) : (
        <div>
          Already have an account?{' '}
          <Link href={ROUTES.LOGIN} className="underline">
            Login
          </Link>
        </div>
      )}
    </div>
  )
}
