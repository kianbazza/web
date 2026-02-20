import { BackLink } from '@/components/back-link'

export function BackToCraft({ className }: { className?: string }) {
  return <BackLink href="/craft" label="Craft" className={className} />
}
