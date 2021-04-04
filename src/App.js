import { Helmet } from 'react-helmet-async'
import Header from './components/Header.js'
import Rainbow from './components/Rainbow.js'

function App() {
  return (
    <>
      <Helmet>
        <title>QueerFeindlichkeit</title>
        <link rel="canonical" href="https://queerfeindlichkeit.de/" />
        <meta property="og:url" content="https://queerfeindlichkeit.de/" />
        <meta name="description" content="Hier entsteht ein Antidiskriminierungsprojekt des anyway Köln zum Thema Queerfeindlichkeit." />
      </Helmet>

      <Header />

      <p style={{textAlign: 'center', height: '50vh', margin: '64px 0'}}>
        Hier entsteht ein Antidiskriminierungsprojekt des <a href="https://www.anyway-koeln.de/">anyway Köln</a> zum Thema Queerfeindlichkeit.
      </p>

      <Rainbow />

    </>
  )
}

export default App
