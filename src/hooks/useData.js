import { useState, useEffect } from 'react'

export default function useData(region) {
  const [data, setData] = useState(null)

  useEffect(function () {
    setTimeout(() => {
      const now = new Date()

      setData({
        region,
        articles: [
          { id: Math.random(), title: 'Artikel 1', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Artikel 2', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Artikel 3', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Artikel 4', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Artikel 5', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Artikel 6', date_published: now, text: 'Lorem ipsum…' },
        ],
        stories: [
          { id: Math.random(), title: 'Story 1', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Story 2', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Story 3', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Story 4', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Story 5', date_published: now, text: 'Lorem ipsum…' },
          { id: Math.random(), title: 'Story 6', date_published: now, text: 'Lorem ipsum…' },
        ],
      })
    }, 100)
  }, [region])

  return [data]
}
