import { BackLink } from '@/components/back-link'

export function BackToTools({ className }: { className?: string }) {
  return <BackLink href="/tools" label="Tools" className={className} />
}
