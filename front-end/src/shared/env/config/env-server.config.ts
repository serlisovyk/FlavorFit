import { serverEnvSchema } from '../schemas'

const { JWT_SECRET_ENV } = serverEnvSchema.parse({
  JWT_SECRET_ENV: process.env.JWT_SECRET,
})

export { JWT_SECRET_ENV }
