import serialize from 'serialize-javascript'

import getClientConfig from './get-client-config'
import getEntrypontFilename from './get-entrypoint-filename'

const { ASSETS_BASE_URL } = process.env

export default (splitPoints = []) => `
    </div>

    <script>window.process = ${serialize(getClientConfig())}</script>
    <script>window.__SPLIT_POINTS__ = ${serialize(splitPoints)}</script>
    <script src="${ASSETS_BASE_URL}/${getEntrypontFilename()}"></script>
  </body>
</html>
`.trim()
