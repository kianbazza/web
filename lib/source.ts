import { loader } from 'fumadocs-core/source'
import { craft } from '@/.source'
export const craftSource = loader({
  baseUrl: '/craft',
  source: craft.toFumadocsSource(),
})
