import React, { useState } from 'react';
import Layout from './Layout.jsx';
import NavBar from "./Navbar";
import PostsList from './PostsList.jsx';
import OnePost from './OnePost.jsx';

export default function Home() { //ajouter state : si cliqué afficher 1 élément si non postlist
	const [unPost, afficherUnPost] = useState(false);
  return (<div>
	  		<Layout>
			  <NavBar />
   			<div className='lmj-layout-inner'>
			   {unPost ? <OnePost /> : <PostsList />}
   				
   			</div>
			  </Layout>
   		</div>)
  ;
}
