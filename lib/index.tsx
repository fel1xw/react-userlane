import * as React from 'react'

type Props = {
  appId: string
  user?: any
}

declare global {
  interface Window { Userlane: any }
}

const loadScript = (url: string) => new Promise((resolve, reject) => {
  const s = document.createElement('script')
  s.src = url
  s.onload = resolve
  s.onerror = reject
  s.async = true
  document.body.appendChild(s)
})

export default class Userlane extends React.Component<Props, any> {
  static displayName = 'Userlane'

  componentDidMount() {
    if (!window.Userlane) {
      loadScript('https://cdn.userlane.com/userlane.js').then(this.initialize.bind(this, this.props))
    }
  }

  shouldComponentUpdate({ appId, user }: Props) {
    if (JSON.stringify(user) !== JSON.stringify(this.props.user)) {
      const { id, ...customProps } = user
      window.Userlane('identify', id, customProps)
    }

    if (appId !== this.props.appId) {
      window.Userlane('init', appId)
    }

    return false
  }

  initialize(props: Props) {
    const { appId, user: { id, ...customProps } } = props

    if (appId && id) {
      window.Userlane('identify', id, customProps)
      window.Userlane('init', appId)
    }
  }

  render() {
    return false
  }
}
