import { createFileRoute } from '@tanstack/react-router'
import ToroSleepCloud from "../components/ToroSleepCloud";
import Footer from "../components/ui/Footer";

export const Route = createFileRoute('/Home')({
  component: HomePage,
})

export default function HomePage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <ToroSleepCloud />
        <Footer />
      </div>
    </div>
  )
}
