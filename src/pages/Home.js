import { useState } from 'react'
import { IonButton } from '@ionic/react'
import { Link } from 'react-router-dom'

import classes from './Home.module.css'

import MapChooser from '../components/MapChooser.js'

import useData from '../hooks/useData.js'

function StoryRow({ id, title, date_published }) {
  return <Link to={`/story/${id}`}>
    <div className={classes.StoryRow}>
      <div className="subtitle1">{title}</div>
      <div className="body2">{date_published.toISOString()}</div>
    </div>
  </Link>
}

function Home() {
  const [region, setRegion] = useState({ ISO_A3: 'DEU' })
  const [data] = useData(region)

  return (
    <>
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
                  {data.stories.map(story => <StoryRow key={story.id} id={story.id} title={story.title} date_published={story.date_published} />)}
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
    </>
  )
}

export default Home
