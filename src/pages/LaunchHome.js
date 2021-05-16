import { IonButton } from '@ionic/react'
import { Link } from 'react-router-dom'

function LaunchHome() {
  return <>
    <Link to="/vorfall-melden"><h2>Vorfall melden!</h2></Link>
    <p>Erzähl uns und allen Besucher:innen dieser Seite, was dir als LSBTIQ*-Person passiert ist. Dein Vorfall wird auf unserer Karte eingestellt und trägt damit dazu bei, Bewusstsein zu schaffen und anderen Mut zu machen, queerfeindliche Gewalt als Betroffene darüber zu sprechen, sie anzuzeigen und sich Hilfe zu holen, falls notwendig. Viele LSBTIQ*-Personen erleben mehrere Vorfälle in ihrer Biografie. Du kannst auch verschiedene Vorfälle einzeln melden. Alle Vorfälle gehen auch in unsere Statistik ein, welche wir auf unsere Seite veröffentlichen und auch Politik und Verwaltung herantragen.</p>
    <Link to="/vorfall-melden"><IonButton>Jetzt Vorfall anonym melden</IonButton></Link>

    <h2>Zeige Gesicht</h2>
    <p>Für unsere Instagram-Seite suchen wir immer Menschen, egal ob LSBTIQ* oder hetero/cis, die sich fotografieren lassen wollen und ihre Stimme gegen queerfeindliche Gewalt erheben oder über eigene Erfahrungen öffentlich berichten möchten. Wenn du Interesse hast, dann schreib uns eine Nachricht auf Instagram (<a href="https://instagram.com/queerfeindlichkeit" target="_blank" rel="noreferrer">@queerfeindlichkeit</a>).</p>
    <a href="https://instagram.com/queerfeindlichkeit" target="_blank" rel="noreferrer">
      <IonButton>Instagram</IonButton>
    </a>

    <h2>Spende für uns</h2>
    <p>Unsere Arbeit ist ehrenamtlich und wird zu Großteilen gefördert. 15% unserer Kosten müssen wir aber selbst als Eigenteil aufbringen. Du kannst unsere Arbeit unterstützen in dem du für das Jugendzentrum anyway spendest. Es ist Träger dieses Projektes.</p>
    <a href="https://www.anyway-koeln.de/spenden-und-helfen/" target="_blank" rel="noreferrer">
      <IonButton>Spenden</IonButton>
    </a>
  </>
}

export default LaunchHome
