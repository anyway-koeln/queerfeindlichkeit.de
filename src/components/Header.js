import { Link } from 'react-router-dom'

import classes from './Header.module.css'
import { ReactComponent as LogoOnDark } from '../images/logo-on-dark.svg'

function Header() {
  return  <header>
    <Link to="/">
      <LogoOnDark className={classes.logo} />
    </Link>
  </header>
}

export default Header
