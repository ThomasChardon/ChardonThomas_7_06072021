import React from "react";
import Banner from './Banner';
import logo from '../assets/plants/logo.png'
import Footer from './Footer.jsx'
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
          titre: ""
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
        console.log('Le titre du post : ' + this.state.value + ', Limage liée : ' + this.state.file);
        //Ici faire fetch en post
        event.preventDefault();
      }

    render() {
        return (<div>
                    <Banner>
                        <img src={logo} alt='La maison jungle' className='lmj-logo' />
                        <h1 className='lmj-title'>Groupomania</h1>
                    </Banner>
                    <div className='lmj-layout-inner'>
                        <form onSubmit={this.handleSubmit}>
                        <input type='text' name='title' defaultValue={this.state.titre} onChange={this.handleChange}/>
                        <br/>
                        <input type="file" 
                        name="chemin_image"
                        onChange={this.handleFileChange}/>
                        <img src={this.state.file} alt="Votre post"/>
                        <br/>
                        <button type='submit'>Poster !</button>
                        </form>
                    </div>
                    <Footer />
                </div>);
            }
}

export default CreatePost;