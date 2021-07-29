import React from "react";
import { dateDuJour } from './Functions.jsx';
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import '../styles/CreatePost.scss';
// import axios  from 'axios';


class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          file: {},
          filepicture: "",
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
        this.setState({titre: event.target.value});
      }
    
    handleFileChange = event =>  {
        this.setState({
          ...this.state,
          filepicture: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0],
          // loaded: 0,
          filename: event.target.files[0].name
        })
        // console.log(this.state.file);
      }
      // componentDidUpdate() {
      componentDidMount() {
        console.log(this.state.file);
        // this.handleSubmit();
      }
      
      // handleSubmit() {
        handleSubmit(event) {
        // console.log(this.state.file);
        event.preventDefault();
      // console.log(this.state.file);
        console.log('Le titre du post : ' + this.state.titre + ', Limage liée : ' + this.state.file + ', la date du jour : ' + this.state.datedujour);
       
      //   const formdata = new FormData()
      //   formdata.append('file', this.state.file) //jsontringify
      //   formdata.append('titre', this.state.titre)
      //   formdata.append('filename', this.state.filename)
      //   formdata.append('datedujour', dateDuJour())
      //   formdata.append('userCreation', "tom@gmail.com")
      //   formdata.append('userId', this.state.userId)

      //   for(var pair of formdata.entries()) {
      //     console.log('entree du formdata : ' + pair[0]+ ', '+ pair[1]);
      //  }




      //   axios.post("http://localhost:3000/createPost", data, { // receive two parameter endpoint url ,form data 
      // })
      // .then(datas => datas.json())
      //   .then(reponse => console.log(reponse.insertId))
        fetch('http://localhost:3000/createPost', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // headers: {'Content-Type': 'multipart/form-data'},
        body: JSON.stringify(this.state)
        })
        .then(data => data.json())
        .then(reponse => console.log(reponse)) // j'obtiens ici l'id du post en question
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
                          name="file"
                          onChange={this.handleFileChange}/>
                          <img className="create_post_image" src={this.state.filepicture} alt="Votre post"/>
                          <br/>
                          <button type='submit'>Poster !</button>
                        </form>
                    </div>
                  </Layout>
                </div>);
            }
}

export default CreatePost;