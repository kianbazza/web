import { ArrowBigLeft } from 'lucide-react'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="m-auto flex min-h-screen max-w-screen-md flex-col p-4">
      {/* <Link href="/"> */}
      {/*   <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"> */}
      {/*     <ArrowBigLeft className="h-4 w-4" /> Home */}
      {/*   </div> */}
      {/* </Link> */}
      {children}
    </div>
  )
}
