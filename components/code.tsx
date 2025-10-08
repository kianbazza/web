/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: allow */

import { codeToHtml } from 'shiki'

interface CodeProps {
  code: string
}
export async function Code({ code }: CodeProps) {
  const html = await codeToHtml(code, {
    lang: 'tsx',
    theme: 'github-light',
  })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
