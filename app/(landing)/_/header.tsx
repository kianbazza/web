'use client'

import { H } from '@/components/h'
import { Signature } from '@/components/signature'
import { Section } from './section'

export const Header = () => {
  return (
    <Section className="space-y-8">
      <Signature className="max-w-[300px] sm:max-w-[400px] pt-4 stroke-sand-12" />
      <div className="space-y-4 tracking-[-0.01em]">
        <p className="font-mono font-semibold text-sand-9">
          I'm a <H>design engineer</H> with a passion for crafting{' '}
          <H>beautiful, modern interfaces</H>.
        </p>
        <p className="font-mono font-semibold text-sand-9">
          My professional experience in <H>backend systems</H> — AWS, Linux and
          Kubernetes — helps me bring my ideas to life.
        </p>
      </div>
    </Section>
  )
}
