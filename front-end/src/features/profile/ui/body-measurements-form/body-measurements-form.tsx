import Image from 'next/image'
import { Ruler, Weight } from 'lucide-react'
import { Input } from '@shared/ui'
import { BodyMeasurementsFormProps } from '../../types'

export function BodyMeasurementsForm({ form }: BodyMeasurementsFormProps) {
  const { register } = form

  return (
    <div className="rounded-xl border bg-background p-6 flex items-center gap-6">
      <div>
        <Image
          src="/images/male.svg"
          alt="Male body illustration"
          width={200}
          height={1000}
        />
      </div>

      <div>
        <h2 className="mb-6 text-lg font-semibold">Body measurements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Height (cm)"
            placeholder="Your height"
            className="pl-9 rounded-xl"
            Icon={Ruler}
            {...register('measurements.heightCm')}
          />

          <Input
            label="Weight (kg)"
            placeholder="Your weight"
            className="pl-9 rounded-xl"
            Icon={Weight}
            {...register('measurements.weightKg')}
          />

          <Input
            label="Goal weight (kg)"
            placeholder="Your goal weight"
            className="rounded-xl"
            {...register('measurements.goalWeightKg')}
          />

          <Input
            label="Chest (cm)"
            placeholder="Your chest measurement"
            className="rounded-xl"
            {...register('measurements.chestCm')}
          />

          <Input
            label="Thigh (cm)"
            placeholder="Your thigh measurement"
            className="rounded-xl"
            {...register('measurements.thighCm')}
          />

          <Input
            label="Arm (cm)"
            placeholder="Your arm measurement"
            className="rounded-xl"
            {...register('measurements.armCm')}
          />
        </div>
      </div>
    </div>
  )
}
