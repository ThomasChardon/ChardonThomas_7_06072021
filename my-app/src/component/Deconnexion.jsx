import React from "react";
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import '../styles/Navbar.scss'
import '../styles/Deconnexion.scss'


const Deconnexion = () => {
    return (
        <Layout>
            <NavBar />
            <div className='Deco'>
                Voulez-vous vous vraiment vous déconnecter ?
            </div>
            <div className="Buttons_ensemble">
                <button className='Button_deco button_non'
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/Posts';
                    }}>
                    Non !
                </button>
                <button className='Button_deco button_oui'
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.sessionStorage.clear();
                        window.location.href = '/Login';
                    }}>
                    Oui...
                </button>
            </div>
        </Layout>
    );
};

export default Deconnexion;


