import Link from 'next/link'
import { PAGES } from '@shared/config'
import { AuthLinksProps } from '../../types'

export function AuthLinks({ isLogin }: AuthLinksProps) {
  return (
    <div className="text-center">
      {isLogin ? (
        <div>
          Don&apos;t have an account?{' '}
          <Link href={PAGES.REGISTER} className="underline">
            Register
          </Link>
        </div>
      ) : (
        <div>
          Already have an account?{' '}
          <Link href={PAGES.LOGIN} className="underline">
            Login
          </Link>
        </div>
      )}
    </div>
  )
}
