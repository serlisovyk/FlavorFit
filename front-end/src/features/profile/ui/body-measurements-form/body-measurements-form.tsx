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
          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Height (cm)"
            Icon={Ruler}
            id="heightCm"
            type="number"
            placeholder="Your height"
            className="pl-9 rounded-xl"
            {...register('measurements.heightCm', {
              setValueAs: setValueAsNumber,
            })}
            error={errors.measurements?.heightCm}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Weight (kg)"
            Icon={Weight}
            id="weightKg"
            type="number"
            placeholder="Your weight"
            className="pl-9 rounded-xl"
            {...register('measurements.weightKg', {
              setValueAs: setValueAsNumber,
            })}
            error={errors.measurements?.weightKg}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Goal weight (kg)"
            id="goalWeightKg"
            type="number"
            placeholder="Your goal weight"
            className="rounded-xl"
            {...register('measurements.goalWeightKg', {
              setValueAs: setValueAsNumber,
            })}
            error={errors.measurements?.goalWeightKg}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Chest (cm)"
            id="chestCm"
            type="number"
            placeholder="Your chest measurement"
            className="rounded-xl"
            {...register('measurements.chestCm', {
              setValueAs: setValueAsNumber,
            })}
            error={errors.measurements?.chestCm}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Thigh (cm)"
            id="thighCm"
            type="number"
            placeholder="Your thigh measurement"
            className="rounded-xl"
            {...register('measurements.thighCm', {
              setValueAs: setValueAsNumber,
            })}
            error={errors.measurements?.thighCm}
          />

          <Field
            variant={FIELD_VARIANT.INPUT}
            label="Arm (cm)"
            id="armCm"
            type="number"
            placeholder="Your arm measurement"
            className="rounded-xl"
            {...register('measurements.armCm', {
              setValueAs: setValueAsNumber,
            })}
            error={errors.measurements?.armCm}
          />

          <Controller
            control={control}
            name="measurements.nutritionGoal"
            render={({ field: { value, onChange } }) => (
              <Field
                variant={FIELD_VARIANT.SELECT}
                label="Nutrition Goal"
                Icon={Goal}
                id="nutritionGoal"
                value={value || undefined}
                onChange={onChange}
                placeholder="Define your nutrition goal"
                triggerClassName="w-full rounded-xl bg-[#ececec] pl-9"
                options={NUTRITION_GOAL_OPTIONS}
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
                label="Activity Level"
                Icon={Activity}
                id="activityLevel"
                value={value || undefined}
                onChange={onChange}
                placeholder="Define your activity level"
                triggerClassName="w-full rounded-xl bg-[#ececec] pl-9"
                options={ACTIVITY_LEVEL_OPTIONS}
                error={errors.measurements?.activityLevel}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
