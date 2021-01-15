// global styles shared across the entire site
import 'styles/global.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
// import 'katex/dist/katex.min.css'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { bootstrap } from 'lib/bootstrap-client'
import { fathomId, fathomConfig } from 'lib/config'
import * as Fathom from 'fathom-client'

if (typeof window !== 'undefined') {
  bootstrap()
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)

      function onRouteChangeComplete() {
        Fathom.trackPageview()
      }

      router.events.on('routeChangeComplete', onRouteChangeComplete)

      return () => {
        router.events.off('routeChangeComplete', onRouteChangeComplete)
      }
    }
  }, [])

  return <Component {...pageProps} />
}
