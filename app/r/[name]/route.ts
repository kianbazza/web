import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { PostHog } from 'posthog-node'
import { env } from '@/lib/env'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params

  const filePath = join(process.cwd(), 'public', 'r', `${name}.json`)

  let data: string
  try {
    data = await readFile(filePath, 'utf-8')
  } catch {
    return Response.json({ error: 'Registry item not found' }, { status: 404 })
  }

  const registryItem = JSON.parse(data)

  const posthog = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
  })

  posthog.capture({
    distinctId: 'anonymous',
    event: 'registry_item_installed',
    properties: {
      registry_item: name,
      title: registryItem.title,
      type: registryItem.type,
      categories: registryItem.categories,
      $host: _request.headers.get('host') ?? undefined,
    },
  })

  await posthog.shutdown()

  return Response.json(registryItem)
}
