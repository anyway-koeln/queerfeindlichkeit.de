import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'

function Article({ article }) {
  return (
      <IonCard style={{
        display: 'inline-block'
      }}>
        <IonCardHeader>
          <IonCardSubtitle>{article.date_published.toISOString()}</IonCardSubtitle>
          <IonCardTitle>{article.title}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
  )
}

export default Article
