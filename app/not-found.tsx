import { randomInt } from 'node:crypto'
import Container from '@/components/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404',
}

export default function NotFound() {
  return (
    <Container className="flex flex-col justify-center my-auto gap-8 select-none">
      <div className="font-mono font-medium text-sand-10 text-xl flex flex-col">
        <div>
          <span className="text-plum-10">catch</span>{' '}
          <span className="text-sand-10">(</span>
          <span className="text-sand-12">e</span>
          <span className="text-sand-10">)</span>{' '}
          <span className="text-sand-10">{'{'}</span>
        </div>
        <div className="flex flex-col ml-[2ch] my-2">
          <div>
            <span className="text-sand-11">console</span>
            <span className="text-blue-11">.</span>
            <span className="text-blue-10">error</span>
            <span className="text-sand-10">(</span>
            <span className="text-sand-12 dark:text-lime-10">{'`'}</span>
          </div>
          <div className="ml-[2ch] flex flex-col my-2 dark:text-lime-10 text-sand-10">
            {messages[randomInt(messages.length)].map((m, i, arr) => (
              <span key={m}>
                {m}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
          <div>
            <span className="text-sand-12 dark:text-lime-10">{'`'}</span>
            <span>)</span>
            <span className="text-blue-11">{';'}</span>
          </div>
          <div className="mt-2">
            <span className="text-plum-10">throw</span>{' '}
            <span className="text-blue-11">new</span>{' '}
            <span className="text-blue-10">Error</span>(
            <span className="text-red-10">'404 — Not Found.'</span>
            );
          </div>
        </div>
        {'}'}
      </div>
    </Container>
  )
}

const messages = [
  [
    'I walk this empty street',
    'On the Boulevard of Broken Dreams',
    'Where the city sleeps',
    "And I'm the only one, and I walk alone",
  ],
  ['You 404’d it. Congratulations.'],
  [
    'We looked everywhere…',
    'under the couch,',
    'behind the fridge,',
    'even in Narnia.',
    "It's gone.",
  ],
]
