import { useState, useEffect } from 'react'

import useData from './useData.js'

export default function useArticle(id) {
  const [data] = useData()
  const [article, setArticle] = useState(null)

  useEffect(function () {
    if (!(!!data)) {
      setArticle(null)
      return
    }

    for (const this_article of data.articles) {
      if (this_article.id + '' === id+'') {
        setArticle(this_article)
        break
      }
    }
  }, [data, id])

  return [article]
}
