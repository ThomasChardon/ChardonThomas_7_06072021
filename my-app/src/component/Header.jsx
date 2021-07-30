import '../styles/Header.scss'
import Banner from './Banner.jsx';
import logo from '../assets/icon-left-font.png'

function Header() {
	return (
        <header>
            <div className="groupo_header">
   				<img src={logo} alt='Groupomania logo' className='groupo-logo' />
            </div>
            <Banner/>
        </header>
	)
}

export default Header