import { UseFormReturn } from 'react-hook-form'
import { Gender, Activity_Level, Nutrition_Goal } from '@generated/graphql'

export interface ProfileForm {
  fullName: string
  email: string
  gender?: Gender
  age?: number
  bio?: string

  avatarUrl?: string

  heightCm?: number
  weightKg?: number
  goalWeightKg?: number
  chestCm?: number
  waistCm?: number
  thighCm?: number
  armCm?: number

  activityLevel?: Activity_Level
  nutritionGoal?: Nutrition_Goal
}

export interface AvatarUploadProps {
  value: string | undefined
  onChange: UploadAvatarOnChangeFn
}

export type UploadAvatarOnChangeFn = (url: string) => void

export interface UploadResponse {
  url: string
  name: string
}

export interface BodyMeasurementsFormProps {
  form: UseFormReturn<ProfileForm>
}

export interface GeneralInformationFormProps {
  form: UseFormReturn<ProfileForm>
}
