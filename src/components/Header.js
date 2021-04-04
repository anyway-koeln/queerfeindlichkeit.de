import classes from './Header.module.css'
import { ReactComponent as LogoOnDark } from '../images/logo-on-dark.svg'

function Header() {
    return (
        <header>
            <LogoOnDark className={classes.logo} />
        </header>
    )
}

export default Header
