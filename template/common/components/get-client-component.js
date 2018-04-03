import React, { Component } from 'react'

export default (getComponent) => class ClientComponent extends Component {
  static Component = null

  static loadComponent () {
    return getComponent()
      .then((mod) => mod.default)
      .then((Component) => {
        ClientComponent.Component = Component

        return Component
      })
  }

  state = { Component: ClientComponent.Component }

  render () {
    const { Component } = this.state

    return Component ? <Component {...this.props} /> : null
  }

  componentDidMount () {
    Promise
      .resolve(ClientComponent.Component || ClientComponent.loadComponent())
      .then((Component) => this.setState(() => ({ Component })))
  }
}
