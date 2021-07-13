import React, { useState } from "react";
import Banner from './Banner';
import logo from '../assets/plants/logo.png'
import Footer from './Footer.jsx'
// import PostsList from './PostsList.jsx';

let afficheImage = "Image Preview";

function handleSubmit(e) {
    e.preventDefault()
    alert(e.target['my_input'].value)
}


// const CreatePost = props => {
export default function CreatePost() {
    const [selectedFile, setSelectedFile] = useState(null);
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
      };

      const handleChange = event => {
        const fileUploaded = event.target.files[0];
        // this.props.handleFile(fileUploaded);
        // console.log(fileUploaded);
        console.log(fileUploaded.name);
        afficheImage = fileUploaded.name;

    };

  return (<div>
   			<Banner>
   				<img src={logo} alt='La maison jungle' className='lmj-logo' />
   				<h1 className='lmj-title'>Groupomania</h1>
   			</Banner>
   			<div className='lmj-layout-inner'>
   				<form onSubmit={handleSubmit}>
                <input type='text' name='newpost' defaultValue='Titre du post' />
                <br/>

                <button onClick={handleClick}>
                    ADD IMAGE
                </button>
                <input type="file" 
                ref={hiddenFileInput}
                // onChange={handleChange}
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.files[0])}/>

                <img src={afficheImage} alt="Votre post"/>

                <br/>
                <button type='submit'>Poster !</button>
                </form>
   			</div>
   			<Footer />
   		</div>);
}

// export default CreatePost;