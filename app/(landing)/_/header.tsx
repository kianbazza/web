'use client'

import { Signature } from '@/components/signature'
import { BazzaLabsIcon, BazzaUIIcon, NavatticIcon } from '@/lib/icons'
import { Section } from './section'

export const Header = () => {
  return (
    <Section className="space-y-8">
      <Signature className="max-w-[300px] sm:max-w-[400px] pt-4 stroke-sand-12" />
      <div className="flex flex-col gap-y-4">
        <p className="mb-6 text-sand-12">
          Crafting beautiful, modern interfaces for the web.
        </p>

        <div className="space-y-1 **:text-base **:leading-7">
          <p className="text-sand-9">
            I work as a design engineer at{' '}
            <NavatticIcon className="fill-sand-12 size-4 inline ml-1 translate-y-[-1px]" />{' '}
            <span className="text-sand-12 tracking-tight">Navattic</span>.
          </p>
          <p className="text-sand-9">
            Through my design studio,{' '}
            <BazzaLabsIcon className="fill-sand-12 size-4 inline translate-y-[-1px]" />{' '}
            <span className="text-sand-12 tracking-tight">Bazza Labs</span>, I
            partner with startups.{' '}
          </p>
          <p className="text-sand-9">
            Building <BazzaUIIcon className="size-4 inline ml-1" />{' '}
            <span className="text-sand-12 tracking-tight">bazza/ui</span>, my
            vision for interface excellence.
          </p>
          {/*<p className="text-sand-9">
            <BazzaUIIcon className="size-4 inline ml-1" />{' '}
            <span className="text-sand-12 tracking-tight">bazza/ui</span> is my
            vision for interface excellence on the web.
          </p>*/}
        </div>
      </div>
    </Section>
  )
}
