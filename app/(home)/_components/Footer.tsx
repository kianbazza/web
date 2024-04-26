import Image from 'next/image'
import bazzadev from '@/public/bazzadev.png'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="flex flex-col gap-12">
      <Separator />
      <div className="inline-flex items-center justify-center gap-2">
        <Image
          priority
          src={bazzadev}
          alt="BazzaDEV"
          height={24}
        />
        <span className="font-mono text-xs tracking-tighter text-muted-foreground">
          Built by <span className="text-primary dark:text-zinc-300">me</span>.
        </span>
      </div>
    </footer>
  )
}
