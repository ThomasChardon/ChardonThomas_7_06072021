import React from "react";
import { dateDuJour } from './Functions.jsx';
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import '../styles/CreatePost.scss';
import axios  from 'axios';
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
        this.setState({value: event.target.value});
      }
    
    handleFileChange = event =>  {

        this.setState({
          ...this.state,
          filepicture: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0],
          loaded: 0,
          filename: event.target.files[0].name
        })
        console.log(this.state.file);
      }
      componentDidUpdate() {
        console.log(this.state.file);
        this.handleSubmit();
      }
      
      handleSubmit() {
        // handleSubmit(event) {
        console.log(this.state.file);
        // event.preventDefault();
      // console.log(this.state.file);
        console.log('Le titre du post : ' + this.state.value + ', Limage liée : ' + this.state.file + ', la date du jour : ' + this.state.datedujour);
        // var formData = new FormData(event.target);

        // for (var [key, value] of formData.entries()) { 
        // console.log(key, value);
        // formData.append(key, value);
        // }
        // let mesdonnees = new FormData();
        // for (let items in this.state) {
        //   // console.log(this.state[items]);
        //   mesdonnees.append(items, this.state[items])
        // }
        // console.log(formData);
        const data = new FormData()
        data.append('file', this.state.file)
        data.append('titre', this.state.titre)
        data.append('filename', this.state.filename)
        data.append('datedujour', dateDuJour())
        data.append('userCreation', "tom@gmail.com")
        data.append('userId', this.state.userId)

        for(var pair of data.entries()) {
          console.log(pair[0]+ ', '+ pair[1]);
       }

        axios.post("http://localhost:3000/createPost", data, { // receive two parameter endpoint url ,form data 
      })
      .then(data => data.json())
        .then(reponse => console.log(reponse.insertId))
        // fetch('http://localhost:3000/createPost', {
        // method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        // headers: {'Content-Type': 'multipart/form-data'},
        // body: JSON.stringify(this.state), dateDuJour
        // })
        // .then(data => data.json())
        // .then(reponse => console.log(reponse.insertId)) // j'obtiens ici l'id du post en question
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