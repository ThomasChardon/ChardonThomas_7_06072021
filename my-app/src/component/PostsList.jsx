
import { sqlToJsDate } from './Functions.jsx';
import '../styles/PostList.scss'
import React, { Component } from 'react';

const API = 'http://localhost:3000/Posts?query=';
const DEFAULT_QUERY = 'redux';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.ChoisirId = this.ChoisirId.bind(this);
    this.state = {
      posts: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY, { headers: { Authorization: window.sessionStorage.getItem('dataUser') } })
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
  ChoisirId(id) {
    this.props.afficheUnPost(true);
    this.props.chooseId(id);
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
      <ul className="liste_des_posts">
        {posts.map(post =>
          <li key={post.id}>
            <h1 className='post_titre'>{post.titre}</h1>
            <img className='post_image' src={`http://localhost:3000/images/${post.chemin_image}`} alt={`${post.titre} cover`} onClick={() => this.ChoisirId(post.id)} />
            <br />
            <div className="post_legende">
              Créé par {post.user_creation}, le {sqlToJsDate(post.date_creation)} !
            </div>
          </li>
        )}
      </ul>
    );
  }
}

export default PostsList;
