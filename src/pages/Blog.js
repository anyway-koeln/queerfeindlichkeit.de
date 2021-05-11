
import ArticleCard from '../components/ArticleCard.js'
import useData from '../hooks/useData.js'

function Blog() {
  const [data] = useData()

  return (
    <>
      <h1>Blog</h1>
      {
        !!data
        ? data.articles.map(article => <ArticleCard key={article.id} article={article} />)
        : null
      }
    </>
  )
}

export default Blog
