import classes from './Rainbow.module.css'

function Rainbow({ children, variant, ...props }) {

  variant = (
    variant === 'light'
    ? '-light'
    : (
        variant === 'dark'
        ? '-dark'
        : '' // normal = nothing
    )
  )

  return <div className={classes.rainbow} {...props}>
    <div className={classes.stripe} style={{ backgroundColor: `var(--rainbow${variant}-red)` }}></div>
    <div className={classes.stripe} style={{ backgroundColor: `var(--rainbow${variant}-orange)` }}></div>
    <div className={classes.stripe} style={{ backgroundColor: `var(--rainbow${variant}-yellow)` }}></div>
    <div className={classes.stripe} style={{ backgroundColor: `var(--rainbow${variant}-green)` }}></div>
    <div className={classes.stripe} style={{ backgroundColor: `var(--rainbow${variant}-blue)` }}></div>
    <div className={classes.stripe} style={{ backgroundColor: `var(--rainbow${variant}-purple)` }}></div>
  </div>
}

export default Rainbow
