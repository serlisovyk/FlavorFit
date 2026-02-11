import { useGetProfileQuery } from '@generated/output'

export default function ProfilePage() {
  const { data } = useGetProfileQuery()

  console.log(data)

  return <div>ProfilePage</div>
}
