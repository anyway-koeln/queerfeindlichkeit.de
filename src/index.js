import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setupConfig } from '@ionic/react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

import 'intl-pluralrules'
import { AppLocalizationProvider, locales } from './l10n.js'

const client = new ApolloClient({
  uri: 'https://api.queerfeindlichkeit.de/graphql',
  cache: new InMemoryCache()
})

setupConfig({
    mode: 'ios',
})

function AppLanguageWrapper() {
  // const [userLocales, setUserLocales] = useState(['de'])
  const [userLocales, setUserLocales] = useState(navigator.languages)
  const [currentLocale, setCurrentLocale] = useState(null)

  useEffect(() => {
    if (!!window.umami) {
      let systemLocales = navigator.languages
      if (!!systemLocales || Array.isArray(systemLocales)) {
        for (const locale of systemLocales) {
          window.umami.trackEvent('L: ' + locale) // Log Locale / Languages
        }
      }
    }
  }, [])

  const handleLanguageChange = useCallback(event => {
    setUserLocales([event.target.dataset.locale])
  }, [setUserLocales])

  const handleCurrentLocalesChange = useCallback(currentLocales => {
    setCurrentLocale(currentLocales.length > 0 ? currentLocales[0] : '')
  }, [setCurrentLocale])

  return <AppLocalizationProvider
    key="AppLocalizationProvider"
    userLocales={userLocales}
    onLocaleChange={handleCurrentLocalesChange}
  >
    <App locales={locales} currentLocale={currentLocale} onLanguageChange={handleLanguageChange} />
  </AppLocalizationProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router basemname={`/${process.env.PUBLIC_URL}`}>
        <ApolloProvider client={client}>
          <AppLanguageWrapper />
        </ApolloProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
