import { Link } from 'react-router-dom'
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'

function Article({ article }) {
  return (
    <Link to={`/blog/${article.id}`}>
      <IonCard style={{
        display: 'inline-block'
      }}>
        <IonCardHeader>
          <IonCardSubtitle>{article.date_published.toISOString()}</IonCardSubtitle>
          <IonCardTitle>{article.title}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </Link>
  )
}

export default Article
