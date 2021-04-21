import { useState, useEffect } from 'react'

import useData from './useData.js'

export default function useArticle(id) {
  const [data] = useData()
  const [story, setStory] = useState(null)

  useEffect(function () {
    if (!(!!data)) {
      setStory(null)
      return
    }

    for (const this_story of data.stories) {
      if (this_story.id + '' === id + '') {
        setStory(this_story)
        break
      }
    }
  }, [data, id])

  return [story]
}
