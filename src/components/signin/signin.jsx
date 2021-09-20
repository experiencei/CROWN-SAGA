import React, { Component } from 'react'
import Forminput from '../forminput/forminput';
import Custombtn from '../customButton/custombtn';
// import { auth ,signInWithGoogle } from '../../firebase/firebase.utility';
import { connect } from "react-redux";
import { googleSignInStart , emailSignInStart}from "../../redux/user/user.actions."
import {
    SigninContainer,
    SigninTitle,
    ButtonsBarContainer
  } from './signin.styled'

 class Signin extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
           email : ''  ,
           password : ''
        }
    }
    handleSubmit = async e => {
     e.preventDefault();
     const { emailSignInStart } = this.props;
     const {email , password} = this.state;
     emailSignInStart(email , password);
    //   try {
    //       await auth.signInWithEmailAndPassword( email ,password)
    //       this.setState({ email:"" , password:""})
    //   } catch (error) {
    //       console.error(error);
    //       if (error) {
    //           alert("Make sure you sign up alraedy");
    //           this.setState({ email:"" , password:""})
    //       }
    //   }
     
    }

    handleChange = e => {
    const {name , value} = e.target;

    this.setState({[name] : value})
  }

    render() {
         const { googleSignIn } = this.props;
         const {email , password} = this.state;
        return (
        <SigninContainer>
            <SigninTitle>I already have an account</SigninTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
                <Forminput
                    name='email'
                    type='email'
                    handleChange={this.handleChange}
                    value={email}
                    label='email'
                    required
                   />
                <Forminput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={this.handleChange}
                    label='password'
                     required  
                   />
                   <ButtonsBarContainer>
                       <Custombtn type="submit">Sign In</Custombtn>
                       <Custombtn type="button" onClick={googleSignIn} isGoogleSignin>Sign In with Google</Custombtn>
                   </ButtonsBarContainer>
               </form> 
            </SigninContainer>
        )
    }
}


const mapDispatchToProps = dispatch =>( {
    googleSignIn : () => dispatch(googleSignInStart()),
    emailSignInStart : (email , password) => dispatch(emailSignInStart({ email , password}))
})

export default connect(null, mapDispatchToProps)(Signin)