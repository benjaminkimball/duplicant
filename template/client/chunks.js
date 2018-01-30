import asyncComponent from './components/async-component'

export const NotFoundPage = asyncComponent(() => (
  import(/* webpackChunkName: "not-found-page" */ './components/not-found-page')
))
