import React from "react";
import { dateDuJour, getUserId } from './Functions.jsx';
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import '../styles/CreatePost.scss';
import axios from 'axios';


class CreatePost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: {},
      filepicture: "",
      filename: "",
      titre: "",
      datedujour: dateDuJour(),
      userId: getUserId(),
      userName: "",
      messageCreation: "",
      buttonstop: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ titre: event.target.value });
  }

  handleFileChange = event => {
    this.setState({
      ...this.state,
      filepicture: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0],
      filename: event.target.files[0].name
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/Profile/" + this.state.userId + 'redux', { headers: { 'Authorization': window.sessionStorage.getItem('dataUser') } })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((datas) => {
        this.setState({
          userName: datas[0].user_name,
        })
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('Le titre du post : ' + this.state.titre + ', Limage liée : ' + this.state.image + ', la date du jour : ' + this.state.datedujour);
    const formdata = new FormData()
    formdata.append('image', this.state.image)
    formdata.append('titre', this.state.titre)
    formdata.append('filename', this.state.filename)
    formdata.append('datedujour', dateDuJour())
    formdata.append('userId', this.state.userId)
    formdata.append('userCreation', this.state.userName)
    //   for (var value of formdata.values()) {
    //     console.log(value); //ok
    //  }
    axios.post("http://localhost:3000/createPost",
      formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': window.sessionStorage.getItem('dataUser'),
      }
    })
      .then((reponse) => {
        console.log(reponse);
        if( reponse.statusText === "OK") {
          console.log("ok")
          this.setState({
            messageCreation: "Post créé !",
            buttonstop: true
          })
        }
      })
    
  }


  render() {
    return (<div>
      <Layout>
        <NavBar />
        <div className='create_post'>
          <form onSubmit={this.handleSubmit}>
            <p>Indiquez le titre de votre Post (50 caractères max) :</p>
            <input className="create_post_titre" type='text' name='title' defaultValue={this.state.titre} onChange={this.handleChange} />
            {/* <br/> */}
            <p>Choisissez votre image/gif :</p>
            <input className="button_create_post_image"
              type="file"
              name="file"
              onChange={this.handleFileChange} />
            <img className="create_post_image" src={this.state.filepicture} alt="Votre post" />
            <br />
            <div className="div_button_create_post_submit">
            <button className="button_create_post_submit" type='submit' disabled={this.state.buttonstop}>Poster !</button>
            </div>
          </form>
          <div className="legende_create_post">
            {this.state.messageCreation}
          </div>
        </div>
      </Layout>
    </div>);
  }
}

export default CreatePost;