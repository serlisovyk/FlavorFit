import { Controller } from 'react-hook-form'
import { CircleSmall, Mail, User, UserCircle } from 'lucide-react'
import { Input, Select } from '@shared/ui'
import { AvatarUpload } from '../avatar-upload'
import { setValueAsNumber } from '../../utils'
import { GENDER_SELECT_OPTIONS } from '../../constants'
import { GeneralInformationFormProps } from '../../types'

// TODO: add select with gender and update body image based on it

export function GeneralInformationForm({ form }: GeneralInformationFormProps) {
  const { register, watch, setValue, control } = form

  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-lg font-semibold">General information</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <AvatarUpload
            value={watch('avatarUrl')}
            onChange={(url) => setValue('avatarUrl', url)}
          />

          <Input
            label="Full name"
            placeholder="Enter your full name"
            className="pl-9 rounded-xl"
            Icon={User}
            {...register('profile.fullName')}
          />
        </div>

        {/* TODO: Email verification status icon */}
        <Input
          label="Email"
          placeholder="Enter your email"
          className="pl-9 rounded-xl"
          Icon={Mail}
          {...register('email')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* TODO: refactor it, create Field component */}
          <div className="relative">
            <label htmlFor="gender" className="text-sm mb-1.5 block opacity-70">
              Gender
            </label>

            <CircleSmall
              size={16}
              className="absolute bottom-2.5 left-3 opacity-50"
            />

            <Controller
              control={control}
              name="profile.gender"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value || undefined}
                  onChange={onChange}
                  options={GENDER_SELECT_OPTIONS}
                  placeholder="Select your gender"
                  triggerClassName="w-full rounded-xl bg-[#ececec] pl-9"
                  label="Gender"
                  id="gender"
                />
              )}
            />
          </div>

          <Input
            type="number"
            label="Age"
            placeholder="Enter your age"
            className="pl-9 rounded-xl"
            Icon={UserCircle}
            {...register('profile.age', { setValueAs: setValueAsNumber })}
          />
        </div>

        {/* TODO: Create ui textarea component */}
        <label className="block text-sm opacity-70" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          placeholder="Enter your bio"
          className="w-full rounded-md border resize-none bg-[#ececec] p-3 font-mono"
          {...register('profile.bio')}
        />
      </div>
    </div>
  )
}
