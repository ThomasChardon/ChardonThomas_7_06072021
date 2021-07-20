import '../styles/Header.scss'
import Banner from './Banner.jsx';
import logo from '../assets/plants/logo.png'

function Header() {
	return (
        <header>
            <Banner>
   				<img src={logo} alt='Groupomania logo' className='lmj-logo' />
   				<h1 className='lmj-title'>Groupomania</h1>
   			</Banner>
        </header>
	)
}

export default Header