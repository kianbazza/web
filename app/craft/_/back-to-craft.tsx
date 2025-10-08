import { ArrowUpLeftIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BackToCraft({ className }: { className?: string }) {
  return (
    <a
      href="/craft"
      className={cn(
        'flex items-center gap-2 text-sand-10 group hover:text-sand-12 transition-[color] duration-150 ease-out',
        className,
      )}
    >
      <div>
        <div className="overflow-hidden size-4 absolute top-0 -left-3">
          <div className="relative *:transition-all *:size-4">
            <ArrowUpLeftIcon className="absolute top-0 left-0 group-hover:-translate-x-4 group-hover:-translate-y-4" />
            <ArrowUpLeftIcon className="absolute top-0 left-0 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0" />
          </div>
        </div>
      </div>
      <span>Craft</span>
    </a>
  )
}
