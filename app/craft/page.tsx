import Container from '@/components/container'
import { H } from '@/components/h'
import { CraftMasonry } from './_/masonry'

export default function ExperimentsPage() {
  return (
    <Container className="font-mono mt-16 flex flex-col gap-8 w-full mx-auto max-w-(--breakpoint-2xl)">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-4 w-full max-w-(--breakpoint-md) mx-auto">
          <h1 className="tracking-[-0.05em]! text-3xl">Craft</h1>
          <p className="font-medium text-sand-10">
            Curiousity meets <H>interface</H>. Design in <H>motion</H>.
            Experiments in <H>interaction</H>.
          </p>
        </div>
        <div className="h-px w-full bg-sand-6 mt-4" />
      </div>
      <CraftMasonry />
    </Container>
  )
}
