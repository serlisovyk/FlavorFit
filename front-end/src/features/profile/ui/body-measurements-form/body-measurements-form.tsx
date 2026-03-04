import { Ruler, Weight } from 'lucide-react'
import { Input } from '@shared/ui'
import { BodyMeasurementsFormProps } from '../../types'

export function BodyMeasurementsForm({ form }: BodyMeasurementsFormProps) {
  const { register } = form

  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-lg font-semibold">Body measurements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Height"
          placeholder="Height cm"
          className="pl-9 rounded-xl"
          Icon={Ruler}
          {...register('heightCm')}
        />

        <Input
          label="Weight"
          placeholder="Weight kg"
          className="pl-9 rounded-xl"
          Icon={Weight}
          {...register('weightKg')}
        />

        <Input
          label="Goal weight"
          placeholder="Goal weight"
          className="pl-9 rounded-xl"
          {...register('goalWeightKg')}
        />

        <Input
          label="Chest"
          placeholder="Chest cm"
          className="pl-9 rounded-xl"
          {...register('chestCm')}
        />

        <Input
          label="Thigh"
          placeholder="Thigh cm"
          className="pl-9 rounded-xl"
          {...register('thighCm')}
        />

        <Input
          label="Arm"
          placeholder="Arm cm"
          className="pl-9 rounded-xl"
          {...register('armCm')}
        />
      </div>
    </div>
  )
}
