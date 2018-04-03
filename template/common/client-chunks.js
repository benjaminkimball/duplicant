import getClientComponent from './components/get-client-component'

export const HomePage = getClientComponent(() =>
  import(/* webpackChunkName: "HomePage" */ './components/home-page')
)

export const NotFoundPage = getClientComponent(() =>
  import(/* webpackChunkName: "NotFoundPage" */ './components/not-found-page')
)
