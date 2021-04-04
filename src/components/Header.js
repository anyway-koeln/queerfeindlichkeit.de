import classes from './Header.module.css'
import { ReactComponent as LogoOnDark } from '../images/logo-on-dark.svg'

function Header() {
    return (
        <header>
            <LogoOnDark width="auto" height="auto" className={classes.logo} />
        </header>
    )
}

export default Header
