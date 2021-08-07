import '../styles/Layout.scss';
import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'


export default function Layout(props) {
    return (
        <div className="Layout">
            <Header />
            <main className='Content_container'>
                {props.children}
            </main>
            <Footer />
        </div>
    );
}