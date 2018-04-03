import getServerComponent from './components/get-server-component'

export const HomePage = getServerComponent(
  'HomePage',
  require('./components/home-page')
)

export const NotFoundPage = getServerComponent(
  'NotFoundPage',
  require('./components/not-found-page')
)
