import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'

import { Localized } from '../components/fluent/Localized.js'

import './App.module.css'

import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'

// import logo512 from './images/logo512.png'
// import logo_wide2048 from './images/logo_wide2048.png'

import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import Rainbow from '../components/Rainbow.js'

const LaunchHome = React.lazy(() => import('./LaunchHome.js'))
const Survey = React.lazy(() => import('./Survey.js'))
// const Home = React.lazy(() => import('./Home.js'))
const Blog = React.lazy(() => import('./Blog.js'))
const Article = React.lazy(() => import('./Article.js'))
const Story = React.lazy(() => import('./Story.js'))

const meta = {
  language: 'de',
  site_name: 'QueerFeindlichkeit',
  description: 'Hier entsteht ein Antidiskriminierungsprojekt des anyway Köln zum Thema Queerfeindlichkeit.', // No longer than 155 characters.
  canonical: 'https://queerfeindlichkeit.de/',
  coverphoto: null, // logo_wide2048,
  logo: null, // logo512, // The image must be 112x112px, at minimum.
}

/*

Metadata Validators:
https://developers.facebook.com/tools/debug
https://search.google.com/structured-data/testing-tool/
https://search.google.com/test/rich-results
https://developers.pinterest.com/tools/url-debugger/
https://cards-dev.twitter.com/validator

Metadata Infos:
https://developers.google.com/search/docs/guides/search-gallery
*/

function SuspenseWrapper({ children }) {
  return <Suspense fallback={<div><Localized id="loading_content" /></div>}>
    {children}
  </Suspense>
}

// function App({ locales, currentLocale, onLanguageChange }) {
function App() {
  let vorfallMeldenIsOpen = useRouteMatch("/vorfall-melden")
  vorfallMeldenIsOpen = vorfallMeldenIsOpen !== null

  const title = meta.site_name // Maximum length 60-70 characters.

  return (
    <>

      <Helmet
        htmlAttributes={{ lang: meta.language }}
      >
        {/* General: */}
        <title>{title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />

        {/* Schema.org markup for Google */}
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={meta.description} />
        <meta itemprop="image" content={meta.coverphoto} />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "${meta.canonical}",
            "logo": "${meta.logo}"
          }`}
        </script>

        {/* Twitter:
        https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
        */}
        <link rel="me" href="https://twitter.com/anyway_koeln" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:site" content="@anyway_koeln" />
        <meta property="twitter:creator" content="@anyway_koeln" /> {/* twitter:creator could be the users twitter handle, who created an article. */}
        <meta property="twitter:image" content={meta.coverphoto} />

        {/* Facebook: */}
        <meta property="og:title" content={title} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:site_name" content={meta.site_name} />
        <meta property="og:type" content="website" /> {/* website, article, ... */}
        <meta property="og:locale" content={meta.language} />
        {/* <meta property="article:author" content="" /> */}
        {/* <meta property="article:published_time" content="2013-09-17T05:59:00+01:00" /> */}
        {/* <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00" /> */}
        {/* <meta property="article:section" content="Article Section" /> */}
        {/* <meta property="article:tag" content="Article Tag" /> */}
        <meta property="og:image" content={meta.coverphoto} />

        {/* Pinterest: */}
        <meta name="pinterest-rich-pin" content="true" />
      </Helmet>

      {
        vorfallMeldenIsOpen
          ? <SuspenseWrapper children={<Survey />} />
          : <>
            <Header />

            <main id="main">
              <Switch>
                <Route path="/survey" children={<Redirect to="/vorfall-melden" />} />
                <Route path="/story/:id" children={<SuspenseWrapper children={<Story />} />} />
                <Route path="/story" children={<Redirect to="/" />} />
                <Route path="/blog/:id" children={<SuspenseWrapper children={<Article />} />} />
                <Route path="/blog" children={<SuspenseWrapper children={<Blog />} />} />
                <Route path="/" exact={true} children={<SuspenseWrapper children={<LaunchHome />} />} />
                <Route path="*" children={<Redirect to="/" />} />
              </Switch>
            </main>

            <Rainbow style={{ marginTop: '128px' }} />

            <Footer />
          </>
      }
    </>
  )
}

// export default withLocalization(App)
export default App
