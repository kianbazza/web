import A from "@/components/A"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function Footer() {
  return (
    <footer
      className={cn("text-slate-400 dark:text-slate-500 text-sm flex flex-col")}
    >
      <Separator className="mb-5" orientation="horizontal" />
      <div>Copyright © 2023 by Kian Bazarjani.</div>

      <span className="sm:whitespace-pre">
        Built with ❤️ //{" "}
        <A className="hover:underline" href="https://nextjs.org/">
          Next.js
        </A>
        ,{" "}
        <A className="hover:underline" href="https://ui.shadcn.com/">
          shadcn/ui
        </A>
        ,{" "}
        <A className="hover:underline" href="https://www.framer.com/motion/">
          Framer Motion
        </A>
        .
      </span>
    </footer>
  )
}
