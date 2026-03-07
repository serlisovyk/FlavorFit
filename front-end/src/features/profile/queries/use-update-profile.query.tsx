import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client/react'
import { UpdateProfileDocument } from '@generated/graphql'
import { omitTypename } from '../utils'
import { ProfileForm } from '../types'

export function useUpdateProfile() {
  const [update, { loading }] = useMutation(UpdateProfileDocument, {
    onCompleted() {
      toast.success('Profile updated')
    },
  })

  function updateProfile(data: ProfileForm) {
    update({
      variables: {
        data: {
          ...data,
          measurements: omitTypename(data.measurements || {}),
          profile: omitTypename(data.profile || {}),
        },
      },
    })
  }

  return { updateProfile, isLoading: loading }
}
