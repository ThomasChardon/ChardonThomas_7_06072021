// import { useState, useEffect } from 'react';
// import { postsList } from '../datas/posts'
// import PostItem from './PostItem.jsx'
import {sqlToJsDate} from './Functions.jsx';
import '../styles/PostList.scss'
import React, { Component } from 'react';
 
const API = 'http://localhost:3000/?query=';
const DEFAULT_QUERY = 'redux';


 
class PostsList extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      posts: [],
    };
  }

  
 
  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => 
		this.setState({ posts: data }))
	  
  }

 
  render() {
    const { posts } = this.state; 
    return (
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <h1>{post.titre}</h1>
			<img className='image_post' src={require(`../assets/posts/${post.chemin_image}`).default} alt={`${post.titre} cover`} />
			<br />
			Créé par {post.user_creation}, le {sqlToJsDate(post.date_creation)}.
          </li>
        )}
      </ul>
    );
  }
}

export default PostsList;
