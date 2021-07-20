import React from "react";
import Layout from './Layout.jsx';
import NavBar from "./Navbar";
import PostsList from './PostsList.jsx';

export default function Home() {
  return (<div>
	  		<Layout>
			  <NavBar />
   			<div className='lmj-layout-inner'>
   				<PostsList />
   			</div>
			  </Layout>
   		</div>)
  ;
}
