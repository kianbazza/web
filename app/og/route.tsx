import { ImageResponse } from 'next/og'

async function loadAssets(): Promise<
  { name: string; data: Buffer; weight: 400 | 600; style: 'normal' }[]
> {
  const [
    { data: normal },
    { data: semibold },
    { data: berkeleyMono550 },
    { data: berkeleyMono420 },
  ] = await Promise.all([
    import('./inter-regular-woff2.json').then((mod) => mod.default || mod),
    import('./inter-display-semibold.json').then((mod) => mod.default || mod),
    import('./berkeley-mono-550.json').then((mod) => mod.default || mod),
    import('./berkeley-mono-420.json').then((mod) => mod.default || mod),
  ])

  return [
    {
      name: 'Inter',
      data: Buffer.from(normal, 'base64'),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Inter Display',
      data: Buffer.from(semibold, 'base64'),
      weight: 600 as const,
      style: 'normal' as const,
    },
    {
      name: 'Berkeley Mono 550',
      data: Buffer.from(berkeleyMono550, 'base64'),
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Berkeley Mono 420',
      data: Buffer.from(berkeleyMono420, 'base64'),
      weight: 400 as const,
      style: 'normal' as const,
    },
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title')
  const description = searchParams.get('description')

  const [fonts] = await Promise.all([loadAssets()])

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 628,
      }}
      tw="bg-[#FDFDFC] flex flex-col relative"
    >
      <div tw="flex border absolute border-[#E9E8E6] border-dashed inset-y-0 left-16 w-[1px]" />
      <div tw="flex border absolute border-[#E9E8E6] border-dashed inset-y-0 right-16 w-[1px]" />
      <div tw="flex border absolute border-[#E9E8E6] inset-x-0 h-[1px] bottom-16" />
      <div tw="flex border absolute border-[#E9E8E6] inset-x-0 h-[1px] top-16" />
      <div tw="flex border-l border-t absolute border-[#82827C] border-dashed top-16 left-16 h-[32px] w-[32px]" />
      <div tw="flex border-r border-t absolute border-[#82827C] border-dashed top-16 right-16 h-[32px] w-[32px]" />
      <div tw="flex border-r border-b absolute border-[#82827C] border-dashed bottom-16 right-16 h-[32px] w-[32px]" />
      <div tw="flex border-l border-b absolute border-[#82827C] border-dashed bottom-16 left-16 h-[32px] w-[32px]" />
      <div tw="flex-1 flex flex-col m-12 justify-end relative">
        <div tw="flex flex-col mt-12 mb-6 mx-12 justify-center">
          <p
            tw="text-4xl text-[#0D74CE]"
            style={{
              fontFamily: 'Berkeley Mono 420',
            }}
          >
            CRAFT
          </p>
          <p
            tw="text-7xl text-[#21201C] flex items-center leading-[1.2]"
            style={{
              fontFamily: 'Berkeley Mono 550',
              textWrap: 'balance',
            }}
          >
            {title}
          </p>
          <span
            tw="mt-8 text-4xl text-neutral-200 leading-[1.3]"
            style={{ fontFamily: 'Inter' }}
          >
            {description}
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 628,
      fonts,
    },
  )
}
