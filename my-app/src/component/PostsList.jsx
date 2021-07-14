
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
      isLoading: false,
      error: null,
    };
  }

  
 
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
      .then(data => 
		  this.setState({ posts: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
	  
  }

 
  render() {
    const { posts, isLoading, error } = this.state; 

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <h1>{post.titre}</h1>
			<img className='image_post' src={require(`../assets/posts/${post.chemin_image}`).default} alt={`${post.titre} cover`} />
			<br />
			Créé par {post.user_creation}, le {sqlToJsDate(post.date_creation)} !
          </li>
        )}
      </ul>
    );
  }
}

export default PostsList;
