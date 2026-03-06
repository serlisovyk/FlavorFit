'use client'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User } from 'lucide-react'
import { useMutation } from '@apollo/client/react'
import { UpdateProfileDocument } from '@generated/graphql'
import { Button, Heading } from '@shared/ui'
import { GeneralInformationForm } from '../general-information-form'
import { BodyMeasurementsForm } from '../body-measurements-form'
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

  const { reset, handleSubmit } = form

  const [updateProfile, { loading }] = useMutation(UpdateProfileDocument, {
    onCompleted() {
      toast.success('Profile updated')
    },
  })

  const onSubmit = (data: IProfileForm) => {
    updateProfile({
      variables: {
        data: {
          ...data,
          // TODO: Refactor, move into util fn
          measurements: Object.fromEntries(
            Object.entries(data.measurements || {}).filter(
              ([key]) => key !== '__typename',
            ),
          ),
          profile: Object.fromEntries(
            Object.entries(data.profile || {}).filter(
              ([key]) => key !== '__typename',
            ),
          ),
        },
      },
    })
  }

  const handleFormReset = () => reset()

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading level={1} Icon={User}>
            Personal information
          </Heading>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleFormReset}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={loading}>
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
