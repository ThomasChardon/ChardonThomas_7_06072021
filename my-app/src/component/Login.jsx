import React from 'react';
// import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import logo from '../assets/plants/logo.png';
import Footer from './Footer.jsx';



class Login extends React.Component 
// export default function Login(props)
{
    constructor(props){
        super(props)
        this.state = {
          username: "",
          password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // const [typeInput, setTypeInput] = useState("password");
    // const [invalidForm, setInvalid] = useState(null);

    handleChange = (event) => {
        this.setState({value: event.target.value});
        console.log("Mon event : " + event);
        console.log("Mon username : " + this.state.username);////////////////////////////////////////////////////////
    }

    handleSubmit = (formData) =>
    {
        console.log("Le formData target : " + formData.target);
        const myuser = {};
            myuser.name = formData.username;
            myuser.password = formData.password;
            
            fetch("/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myuser),
            })
            .then((res) => { //Il faut que le back renvoie les bonnes données en fonction de la requete, ici réponse.data.dataUser
                const dataUser = JSON.stringify(res.data.dataUser);
                sessionStorage.setItem('dataUser', dataUser);
                // redirection vers les posts
                window.location.href = "/";
            })
            .catch(error =>
            {
                console.log("Une erreur est survenue : " + error);
                // if (error.response.data.message) 
                    // setInvalid(error.response.data.message);
            });
            console.log(myuser);
            formData.preventDefault();
    }

    // const dataUser = JSON.stringify(response.data.dataUser);
    // sessionStorage.setItem('dataUser', dataUser);

    render() {
        return (<div>
            <Banner>
                <img src={logo} alt='La maison jungle' className='lmj-logo' />
                <h1 className='lmj-title'>Groupomania</h1>
            </Banner>
            <div className='lmj-layout-inner'>
                <form onSubmit={this.handleSubmit}>
                <input type='text' name='Username' defaultValue={this.state.username} onChange={this.handleChange}/>
                <br/>
                <input type='text' name='password' defaultValue={this.state.password} onChange={this.handleChange}/>
                <br/>
                <button type='submit'>Se connecter</button>
                </form>
            </div>
            <Footer />
        </div>);
    }
}

export default Login;
//     return (
//         <div className="containersignup">

//             <div className="background"></div>

//             <Formik
//                 initialValues={initialValue}
//                 validationSchema={validationShema}
//                 onSubmit={handleSubmit}
//             >

//             {
//                 (formik) => {

//                     return (

//                         <Form>

//                             {invalidForm != null && (
//                                 <div className="errorsServer">
//                                     <p>{invalidForm}</p>
//                                     <Link to={routes.SIGNUP}>inscription</Link>
//                                 </div> 
//                             )}
                    
//                             <div className="form_group">
//                                 <label htmlFor="email">Adresse email</label>

//                                 <Field 
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     placeholder="exemple@gmail.com"
//                                     className="input"
//                                 />

//                                 <ErrorMessage name="email" component="span"/>
//                             </div>

//                             <div className="form_group">
//                                 <label htmlFor="password">Mot de passe</label>

//                                 <Field 
//                                     type={typeInput}
//                                     name="password"
//                                     id="password"
//                                     placeholder="8 caractères"
//                                     className="input"
//                                 />

//                                 <ErrorMessage name="password" component="span"/>

//                                 {typeInput === "password" ? 
//                                     <FontAwesomeIcon icon={faEye} className="showPassword" onClick={showPassword}></FontAwesomeIcon> 
//                                     : <FontAwesomeIcon icon={faEyeSlash} className="showPassword" onClick={showPassword}></FontAwesomeIcon>
//                                 }
//                             </div>

//                             <button type="submit" disabled={!formik.isValid}>Connexion</button>
//                         </Form>  
//                     )
//                 }
//             }

//             </Formik>
//         </div>
//     );
// }