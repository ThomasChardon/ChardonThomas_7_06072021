import React, { useState } from 'react';
import Layout from './Layout.jsx';
import NavBar from "./Navbar";
import '../styles/Home.scss'
import PostsList from './PostsList.jsx';
import OnePost from './OnePost.jsx';


export default function Home() {
	const [unPost, afficherUnPost] = useState(false);
	const [postid, chooseId] = useState(0);
	return (<div>
		<Layout>
			<NavBar />
			<div className='GroupoMaxContainer'>
				{unPost ?
					<OnePost afficherUnPost={afficherUnPost} postid={postid} />
					: <PostsList afficheUnPost={afficherUnPost} chooseId={chooseId} />}
			</div>
		</Layout>
	</div>)
		;
}
