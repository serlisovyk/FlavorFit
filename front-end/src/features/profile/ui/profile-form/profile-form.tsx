'use client'

import { useForm } from 'react-hook-form'
import { User } from 'lucide-react'
import { Button, Heading } from '@shared/ui'
import { GeneralInformationForm } from '../general-information-form'
import { BodyMeasurementsForm } from '../body-measurements-form'
import { useUpdateProfile } from '../../queries'
import { ProfileForm as IProfileForm, ProfileFormProps } from '../../types'

export function ProfileForm({ data }: ProfileFormProps) {
  const form = useForm<IProfileForm>({
    mode: 'onChange',
    defaultValues: {
      email: data?.me?.email ?? '',
      avatarUrl: data?.me?.avatarUrl ?? '',
      measurements: data?.me?.measurements ?? {},
      profile: data?.me?.profile ?? {},
    },
  })

  const { reset, handleSubmit, formState: { isValid } } = form

  const { updateProfile, isLoading } = useUpdateProfile()

  const onSubmit = (data: IProfileForm) => updateProfile(data)

  const handleFormReset = () => reset()

  const isButtonsDisabled = isLoading || !isValid

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading level={1} Icon={User}>
            Personal information
          </Heading>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleFormReset} disabled={isButtonsDisabled}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={isButtonsDisabled}>
              Save changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <GeneralInformationForm form={form} />
          <BodyMeasurementsForm form={form} />
        </div>
      </form>
    </div>
  )
}
