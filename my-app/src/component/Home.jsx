import React from "react";
import Banner from './Banner';
import logo from '../assets/plants/logo.png'
import Footer from './Footer.jsx'
import PostsList from './PostsList.jsx';

export default function Home() {
  return (<div>
   			<Banner>
   				<img src={logo} alt='La maison jungle' className='lmj-logo' />
   				<h1 className='lmj-title'>Groupomania</h1>
   			</Banner>
   			<div className='lmj-layout-inner'>
   				<PostsList />
   			</div>
   			<Footer />
   		</div>)
  ;
}
