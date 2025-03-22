import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/About')({
  component: RouteComponent,
})

export default function RouteComponent() {
  return <div>Hello "/About"!</div>
}
