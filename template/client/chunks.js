import asyncComponent from './components/async-component'

export const NotFoundPage = asyncComponent(() => (
  import(/* webpackChunkName: "NotFoundPage" */ './components/not-found-page')
))
