'use client'

import {
  AnchorProvider,
  ScrollProvider,
  type TOCItemType,
} from 'fumadocs-core/toc'
import { useRef } from 'react'
import { BackToCraft } from './page'

export function TOCProvider({
  children,
  toc,
}: {
  children?: React.ReactNode
  toc: TOCItemType[]
}) {
  const viewRef = useRef<HTMLDivElement>(null)
  return (
    <AnchorProvider toc={toc}>
      <ScrollProvider containerRef={viewRef}>
        <div className="col-span-1 flex flex-col items-end">
          <div className="fixed top-36 max-xl:hidden mr-32 flex flex-col gap-4">
            <BackToCraft className="" />
            <ScrollProvider containerRef={viewRef}>
              <ul className="-translate-x-2 flex flex-col gap-1">
                {toc.map(({ title, url }) => {
                  return (
                    <a key={url} href={url}>
                      <li className="text-sm">{title}</li>
                    </a>
                  )
                })}
              </ul>
            </ScrollProvider>
          </div>
        </div>
      </ScrollProvider>
      {children}
    </AnchorProvider>
  )
}
