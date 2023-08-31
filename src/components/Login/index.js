import { Component } from "react";
import {RxCross2} from "react-icons/rx"
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
import "./index.css"

class Login extends Component{
  state={registername:"",registerPassword:"",loginName:"",loginPassword:""}

  onRegisterNameChanged = event =>{
    this.setState({registername:event.target.value})
  }

  onRegisterPassChanged  = event =>{
    this.setState({registerPassword:event.target.value})
  }

  onClickingRegister  = async event =>{
    event.preventDefault()
    const {registername,registerPassword} = this.state
    if (registername && registerPassword){
    const userDetails = {name: registername, password: registerPassword}
    const url = 'https://content-sharing-backed.onrender.com/register'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    }
    else{
      alert("Both the fields should be filled")
    }
  }


  onLoginNameChanged  = event =>{
    this.setState({loginName:event.target.value})
  }

  onLoginPassChanged = event =>{
    this.setState({loginPassword:event.target.value})
  }

  onClickingLogin = async event =>{
    event.preventDefault()
    const {loginName,loginPassword} = this.state
    if (loginName && loginPassword){
    const userDetails = {name: loginName, password: loginPassword}
    const url = 'https://content-sharing-backed.onrender.com/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    }
    else{
      alert("Both the fields should be filled")
    }
  }

  render(){
    return(
        <div className="login-container">
              <Popup
                    modal
                    trigger={<button className="main-button" >Register</button>}
                >
                    {close => (
                      <div className="popup-container">
                        <div className="close-para-container">
                          <p className="description">Get registered by providing your details</p>
                          <button type="button" className="close-icon" onClick={() => close()}>
                              <RxCross2 size={20} />
                      </button> 
                        </div>
                        <form onSubmit={this.onClickingRegister} className="register-form-container" >
                          <label className="register-label" htmlFor="name">Your Name</label> 
                          <input placeholder="Your name" className="name-input" onChange={this.onRegisterNameChanged} type="text" />
                          <label className="register-label" htmlFor="password">Set Password</label> 
                          <input placeholder="password" className="name-input" onChange={this.onRegisterPassChanged} type="password" />
                          <button type="submit" className="submit-btn">Register</button>
                        </form>
                      </div>
                    )}
              </Popup>

          <Popup
                    modal
                    trigger={<button className="main-button">Login</button>}
                >
                    {close => (
                      <div className="popup-container">
                        <div className="close-para-container">
                          <p className="description">Login by providing your details</p>
                          <button type="button" className="close-icon" onClick={() => close()}>
                              <RxCross2 size={20} />
                      </button> 
                        </div>
                        <form onSubmit={this.onClickingLogin} className="register-form-container" >
                          <label className="register-label" htmlFor="name">Your Name</label> 
                          <input placeholder="Your name" className="name-input" onChange={this.onLoginNameChanged} type="text" />
                          <label className="register-label" htmlFor="password">Set Password</label> 
                          <input placeholder="password" className="name-input" onChange={this.onLoginPassChanged} type="password" />
                          <button type="submit" className="submit-btn">Login</button>
                        </form>
                      </div>
                    )}
          </Popup>

        </div>
    )
  }
}

export default Login


