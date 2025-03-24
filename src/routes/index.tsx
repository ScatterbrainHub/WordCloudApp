import { createFileRoute } from '@tanstack/react-router'
import ToroSleepCloud from "../components/ToroSleepCloud";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col gap-6">
        <ToroSleepCloud />
      </div>
    </div>
  )
}

export default RouteComponent;