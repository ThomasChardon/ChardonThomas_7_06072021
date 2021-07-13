import React from "react";
import Banner from './Banner';
import logo from '../assets/plants/logo.png'
import Footer from './Footer.jsx'
// import PostsList from './PostsList.jsx';

function handleSubmit(e) {
    e.preventDefault()
    alert(e.target['my_input'].value)
}



export default function CreatePost() {

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
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
                style={{display:'none'}}/>

                <img src="imagePreview" alt="Votre post"/>

                <br/>
                <button type='submit'>Poster !</button>
                </form>
   			</div>
   			<Footer />
   		</div>);
}