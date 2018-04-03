export default () => ({
  env: Object.entries(global.process.env)
    .filter(([key]) => /^CLIENT_/.test(key))
    .reduce((accum, [key, value]) => ({ ...accum, [key]: value }), {})
})
