import React, { Component } from 'react'

export default (getComponent) => class AsyncComponent extends Component {
  static Component = null

  static loadComponent () {
    return getComponent().then((mod) => mod.default).then((Component) => {
      AsyncComponent.Component = Component

      return Component
    })
  }

  mounted = false

  state = { Component: AsyncComponent.Component }

  componentWillMount () {
    if (this.state.Component === null) {
      AsyncComponent.loadComponent().then((Component) => {
        if (this.mounted) this.setState(() => ({ Component }))
      })
    }
  }

  componentDidMount () { this.mounted = true }

  componentWillUnmount () { this.mounted = false }

  render () {
    const { Component } = this.state

    return Component ? <Component {...this.props} /> : null
  }
}
