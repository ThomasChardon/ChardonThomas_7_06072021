import {sqlToJsDate, getUserId, dateDuJour } from './Functions.jsx';
import '../styles/OnePost.scss'
import React, { Component } from 'react';
import axios from 'axios';
 
// const API = 'http://localhost:3000/Posts?query=';
// const DEFAULT_QUERY = 'redux';

const API = 'http://localhost:3000/Posts/' ;
// const APIcom = 'http://localhost:3000/PostsCom/' ;
    const DEFAULT_QUERY = 'redux';

class OnePost extends Component {
  constructor(props) {
    super(props);
    this.AjouterCommentaire = this.AjouterCommentaire.bind(this);
    this.PosternouveauCom = this.PosternouveauCom.bind(this);

    this.state = {
      userId: getUserId(),
      datedujour: dateDuJour(),
      posts: [],
      isLoading: false,
      error: null,
      commentaires: [],
      nouveaucom: "",
      userName: ""
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + this.props.postid + DEFAULT_QUERY, { headers: { Authorization: window.sessionStorage.getItem('dataUser') }})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
      .then(data => 
		  {this.setState({ posts: data.post, commentaires: data.comment, isLoading: false, userName: data.user_name })})
      .catch(error => this.setState({ error, isLoading: false }));
  }

  AjouterCommentaire(event) {
    this.setState({nouveaucom: event.target.value});
  }

  PosternouveauCom(event) {
    event.preventDefault();

    axios.post("http://localhost:3000/Posts/createCom/" + this.props.postid,
    {comm : this.state.nouveaucom, userid : this.state.userId, datedujour : this.state.datedujour}, {
      headers: {
        // 'content-type': 'text/json',
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('dataUser'),
      }
    })
      .then((reponse) => {
        if( reponse.statusText === "OK") {
          const tempName = reponse.data.split("OK---");
          
          const newcom = {
            id: tempName[0],
            id_post: this.props.postid,
            user_name: tempName[1] ,
            comment: this.state.nouveaucom,
            date_creation: this.state.datedujour,
        };
          this.setState({
            commentaires: [...this.state.commentaires, newcom],

          })
          this.setState({
            nouveaucom: ""
          })
        }
      })
    //envoyer com en BDD
    //refresh la page après
  }
 
  render() {
    const { posts, commentaires, isLoading, error } = this.state; 

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
              <form onSubmit={this.PosternouveauCom}>
                <input className="create_comm" type='text' name='nouveaucom' defaultValue={this.nouveaucom} onChange={this.AjouterCommentaire}/>
                {/* <br/> */}
                <br/>
                <button type='submit'>Ajouter le commentaire</button>
                </form>
            </div>
        </div>
    );
  }
}

export default OnePost;


