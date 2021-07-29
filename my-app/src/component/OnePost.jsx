import {sqlToJsDate} from './Functions.jsx';
import '../styles/OnePost.scss'
import React, { Component } from 'react';
import { Animate }  from 'react-simple-animate';
 
// const API = 'http://localhost:3000/Posts?query=';
// const DEFAULT_QUERY = 'redux';

const API = 'http://localhost:3000/Posts/' ;
// const APIcom = 'http://localhost:3000/PostsCom/' ;
    const DEFAULT_QUERY = 'redux';

class OnePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: false,
      error: null,
      commentaires: [],
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
		  this.setState({ posts: data.post, commentaires: data.comment, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  // fermerPost() {
  //   () => {this.props.afficherUnPost(false);} 

  // }

 
  render() {
    const { posts, commentaires, isLoading, error } = this.state; 
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
        <Animate
			play={true}
			duration={1}
			start={{ opacity: 0.5, filter: 'blur(10px)' }}
  			end={{ opacity: 1, filter: 'blur(0)' }}
		>
        <div className="UnPost">
            {posts.map(post =>
            <div key={post.id}>
                <div className="legende_fermer_post">Fermer le post&nbsp;<button className="button_fermer_post" onClick={() => this.props.afficherUnPost(false)}>X</button>
                </div>
                <br/>
                <h1 className='post_titre'>{post.titre}</h1>
                <img className='post_image' src={`http://localhost:3000/images/${post.chemin_image}`} alt={`${post.titre} cover`} onClick={() => this.props.afficherUnPost(false)}/>
                <br />
                <div className="post_legende">
                Créé par {post.user_creation}, le {sqlToJsDate(post.date_creation)} !
                </div>
            </div>
            )
            }
            <div className="post_commentaires">
              <ul>
              {commentaires.map(comment =>
                <li key={`${comment.id}-${comment.date_creation}`}>
                  Le {sqlToJsDate(comment.date_creation)}, {comment.user_name} a écrit : <br/>
                  {comment.comment}
                </li>
              )}
              </ul>
              <div>Ajouter un commentaire :</div>
            </div>
        </div>
		</Animate>
    );
  }
}

export default OnePost;


