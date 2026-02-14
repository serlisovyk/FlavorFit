import ThemeToggle from '@features/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex justify-end p-6">
        <ThemeToggle />
      </div>
      <main className="px-6 pb-10">Home page</main>
    </div>
  )
}
