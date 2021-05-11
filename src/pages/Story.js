import { useParams } from 'react-router-dom'

import useStory from '../hooks/useStory.js'

function Story() {
  const { id } = useParams()
  const [story] = useStory(id)

  if (!(!!story)) {
    return null
  }

  return (
    <>
      <h1>{story.title}</h1>
      <p>{story.date_published.toISOString()}</p>
      <p>{story.text}</p>
    </>
  )
}

export default Story
