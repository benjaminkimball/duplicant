export default class EntrypointPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('EntrypointPlugin', this.handleEmit)
  }

  handleEmit = (compilation) => {
    const main = compilation.entrypoints.get('main')
    const filename = main.runtimeChunk.files.find((file) => /\.js$/.test(file))
    const data = `export ENTRYPOINT_FILENAME=${filename}`

    compilation.assets['.entrypoint'] = {
      source: () => data,
      size: () => data.length
    }
  }
}
