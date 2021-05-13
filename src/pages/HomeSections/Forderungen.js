import { IonButton } from '@ionic/react'

import Heading from '../../components/Heading.js'

export default function AktivWerden() {
  return <>
    <Heading heading="Unsere Forderungen" rightAction={
      <IonButton>Teilen</IonButton>
    } />
    <ul className="body1">
      <li>Forderung Eins</li>
      <li>Forderung Zwei</li>
      <li>Forderung Drei</li>
    </ul>
  </>
}
