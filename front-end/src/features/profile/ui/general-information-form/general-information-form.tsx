import { Mail, User, UserCircle } from 'lucide-react'
import { Input } from '@shared/ui'
import { AvatarUpload } from '../avatar-upload'
import { GeneralInformationFormProps } from '../../types'

// TODO: add select with gender and update body image based on it

export function GeneralInformationForm({ form }: GeneralInformationFormProps) {
  const { register, watch, setValue } = form

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

        <Input
          type="number"
          label="Age"
          placeholder="Enter your age"
          className="pl-9 rounded-xl"
          Icon={UserCircle}
          {...register('profile.age')}
        />

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
