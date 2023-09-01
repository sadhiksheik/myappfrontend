import { Link,withRouter,useHistory } from "react-router-dom"
import React, { useState } from 'react';
import {FaShare} from "react-icons/fa"
import Cookies from "js-cookie";
import "./index.css"

const Header =()=>{
  const [postType,setpostType] = useState("All");
  const history = useHistory();
  const onAllPostsClicked = () =>{
    setpostType("All")
  }

  const onMyPostsClicked = () =>{
    setpostType("My")
  }

  const onLoggingOut = () =>{
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  
  const activeAllButton = postType === "All"? "all-posts-button":""
  const activeMyButton = postType === "My" ? "my-posts-button" : ""
return (
  <div className="header-container">
    <Link className="link-el" to="/">
      <div className="logo-cont">
        <h1 className="logo">CONTENT</h1>
        <FaShare className="share-logo" color="blue" size={25} />
      </div>
    </Link>
    <div className="routes-container">
      <Link className="link-el" to="/">
        <button onClick={onAllPostsClicked} className={`${activeAllButton} posts-btn `}>All posts</button> 
      </Link>
    <Link className="link-el" to="/myposts">
        <button onClick={onMyPostsClicked}  className={`${activeMyButton} posts-btn`}>My posts</button>
    </Link>
    <button onClick={onLoggingOut} className="logout-btn">Logout</button>
    </div>
  </div>
)
}
export default withRouter(Header)