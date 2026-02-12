// import { useLoginMutation } from '@generated/output'

interface AuthFormProps {
  type: 'login' | 'register'
}

export function AuthForm({ type }: AuthFormProps) {
  // const { mutate: login } = useLoginMutation()

  return (
    <div>
      <h1>{type === 'register' ? 'Register' : 'Login'}</h1>
      <form>
        <input type="email" placeholder="Email" required />

        <button type="submit">
          {type === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  )
}
