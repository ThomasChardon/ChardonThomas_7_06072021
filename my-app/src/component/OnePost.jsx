// import {sqlToJsDate} from './Functions.jsx';
// import '../styles/PostList.scss'
// import React, { Component } from 'react';
 
// const API = 'http://localhost:3000/Posts?query=';
// const DEFAULT_QUERY = 'redux';


 function fetchOne(postid) {
    return fetch('http://localhost:3000/Posts/' + postid, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong ...');
        }
    })
}

function OnePost({id, afficherUnPost}) {
   
    const monPost = fetchOne(13);
      console.log("monPost");
      console.log(monPost);
      console.log(monPost[0]);
    return (
        <div className="UnPost">
            <div>truc</div>
            {/* <div key={data.id}>
                <button onClick={() => afficherUnPost(false)}>Fermer Post</button>
                <h1 className='post_titre'>{data.titre}</h1>
                <img className='post_image' src={`http://localhost:3000/images/${data.chemin_image}`} alt={`${data.titre} cover`} />
                <br />
                <div className="post_legende">
                    Créé par {data.user_creation}, le {sqlToJsDate(data.date_creation)} !
                </div>
            </div> */}
        </div>
    )
}


// class OnePost extends Component {
//   constructor(props) {
//     super(props);
 
//     this.state = {
//       posts: [],
//       isLoading: false,
//       error: null,
//     };
//   }

  
 
//   componentDidMount() {
//     this.setState({ isLoading: true });

//     fetch(API + DEFAULT_QUERY)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Something went wrong ...');
//       }
//     })
//       .then(data => 
// 		  this.setState({ posts: data, isLoading: false }))
//       .catch(error => this.setState({ error, isLoading: false }));
	  
//   }

 
//   render() {
//     const { posts, isLoading, error } = this.state; 

//     if (error) {
//       return <p>{error.message}</p>;
//     }

//     if (isLoading) {
//       return <p>Loading ...</p>;
//     }

//     return (
//       <ul className="liste_des_posts">
//         {posts.map(post =>
//           <li key={post.id}>
//             <h1 className='post_titre'>{post.titre}</h1>
// 			<img className='post_image' src={`http://localhost:3000/images/${post.chemin_image}`} alt={`${post.titre} cover`} />
// 			<br />
//       <div className="post_legende">
// 			  Créé par {post.user_creation}, le {sqlToJsDate(post.date_creation)} !
//       </div>
//           </li>
//         )}
//       </ul>
//     );
//   }
// }

export default OnePost;
