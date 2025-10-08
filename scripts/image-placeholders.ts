import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

async function getDynamicDataUrls() {
  const data: Record<string, string> = {}

  const argsMap = new Map()
  const args = process.argv.slice(2)

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      argsMap.set(args[i], args[++i])
    }
  }

  const filePath = argsMap.get('--file')
  const directoryPath = argsMap.get('--dir') || './public/images'
  const max = parseInt(argsMap.get('--max'), 10) || 14

  async function processDirectory(directory: string) {
    if (filePath) {
      throw new Error('Cannot use --file and --dir together')
    }

    const items = fs.readdirSync(directory, { withFileTypes: true })

    const calls = items.map(async (item) => {
      if (item.isDirectory()) {
        await processDirectory(path.join(directory, item.name))
      } else if (
        item.isFile() &&
        (item.name.endsWith('.jpg') || item.name.endsWith('.jpeg'))
      ) {
        await processImage(path.join(directory, item.name))
      }
    })

    await Promise.all(calls)
  }

  async function processImage(imagePath: string) {
    const metaBefore = await sharp(imagePath).metadata()

    const { data: resizedImage } = await sharp(imagePath)
      .resize(max, max, { fit: 'inside' })
      .toBuffer({ resolveWithObject: true })

    const base64str = resizedImage.toString('base64')

    const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${metaBefore.width} ${metaBefore.height}'>
      <filter id="b">
        <feGaussianBlur
          in="SourceGraphic"
          result="blur"
          stdDeviation="0.2"
        ></feGaussianBlur>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="1"></feFuncA>
        </feComponentTransfer>
      </filter>
      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'
      href='data:image/jpeg;base64,${base64str}' />
    </svg>
  `

    const toBase64 = (str: string) =>
      typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

    const key = filePath
      ? filePath
      : `/images/${path.relative(directoryPath, imagePath)}`
    data[key] = `data:image/svg+xml;base64,${toBase64(blurSvg)}`
  }

  if (filePath) {
    await processImage(filePath)

    console.log(data[filePath])

    return
  } else {
    await processDirectory(directoryPath)

    fs.writeFileSync(
      `./app/_lib/${'dynamic-data-urls'}.ts`,
      `export const imageDataUrls = ${JSON.stringify(data)} as const`,
    )

    console.log('Dynamic data URLs file created', data)
  }
}

getDynamicDataUrls()
