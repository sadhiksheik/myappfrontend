import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Navigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import './index.css';
import { useNavigate } from 'react-router-dom'; // Import the hook

function Login() {
  const [registerName, setRegisterName] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');

  const navigate = useNavigate(); 

  const onClickingRegister =  (event) => {
    event.preventDefault();
    if (registerName && registerPassword) {
    // const userDetails = {name: registername, password: registerPassword}
    // const url = 'https://content-sharing-backed.onrender.com/register'
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(userDetails),
    // }
    // const response = await fetch(url, options)
    // console.log(response)

    } else {
      alert('Both the fields should be filled');
    }
  };

  const onClickingLogin = (event) => {
    event.preventDefault();
    if (loginName && loginPassword) {
      const userDetails = {name: loginName, password: loginPassword}
      console.log(userDetails)
    // const url = 'https://content-sharing-backed.onrender.com/login'
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(userDetails),
    //  const response = await fetch(url, options)
    // const data = await response.json()
    // console.log(data)
      const jwtToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l2YSBLb3RpIiwidXNlcl9pZCI6NCwiaWF0IjoxNjkzNDY3MDM5fQ.HtGvkkUbtvd_ySmLK_DoSA6G4xsFxEPmyZdHU9reqa8';

      Cookies.set('jwt_token', jwtToken, {
        expires: 30,
      });

      navigate('/'); // Navigate using the hook

    } else {
      alert('Both the fields should be filled');
    }
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <Popup modal trigger={<button className="main-button">Register</button>}>
        {(close) => (
          <div className="popup-container">
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
                Set Password
              </label>
              <input
                placeholder="password"
                className="name-input"
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
              />
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default Login;
