import { useState, useEffect } from 'react'

export default function useData(region) {
  const [data, setData] = useState(null)

  useEffect(function () {
    const now = new Date()

    setData({
      region,
      articles: [
        { id:  1, title: 'Artikel 1', date_published: now, text: 'Lorem ipsum…' },
        { id:  2, title: 'Artikel 2', date_published: now, text: 'Lorem ipsum…' },
        { id:  3, title: 'Artikel 3', date_published: now, text: 'Lorem ipsum…' },
        { id:  4, title: 'Artikel 4', date_published: now, text: 'Lorem ipsum…' },
        { id:  5, title: 'Artikel 5', date_published: now, text: 'Lorem ipsum…' },
        { id:  6, title: 'Artikel 6', date_published: now, text: 'Lorem ipsum…' },
      ],
      stories: [
        { id:  7, title: 'Story 1', date_published: now, text: 'Lorem ipsum…' },
        { id:  8, title: 'Story 2', date_published: now, text: 'Lorem ipsum…' },
        { id:  9, title: 'Story 3', date_published: now, text: 'Lorem ipsum…' },
        { id: 10, title: 'Story 4', date_published: now, text: 'Lorem ipsum…' },
        { id: 11, title: 'Story 5', date_published: now, text: 'Lorem ipsum…' },
        { id: 12, title: 'Story 6', date_published: now, text: 'Lorem ipsum…' },
      ],
    })
  }, [region])

  return [data]
}
