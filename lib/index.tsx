import * as React from 'react'

type Props = {
  appId: string
  user?: any
  lang?: string
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

  shouldComponentUpdate({ appId, user, lang }: Props) {
    if (lang !== this.props.lang) {
      window.Userlane('lang', lang)
    }

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
    const { appId, user: { id, ...customProps }, lang } = props

    if (appId && id) {
      if (lang) window.Userlane('lang', lang)
      window.Userlane('identify', id, customProps)
      window.Userlane('init', appId)
    }
  }

  render() {
    return false
  }
}
