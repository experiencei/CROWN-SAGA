import React, { Component } from 'react';
import Custombtn from '../customButton/custombtn';
import Forminput from '../forminput/forminput';
import { auth , createDocument } from '../../firebase/firebase.utility';
import { SignUpContainer, SignUpTitle } from './signup.styled';

export default class Signup extends Component {

  constructor(props) {
      super(props)
  
      this.state = {
           displayName : '',
           email : '',
           password : '',
           confirmpassword : ''
      }
  }
  
  handleSubmit = async e => { 
    e.preventDefault()
    const {displayName ,email , password ,confirmpassword} = this.state;

    if (password !== confirmpassword) {
        alert("Password don't match");
        return
    }

    try {
        const {user} = await auth.createUserWithEmailAndPassword(email , password);
       await createDocument(user ,{displayName})

       this.setState({
        dipslayName : '',
        email : '',
        password : '',
        confirmpassword : ''
       })

    } catch (error) {
        console.error(error);
    }
   }

   handleChange = e => {
    const {name , value} = e.target;

    this.setState({[name] : value})
  }

    render() {
        const {displayName ,email , password ,confirmpassword} = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle> i do not have an account</SignUpTitle>
                <span>sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                <Forminput
                    name='displayName'
                    type='text'
                    handleChange={this.handleChange}
                    value={displayName}
                    label='Display Name'
                    required
                   />
                <Forminput
                    name='email'
                    type='email'
                    handleChange={this.handleChange}
                    value={email}
                    label='Email'
                    required
                   />
                <Forminput
                    name='password'
                    type='password'
                    handleChange={this.handleChange}
                    value={password}
                    label='Password'
                    required
                   />
                <Forminput
                    name='confirmpassword'
                    type='password'
                    handleChange={this.handleChange}
                    value={confirmpassword}
                    label='Confirm Password'
                    required
                   />
                   <Custombtn type="submit" >SIGN UP </Custombtn>
                </form>
            </SignUpContainer>
        )
    }
}




