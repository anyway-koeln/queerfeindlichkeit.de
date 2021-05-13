import { IonButton } from '@ionic/react'
import { Link } from 'react-router-dom'

import classes from './ArticleRow.module.css'

import Heading from '../../components/Heading.js'
import ArticleCard from '../../components/ArticleCard.js'
import useData from '../../hooks/useData.js'

export default function AktivWerden() {
  const [data] = useData()

  return <>
    <Heading heading="Artikel" rightAction={
      <Link to="/blog"><IonButton>Alle Artikel</IonButton></Link>
    } />
    <div className={classes.articleRow}>
      {
        !!data
          ? data.articles.map(article => <ArticleCard key={article.id} article={article} />)
          : null
      }
    </div>
  </>
}
