import {sqlToJsDate} from './Functions.jsx';
import '../styles/OnePost.scss'
import React, { Component } from 'react';
 
// const API = 'http://localhost:3000/Posts?query=';
// const DEFAULT_QUERY = 'redux';

const API = 'http://localhost:3000/Posts/' ;
    const DEFAULT_QUERY = 'redux';

class OnePost extends Component {
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

    fetch(API + this.props.postid + DEFAULT_QUERY)
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
        <div className="UnPost">
            {posts.map(post =>
            <div key={post.id}>
                <button onClick={() => this.props.afficherUnPost(false)}>Fermer Post</button>
                <h1 className='post_titre'>{post.titre}</h1>
                <img className='post_image' src={`http://localhost:3000/images/${post.chemin_image}`} alt={`${post.titre} cover`} />
                <br />
                <div className="post_legende">
                Créé par {post.user_creation}, le {sqlToJsDate(post.date_creation)} !
                </div>
            </div>
            )}
        </div>
    );
  }
}

export default OnePost;
