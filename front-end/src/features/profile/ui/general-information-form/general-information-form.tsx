import { Mail, User, UserCircle } from 'lucide-react'
import { Input } from '@shared/ui'
import { AvatarUpload } from '../avatar-upload'
import { GeneralInformationFormProps } from '../../types'

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
            placeholder="Full name"
            className="pl-9 rounded-xl"
            Icon={User}
            {...register('fullName')}
          />
        </div>

        {/* TODO: Email verification status icon */}
        <Input
          label="Email"
          placeholder="Email"
          className="pl-9 rounded-xl"
          Icon={Mail}
          {...register('email')}
        />

        <Input
          type="number"
          label="Age"
          placeholder="Age"
          className="pl-9 rounded-xl"
          Icon={UserCircle}
          {...register('age')}
        />

        {/* TODO: Create ui textarea component */}
        <label className="block text-sm opacity-70" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          placeholder="Bio"
          className="w-full rounded-md border resize-none bg-[#ececec] p-3 font-mono"
          {...register('bio')}
        />
      </div>
    </div>
  )
}
