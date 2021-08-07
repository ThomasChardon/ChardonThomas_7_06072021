import '../styles/Header.scss'
import logo from '../assets/icon-left-font.png'

function Header() {
    return (
        <header>
            <div className="groupo_header">
                <img src={logo} alt='Groupomania logo' className='groupo-logo' />
            </div>
        </header>
    )
}

export default Header