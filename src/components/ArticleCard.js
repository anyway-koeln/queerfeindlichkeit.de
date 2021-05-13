import { Link } from 'react-router-dom'

import classes from './ArticleCard.module.css'

function Article({ article }) {
  return <Link to={`/blog/${article.id}`}>
    <div className={classes.card}>
      <p>{article.date_published.toISOString()}</p>
      <h3>{article.title}</h3>
    </div>
  </Link>
}

export default Article
