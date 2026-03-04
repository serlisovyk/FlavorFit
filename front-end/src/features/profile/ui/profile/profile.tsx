'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { User } from 'lucide-react'
import { useMutation, useQuery } from '@apollo/client/react'
import { GetProfileDocument, UpdateProfileDocument } from '@generated/graphql'
import { Button, Heading } from '@shared/ui'
import { GeneralInformationForm } from '../general-information-form'
import { BodyMeasurementsForm } from '../body-measurements-form'
import { ProfileForm } from '../../types'

export function Profile() {
  const { data } = useQuery(GetProfileDocument)

  const form = useForm<ProfileForm>({
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!data?.me) return

    form.reset({
      email: data.me.email,
      avatarUrl: data.me?.avatarUrl || undefined,
      fullName: data.me?.profile?.fullName,
      gender: data.me?.profile?.gender || undefined,
      age: data.me?.profile?.age || undefined,
      bio: data.me?.profile?.bio || undefined,
      heightCm: data.me?.measurements?.heightCm || undefined,
      weightKg: data.me?.measurements?.weightKg || undefined,
      goalWeightKg: data.me?.measurements?.goalWeightKg || undefined,
      chestCm: data.me?.measurements?.chestCm || undefined,
      waistCm: data.me?.measurements?.waistCm || undefined,
      thighCm: data.me?.measurements?.thighCm || undefined,
      armCm: data.me?.measurements?.armCm || undefined,
      activityLevel: data.me?.measurements?.activityLevel || undefined,
      nutritionGoal: data.me?.measurements?.nutritionGoal || undefined,
    })
  }, [data, form])

  const [updateProfile, { loading }] = useMutation(UpdateProfileDocument, {
    onCompleted() {
      toast.success('Profile updated')
    },
  })

  const submit = form.handleSubmit((data) => {
    updateProfile({
      variables: {
        data: {
          profile: {
            fullName: data.fullName,
            gender: data.gender,
            age: data.age,
            bio: data.bio,
          },
          measurements: {
            heightCm: data.heightCm,
            weightKg: data.weightKg,
            goalWeightKg: data.goalWeightKg,
            chestCm: data.chestCm,
            waistCm: data.waistCm,
            thighCm: data.thighCm,
            armCm: data.armCm,
            activityLevel: data.activityLevel,
            nutritionGoal: data.nutritionGoal,
          },
        },
      },
    })
  })

  return (
    <div>
      <form onSubmit={submit} className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading level={1} Icon={User}>
            Personal information
          </Heading>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button variant="accent" disabled={loading}>
              Save changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GeneralInformationForm form={form} />
          <BodyMeasurementsForm form={form} />
        </div>
      </form>
    </div>
  )
}
