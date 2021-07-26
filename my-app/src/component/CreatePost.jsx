import React from "react";
import { dateDuJour } from './Functions.jsx';
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import '../styles/CreatePost.scss';
// import PostsList from './PostsList.jsx';



// function handleSubmit(e) {
//     e.preventDefault()
//     // alert(e.target['my_input'].value)
//     console.log(e);
// }


class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          file: "",
          filename: "",
          titre: "",
          datedujour: dateDuJour(),
          userCreation: "tom@gmail.com",
          userId: 6,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleFileChange(event) {
        //marche, set le file a un blob contenant l'image
        this.setState({
          file: URL.createObjectURL(event.target.files[0]),
          filename: event.target.files[0].name
        })
      }

      handleSubmit(event) {
        console.log('Le titre du post : ' + this.state.value + ', Limage liée : ' + this.state.file + ', la date du jour : ' + this.state.datedujour);
        // console.log(this.state);
        event.preventDefault();
        fetch('http://localhost:3000/createPost', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state), dateDuJour
        })
        .then(data => data.json())
        .then(reponse => console.log(reponse.insertId)) // j'obtiens ici l'id du post en question
        // then aller a la page de l'id du post
      }

    render() {
        return (<div>
                  <Layout>
                  <NavBar />
                    <div className='create_post'>
                        <form onSubmit={this.handleSubmit}>
                          <p>Indiquez le titre de votre Post (50 caractères max) :</p>
                          <input className="create_post_titre" type='text' name='title' defaultValue={this.state.titre} onChange={this.handleChange}/>
                          {/* <br/> */}
                          <p>Choisissez votre image/gif :</p>
                          <input className="button_create_post_image"
                          type="file"
                          name="chemin_image"
                          onChange={this.handleFileChange}/>
                          <img className="create_post_image" src={this.state.file} alt="Votre post"/>
                          <br/>
                          <button type='submit'>Poster !</button>
                        </form>
                    </div>
                  </Layout>
                </div>);
            }
}

export default CreatePost;