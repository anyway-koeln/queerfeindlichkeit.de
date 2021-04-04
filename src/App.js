import Header from './components/Header.js'
import Rainbow from './components/Rainbow.js'

function App() {
  return (
    <>
      <Header />

      <p style={{textAlign: 'center'}}>
        Hier entsteht ein Antidiskriminierungsprojekt des <a href="https://www.anyway-koeln.de/">anyway Köln</a> zum Thema Queerfeindlichkeit.
      </p>

      <Rainbow />

    </>
  )
}

export default App
