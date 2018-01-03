const { ASSETS_HOST: host, ASSETS_PORT: port } = process.env
const assetsBaseUrl = `http://${host}:${port}/assets`
const html = () => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Duplicant</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="${assetsBaseUrl}/vendor.js"></script>
    <script src="${assetsBaseUrl}/client.js"></script>
  </body>
</html>
`

export default (req, res) => res.send(html())
