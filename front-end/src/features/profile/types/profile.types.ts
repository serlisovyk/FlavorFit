import { UseFormReturn } from 'react-hook-form'
import { GetProfileQuery, UserUpdateInput } from '@generated/graphql'

export type ProfileForm = Omit<UserUpdateInput, 'password'>

export interface AvatarUploadProps {
  value: string | undefined | null
  onChange: UploadAvatarOnChangeFn
}

export type UploadAvatarOnChangeFn = (url: string) => void

export interface UploadResponse {
  url: string
  name: string
}

export interface ProfileFormProps {
  data: GetProfileQuery
}

export interface BodyMeasurementsFormProps {
  form: UseFormReturn<ProfileForm>
}

export interface GeneralInformationFormProps {
  form: UseFormReturn<ProfileForm>
}
