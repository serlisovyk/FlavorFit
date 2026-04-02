import { Button } from '@shared/ui'
import { Plus, Utensils } from 'lucide-react'
import Image from 'next/image'

export function RecipesBanners() {
  return (
    <div className="grid grid-cols-[2.5fr_1fr] gap-5 mb-5">
      <div className="relative rounded-2xl bg-linear-to-r from-primary-dark to-primary px-8 py-4 text-white">
        <div className="absolute -bottom-1 -left-6">
          <Image
            src="/images/burger.png"
            alt="Burger"
            width={170}
            height={140}
            className="h-auto w-42.5"
            draggable={false}
            priority
          />
        </div>

        <div className="ml-32.5 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h2 className="text-4xl leading-none font-black tracking-[-0.02em] italic">
              Got a Recipe That Rocks?
            </h2>

            <p className="mt-2 text-sm text-white/80">
              Share It &amp; Shine! Your recipe might just become the next big
              hit!
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Gain Recognition',
                'Inspire Others',
                'Showcase Your Skills',
              ].map((text) => (
                <span
                  key={text}
                  className="rounded-md bg-white/12 px-3 py-1 text-sm font-medium backdrop-blur-xs"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="soft"
            className="shrink-0 rounded-full bg-white px-5 text-black hover:bg-white/90"
          >
            <Plus />
            Add Recipe
          </Button>
        </div>
      </div>

      <div className="rounded-2xl flex flex-col justify-between bg-white px-5 py-4">
        <div className="flex items-center gap-2 font-semibold text-black text-lg">
          <Utensils size={20} className="opacity-60" />
          <span>Your Recipes</span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="flex items-end gap-2">
            <span className="text-4xl italic leading-none font-black tracking-[-0.04em]">
              12
            </span>
            <span className="text-black/45">Created</span>
          </div>

          <div className="flex -space-x-3">
            {[
              '/images/avatars/avatar1.png',
              '/images/avatars/avatar2.png',
              '/images/avatars/avatar3.png',
              '/images/avatars/avatar4.png',
            ].map((src, index) => (
              <div
                key={src}
                className="relative size-9 overflow-hidden rounded-full border-2 border-white bg-white"
              >
                <Image
                  src={src + index}
                  alt={`Recipe author ${index + 1}`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
