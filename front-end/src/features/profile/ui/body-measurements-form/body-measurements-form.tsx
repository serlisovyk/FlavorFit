import Image from 'next/image'
import { Controller, useWatch } from 'react-hook-form'
import { Activity, Goal, Ruler, Weight } from 'lucide-react'
import { Field, FIELD_VARIANT } from '@shared/ui'
import { setValueAsNumber } from '../../utils'
import { BodyMeasurementsFormProps } from '../../types'
import { ACTIVITY_LEVEL_OPTIONS, NUTRITION_GOAL_OPTIONS } from '../../constants'

export function BodyMeasurementsForm({ form }: BodyMeasurementsFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form

  const gender = useWatch({
    control,
    name: 'profile.gender',
  })?.toLocaleLowerCase()

  return (
    <div className="rounded-xl border p-6 flex items-center gap-6">
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
          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Height (cm)"
            id="heightCm"
            type="number"
            placeholder="Your height"
            icon={Ruler}
            className="pl-9 rounded-xl"
            error={errors.measurements?.heightCm}
            {...register('measurements.heightCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Weight (kg)"
            id="weightKg"
            type="number"
            placeholder="Your weight"
            icon={Weight}
            className="pl-9 rounded-xl"
            error={errors.measurements?.weightKg}
            {...register('measurements.weightKg', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Goal weight (kg)"
            id="goalWeightKg"
            type="number"
            placeholder="Your goal weight"
            className="rounded-xl"
            error={errors.measurements?.goalWeightKg}
            {...register('measurements.goalWeightKg', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Chest (cm)"
            id="chestCm"
            type="number"
            placeholder="Your chest measurement"
            className="rounded-xl"
            error={errors.measurements?.chestCm}
            {...register('measurements.chestCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Thigh (cm)"
            id="thighCm"
            type="number"
            placeholder="Your thigh measurement"
            className="rounded-xl"
            error={errors.measurements?.thighCm}
            {...register('measurements.thighCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Arm (cm)"
            id="armCm"
            type="number"
            placeholder="Your arm measurement"
            className="rounded-xl"
            error={errors.measurements?.armCm}
            {...register('measurements.armCm', {
              setValueAs: setValueAsNumber,
            })}
          />

          <Controller
            control={control}
            name="measurements.nutritionGoal"
            render={({ field: { value, onChange } }) => (
              <Field
                variant={FIELD_VARIANT.SELECT}
                value={value || undefined}
                onChange={onChange}
                label="Nutrition Goal"
                id="nutritionGoal"
                placeholder="Define your nutrition goal"
                icon={Goal}
                options={NUTRITION_GOAL_OPTIONS}
                triggerClassName="w-full rounded-xl bg-[#f0efef] pl-9"
                error={errors.measurements?.nutritionGoal}
              />
            )}
          />

          <Controller
            control={control}
            name="measurements.activityLevel"
            render={({ field: { value, onChange } }) => (
              <Field
                variant={FIELD_VARIANT.SELECT}
                value={value || undefined}
                onChange={onChange}
                label="Activity Level"
                id="activityLevel"
                placeholder="Define your activity level"
                icon={Activity}
                options={ACTIVITY_LEVEL_OPTIONS}
                triggerClassName="w-full rounded-xl bg-[#f0efef] pl-9"
                error={errors.measurements?.activityLevel}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
