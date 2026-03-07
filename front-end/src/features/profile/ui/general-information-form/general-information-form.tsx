import { Controller, useWatch } from 'react-hook-form'
import { CircleSmall, Mail, User, UserCircle } from 'lucide-react'
import { Field, FIELD_VARIANT } from '@shared/ui'
import { AvatarUpload } from '../avatar-upload'
import { setValueAsNumber } from '../../utils'
import { GENDER_SELECT_OPTIONS } from '../../constants'
import { GeneralInformationFormProps } from '../../types'

export function GeneralInformationForm({ form }: GeneralInformationFormProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form

  const avatarUrl = useWatch({ control, name: 'avatarUrl' })

  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-lg font-semibold">General information</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <AvatarUpload
            value={avatarUrl}
            onChange={(url) => setValue('avatarUrl', url)}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Full name"
            Icon={User}
            id="fullName"
            placeholder="Enter your full name"
            className="pl-9 rounded-xl"
            {...register('profile.fullName')}
            error={errors.profile?.fullName}
          />
        </div>

        <Field
          variant={FIELD_VARIANT.INPUT}
          label="Email"
          Icon={Mail}
          id="email"
          placeholder="Enter your email"
          className="pl-9 rounded-xl"
          {...register('email')}
          error={errors.email}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            control={control}
            name="profile.gender"
            render={({ field: { value, onChange } }) => (
              <Field
                variant={FIELD_VARIANT.SELECT}
                label="Gender"
                Icon={CircleSmall}
                id="gender"
                value={value || undefined}
                onChange={onChange}
                options={GENDER_SELECT_OPTIONS}
                placeholder="Select your gender"
                triggerClassName="w-full rounded-xl bg-[#ececec] pl-9"
                error={errors.profile?.gender}
              />
            )}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Age"
            Icon={UserCircle}
            id="age"
            type="number"
            placeholder="Enter your age"
            className="pl-9 rounded-xl"
            {...register('profile.age', { setValueAs: setValueAsNumber })}
            error={errors.profile?.age}
          />
        </div>

        <Field
          variant={FIELD_VARIANT.TEXTAREA}
          label="Bio"
          id="bio"
          placeholder="Enter your bio"
          className="rounded-xl bg-[#ececec] p-3 font-mono"
          {...register('profile.bio')}
          error={errors.profile?.bio}
        />
      </div>
    </div>
  )
}
