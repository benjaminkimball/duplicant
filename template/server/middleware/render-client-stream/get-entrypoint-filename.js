const { ENTRYPOINT_FILENAME, NODE_ENV } = process.env

export default () => NODE_ENV === 'production' ? ENTRYPOINT_FILENAME : 'main.js'
