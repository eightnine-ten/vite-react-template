const fileRegex = /\.(my-file-ext)$/

export default function myPlugin() {
  return {
    name: 'transform-file',
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: 123,
          map: null // provide source map if available
        }
      }
    }
  }
}