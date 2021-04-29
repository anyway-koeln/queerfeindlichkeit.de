import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setupConfig } from '@ionic/react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

const client = new ApolloClient({
  uri: 'https://api.queerfeindlichkeit.de/graphql',
  cache: new InMemoryCache()
})

setupConfig({
    mode: 'ios',
})

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router basemname={`/${process.env.PUBLIC_URL}`}>
        <ApolloProvider client={client}>
          <App />
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
