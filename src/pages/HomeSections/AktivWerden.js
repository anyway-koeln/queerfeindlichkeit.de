import { IonButton } from '@ionic/react'
import { Link } from 'react-router-dom'

import Heading from '../../components/Heading.js'

export default function AktivWerden() {
  return <>
    <Heading heading="Aktiv werden!" />
    <nav>
      <IonButton>Telefonummern für akute Hilfe</IonButton>
      <Link to="/vorfall-melden"><IonButton>Vorfall melden</IonButton></Link>
      <br />
      <a href="https://www.anyway-koeln.de/spenden-und-helfen/" target="_blank" rel="noreferrer"><IonButton>Spenden</IonButton></a>
      <IonButton>Komm zur Demo</IonButton>
      <a href="https://www.instagram.com/queerfeindlichkeit/" target="_blank" rel="noreferrer"><IonButton>Folg uns auf Instagram</IonButton></a>
    </nav>
  </>
}
