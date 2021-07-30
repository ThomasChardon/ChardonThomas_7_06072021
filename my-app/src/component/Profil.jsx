import React from "react";
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import { getUserId } from './Functions.jsx';
import '../styles/Profil.scss'

const Profil = () => {

    console.log(getUserId());


    return (
        <Layout>
            <NavBar />
            <div className='Profil'>
                affichage du profil
            </div>
        </Layout>
    );
};

export default Profil;
