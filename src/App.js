import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { IonButton } from '@ionic/react'

import classes from './App.module.css'

import Header from './components/Header.js'
import Rainbow from './components/Rainbow.js'
import MapChooser from './components/MapChooser.js'

import logo512 from './images/logo512.png'
import logo_wide2048 from './images/logo_wide2048.png'


const meta = {
  language: 'de',
  site_name: 'QueerFeindlichkeit',
  description: 'Hier entsteht ein Antidiskriminierungsprojekt des anyway Köln zum Thema Queerfeindlichkeit.', // No longer than 155 characters.
  canonical: 'https://queerfeindlichkeit.de/',
  coverphoto: logo_wide2048,
  logo: logo512, // The image must be 112x112px, at minimum.
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

function useData(region) {
  const [data, setData] = useState(null)

  useEffect(function () {
    console.log('setData')
    setTimeout(() => {
      setData({
        region,
        articles: [
          { id: Math.random(), title: 'Artikel 1', date_published: new Date() },
          { id: Math.random(), title: 'Artikel 2', date_published: new Date() },
          { id: Math.random(), title: 'Artikel 3', date_published: new Date() },
          { id: Math.random(), title: 'Artikel 4', date_published: new Date() },
          { id: Math.random(), title: 'Artikel 5', date_published: new Date() },
          { id: Math.random(), title: 'Artikel 6', date_published: new Date() },
        ],
      })
    }, 100)
  }, [region])

  return [data]
}

function StoryRow({ title, date_published }) {
  return <div className={classes.StoryRow}>
    <div className="subtitle1">{title}</div>
    <div className="body2">{date_published.toISOString()}</div>
  </div>
}

function App() {
  const [region, setRegion] = useState({ ISO_A3: 'DEU' })
  const [data] = useData(region)
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

      <Header />

      <p style={{textAlign: 'center', margin: '64px 0'}}>
        Hier entsteht ein Antidiskriminierungsprojekt des <a href="https://www.anyway-koeln.de/">anyway Köln</a> zum Thema Queerfeindlichkeit.
      </p>

      <main id="main">
        <div className={classes.cards_collection}>

          <div className={classes.card + ' ' + classes.full_width}>
            <MapChooser
              selectedRegion={region}
              setRegion={setRegion}
              style={{ width: '100%' }}
            />
          </div>

          {
            data !== null
              ? (<>
                <div className={classes.card + ' ' + classes.scrollable}>
                  {data.articles.map(article => <StoryRow key={article.id} title={article.title} date_published={article.date_published} />)}
                </div>

                <div className={classes.card + ' ' + classes.scrollable}>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              </>)
              : null
          }

          <div className={classes.card}>
            <p>Sample Chart</p>
          </div>

          <div className={classes.card + ' ' + classes.full_width}>
            <p style={{ textAlign: 'center' }}>
              <IonButton>View more Articles</IonButton>
              <IonButton>Download Data</IonButton>
            </p>
          </div>

        </div>


      </main>

      <Rainbow style={{ marginTop: '128px' }}/>
    </>
  )
}

export default App
