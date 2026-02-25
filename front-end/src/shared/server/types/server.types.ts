import { Role } from "@generated/graphql"

export interface JwtVerifyResult {
  payload: JwtPayload
}

export interface JwtPayload {
  id: string
  role: Role
}
