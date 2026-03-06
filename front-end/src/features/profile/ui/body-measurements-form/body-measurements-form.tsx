import Image from 'next/image'
import { Controller } from 'react-hook-form'
import { Activity, Goal, Ruler, Weight } from 'lucide-react'
import { Input, Select } from '@shared/ui'
import { setValueAsNumber } from '../../utils'
import { BodyMeasurementsFormProps } from '../../types'
import { ACTIVITY_LEVEL_OPTIONS, NUTRITION_GOAL_OPTIONS } from '../../constants'

export function BodyMeasurementsForm({ form }: BodyMeasurementsFormProps) {
  const { register, control } = form

  const gender = form.watch('profile.gender')

  return (
    <div className="rounded-xl border bg-background p-6 flex items-center gap-6">
      <div>
        <Image
          src={`/images/${gender}.svg`}
          alt={`${gender} body illustration`}
          width={200}
          height={1000}
        />
      </div>

      <div>
        <h2 className="mb-6 text-lg font-semibold">Body measurements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Height (cm)"
            placeholder="Your height"
            className="pl-9 rounded-xl"
            Icon={Ruler}
            {...register('measurements.heightCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Input
            type="number"
            label="Weight (kg)"
            placeholder="Your weight"
            className="pl-9 rounded-xl"
            Icon={Weight}
            {...register('measurements.weightKg', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Input
            type="number"
            label="Goal weight (kg)"
            placeholder="Your goal weight"
            className="rounded-xl"
            {...register('measurements.goalWeightKg', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Input
            type="number"
            label="Chest (cm)"
            placeholder="Your chest measurement"
            className="rounded-xl"
            {...register('measurements.chestCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Input
            type="number"
            label="Thigh (cm)"
            placeholder="Your thigh measurement"
            className="rounded-xl"
            {...register('measurements.thighCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Input
            type="number"
            label="Arm (cm)"
            placeholder="Your arm measurement"
            className="rounded-xl"
            {...register('measurements.armCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <div className="relative">
            <label
              htmlFor="nutritionGoal"
              className="text-sm mb-1.5 block opacity-70"
            >
              Nutrition Goal
            </label>

            <Goal size={16} className="absolute bottom-2.5 left-3 opacity-50" />

            <Controller
              control={control}
              name="measurements.nutritionGoal"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value || undefined}
                  onChange={onChange}
                  placeholder="Define your nutrition goal"
                  triggerClassName="w-full rounded-xl bg-[#ececec] pl-9"
                  label="Nutrition Goal"
                  id="nutritionGoal"
                  options={NUTRITION_GOAL_OPTIONS}
                />
              )}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="activityLevel"
              className="text-sm mb-1.5 block opacity-70"
            >
              Activity Level
            </label>

            <Activity
              size={16}
              className="absolute bottom-2.5 left-3 opacity-50"
            />

            <Controller
              control={control}
              name="measurements.activityLevel"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value || undefined}
                  onChange={onChange}
                  placeholder="Define your activity level"
                  triggerClassName="w-full rounded-xl bg-[#ececec] pl-9"
                  label="Activity Level"
                  id="activityLevel"
                  options={ACTIVITY_LEVEL_OPTIONS}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
