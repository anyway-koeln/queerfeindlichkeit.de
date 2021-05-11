import { useParams } from 'react-router-dom'

import useArticle from '../hooks/useArticle.js'

function Article() {
  const { id } = useParams()
  const [article] = useArticle(id)

  if (!(!!article)) {
    return null
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>{article.date_published.toISOString()}</p>
      <p>{article.text}</p>
    </>
  )
}

export default Article
