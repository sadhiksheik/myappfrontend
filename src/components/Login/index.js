import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import {FaShare} from "react-icons/fa"
import {Redirect,useHistory} from 'react-router-dom'
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import './index.css';


function Login() {
  const [registerName, setRegisterName] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [showSubmitError,setShowSubmitError] = React.useState(false)
  const [registerMsg,setRegisterMsg] = React.useState("")
  const history = useHistory();
const errorMsg = "Invalid User"
  const onClickingRegister = async (event) => {
    event.preventDefault();
    if (registerName && registerPassword) {
      const userDetails = { name: registerName, password: registerPassword }; 
      const url = 'https://content-sharing-backed.onrender.com/register';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok === true){
        setRegisterMsg("Registration Successful you can login now");
      }
      
    } else {
      alert('Both the fields should be filled');
    }
  };

  const onClickingLogin = async (event) => {
    event.preventDefault();
    if (loginName && loginPassword) {
      const userDetails = { name: loginName, password: loginPassword };
      // console.log(userDetails);
      const url = 'https://content-sharing-backed.onrender.com/login';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response)
      if (response.ok) {
        // console.log(data);
        const jwtToken = data.jwtToken;
        Cookies.set('jwt_token', jwtToken, {
          expires: 30,
        });
        history.replace('/');
      } else {
        setShowSubmitError(true);
        console.log(data)
      }
    } else {
      alert('Both the fields should be filled');
    }
  };
  
  const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

  return (
    <div className='bg-login-cont'>
      <div className='login-wrapper'>
      <div className="logo-cont">
        <h1 className="logo-login">CONTENT</h1>
        <FaShare className="share-logo" color="blue" size={25} />
      </div>
    <div className="login-container">
      <Popup modal trigger={<button className="main-button">Register</button>}>
        {(close) => (
          <div className="popup-container">
            <h1 className='pop-heading'>Registration</h1>
            <div className="close-para-container">
              <p className="description">Get registered by providing your details</p>
              <button type="button" className="close-icon" onClick={() => close()}>
                <RxCross2 size={20} />
              </button>
            </div>

            <form onSubmit={onClickingRegister} className="register-form-container">
              <label className="register-label" htmlFor="name">
                Your Name
              </label>
              <input
                placeholder="Your name"
                className="name-input"
                onChange={(event) => setRegisterName(event.target.value)}
                type="text"
              />
              <label className="register-label" htmlFor="password">
                Set Password
              </label>
              <input
                placeholder="password"
                className="name-input"
                onChange={(event) => setRegisterPassword(event.target.value)}
                type="password"
              />
              <button type="submit" className="submit-btn">
                Register
              </button>
            </form>
          </div>
        )}
      </Popup>

      <Popup modal trigger={<button className="main-button">Login</button>}>
        {(close) => (
          <div className="popup-container">
            <h1 className='pop-heading'>Login</h1>
            <div className="close-para-container">
              <p className="description">Login by providing your details</p>
              <button type="button" className="close-icon" onClick={() => close()}>
                <RxCross2 size={20} />
              </button>
            </div>
            <form onSubmit={onClickingLogin} className="register-form-container">
              <label className="register-label" htmlFor="name">
                Your Name
              </label>
              <input
                placeholder="Your name"
                className="name-input"
                onChange={(event) => setLoginName(event.target.value)}
                type="text"
              />
              <label className="register-label" htmlFor="password">
                Your Password
              </label>
              <input
                placeholder="password"
                className="name-input"
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
              />
              {showSubmitError && <p className='error-msg'>*{errorMsg}</p>}
              <button type="submit" className="submit-btn">
                Login
              </button>
              
            </form>
          </div>
        )}
      </Popup>
    </div>
    {registerMsg!=="" && <p className='reg-msg'>{registerMsg}</p>}
    </div>
    
    </div>
  );
}

export default Login;
