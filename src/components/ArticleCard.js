function Article({ article }) {
  return (
    <div style={{
      display: 'inline-block',
      width: '256px',
      background: '#eee',
      margin: '8px',
    }}>
      <h3>{article.title}</h3>
      <p>{article.date_published.toISOString()}</p>
    </div>
  )
}

export default Article
