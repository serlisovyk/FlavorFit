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
    <div className="rounded-xl border p-6">
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
            id="fullName"
            placeholder="Enter your full name"
            Icon={User}
            className="pl-9 rounded-xl"
            error={errors.profile?.fullName}
            {...register('profile.fullName')}
          />
        </div>

        <Field
          variant={FIELD_VARIANT.INPUT}
          label="Email"
          id="email"
          placeholder="Enter your email"
          Icon={Mail}
          className="pl-9 rounded-xl"
          error={errors.email}
          {...register('email')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            control={control}
            name="profile.gender"
            render={({ field: { value, onChange } }) => (
              <Field
                variant={FIELD_VARIANT.SELECT}
                value={value || undefined}
                onChange={onChange}
                label="Gender"
                id="gender"
                placeholder="Select your gender"
                Icon={CircleSmall}
                options={GENDER_SELECT_OPTIONS}
                triggerClassName="w-full rounded-xl bg-[#f0efef] pl-9"
                error={errors.profile?.gender}
              />
            )}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Age"
            id="age"
            type="number"
            placeholder="Enter your age"
            Icon={UserCircle}
            className="pl-9 rounded-xl"
            error={errors.profile?.age}
            {...register('profile.age', { setValueAs: setValueAsNumber })}
          />
        </div>

        <Field
          variant={FIELD_VARIANT.TEXTAREA}
          label="Bio"
          id="bio"
          placeholder="Enter your bio"
          className="rounded-xl bg-[#f0efef] p-3 font-mono"
          error={errors.profile?.bio}
          {...register('profile.bio')}
        />
      </div>
    </div>
  )
}
