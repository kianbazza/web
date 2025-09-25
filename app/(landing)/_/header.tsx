'use client'

import { H } from '@/components/h'
import { Signature } from '@/components/signature'
import { BazzaLabsIcon, NavatticIcon } from '@/lib/icons'
import { Section } from './section'

export const Header = () => {
  return (
    <Section className="space-y-8">
      <Signature className="max-w-[300px] sm:max-w-[400px] pt-4 stroke-sand-12" />
      <div className="space-y-2">
        <p className="mb-6 text-sand-12">
          Crafting beautiful, modern interfaces for the web.
        </p>
        <p className="text-sand-9">
          Design engineer at{' '}
          <NavatticIcon className="ml-1 inline align-middle size-4 fill-sand-12 translate-y-[-1px]" />{' '}
          <H>Navattic</H>.
        </p>
        <p className="text-sand-9">
          Creating web experiences for startups at{' '}
          <BazzaLabsIcon className="ml-1 inline align-middle size-4 fill-sand-12 translate-y-[-1px]" />{' '}
          <H>Bazza Labs</H>.
        </p>
      </div>
    </Section>
  )
}
