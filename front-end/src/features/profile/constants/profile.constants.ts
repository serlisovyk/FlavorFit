import { Activity_Level, Gender, Nutrition_Goal } from '@generated/graphql'

export const GENDER_SELECT_OPTIONS = [
  {
    value: Gender.Male,
    label: 'Male',
  },
  {
    value: Gender.Female,
    label: 'Female',
  },
]

export const NUTRITION_GOAL_OPTIONS = [
  {
    value: Nutrition_Goal.Maintenance,
    label: 'Maintain Weight',
  },
  {
    value: Nutrition_Goal.MuscleGain,
    label: 'Gain Muscle',
  },
  {
    value: Nutrition_Goal.WeightLoss,
    label: 'Lose Weight',
  },
]

export const ACTIVITY_LEVEL_OPTIONS = [
  {
    value: Activity_Level.Active,
    label: 'Active',
  },
  {
    value: Activity_Level.Light,
    label: 'Lightly Active',
  },
  {
    value: Activity_Level.Moderate,
    label: 'Moderately Active',
  },
  {
    value: Activity_Level.Sedentary,
    label: 'Sedentary',
  },
  {
    value: Activity_Level.VeryActive,
    label: 'Very Active',
  },
]
