import classes from './Rainbow.module.css'

function Rainbow({ children, ...props }) {
  return <div className={classes.rainbow} {...props}>
    <div className={classes.stripe} style={{ backgroundColor: 'var(--rainbow-red)' }}></div>
    <div className={classes.stripe} style={{ backgroundColor: 'var(--rainbow-orange)' }}></div>
    <div className={classes.stripe} style={{ backgroundColor: 'var(--rainbow-yellow)' }}></div>
    <div className={classes.stripe} style={{ backgroundColor: 'var(--rainbow-green)' }}></div>
    <div className={classes.stripe} style={{ backgroundColor: 'var(--rainbow-blue)' }}></div>
    <div className={classes.stripe} style={{ backgroundColor: 'var(--rainbow-purple)' }}></div>
  </div>
}

export default Rainbow
