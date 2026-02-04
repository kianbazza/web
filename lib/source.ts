import { craft } from 'fumadocs-mdx:collections/server'
import { loader } from 'fumadocs-core/source'
export const craftSource = loader({
  baseUrl: '/craft',
  source: craft.toFumadocsSource(),
})
