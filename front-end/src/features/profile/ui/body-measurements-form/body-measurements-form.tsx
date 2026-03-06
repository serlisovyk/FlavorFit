import Image from 'next/image'
import { Activity, Goal, Ruler, Weight } from 'lucide-react'
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shared/ui'
import { setValueAsNumber } from '../../utils'
import { BodyMeasurementsFormProps } from '../../types'
import { Controller } from 'react-hook-form'
import { Activity_Level, Nutrition_Goal } from '@generated/graphql'

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
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full rounded-xl bg-[#ececec] pl-9">
                    <SelectValue placeholder="Select a nutrition goal" />
                  </SelectTrigger>
                  <SelectContent id="nutritionGoal">
                    <SelectGroup>
                      <SelectLabel>Nutrition Goal</SelectLabel>
                      <SelectItem value={Nutrition_Goal.Maintenance}>
                        Maintenance
                      </SelectItem>
                      <SelectItem value={Nutrition_Goal.MuscleGain}>
                        Muscle Gain
                      </SelectItem>
                      <SelectItem value={Nutrition_Goal.WeightLoss}>
                        Weight Loss
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
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
              render={({ field }) => (
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full rounded-xl bg-[#ececec] pl-9">
                    <SelectValue placeholder="Define your activity level" />
                  </SelectTrigger>
                  <SelectContent id="activityLevel">
                    <SelectGroup>
                      <SelectLabel>Activity Level</SelectLabel>
                      <SelectItem value={Activity_Level.Active}>
                        Active
                      </SelectItem>
                      <SelectItem value={Activity_Level.Light}>
                        Light
                      </SelectItem>
                      <SelectItem value={Activity_Level.Moderate}>
                        Moderate
                      </SelectItem>
                      <SelectItem value={Activity_Level.Sedentary}>
                        Very Sedentary
                      </SelectItem>
                      <SelectItem value={Activity_Level.VeryActive}>
                        Very Active
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
          </div>
        </div>
      </div>
    </div>
  )
}
