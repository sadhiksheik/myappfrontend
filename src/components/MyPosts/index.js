import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiFillDelete } from "react-icons/ai";
import { Puff } from "react-loader-spinner";
import Popup from "reactjs-popup";
import { FiEdit2 } from "react-icons/fi";
import Header from "../Header";
import { RxCross2 } from "react-icons/rx";
import "./index.css";
import Cookies from "js-cookie";

const apiStateConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};



function MyPosts() {
  const [myPostsList, setMyPostsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStateConstants.success);

  const [userName, setUserName] = useState("");
  const [posttext, setPostText] = useState("");
  
  const [editText, setEditText] = useState(posttext);

  useEffect(() => {
    getMyPosts();
  }, []);

  const getMyPosts = async () => {
    setApiStatus(apiStateConstants.loading);
    const token = Cookies.get("jwt_token");
    const url = `https://content-sharing-backed.onrender.com/myposts`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      // console.log(response);
      if (response.ok) {
        const fetchedData = await response.json();
        setMyPostsList(fetchedData);
        // console.log(fetchedData);
        setApiStatus(apiStateConstants.success);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setApiStatus(apiStateConstants.failure);
    }
  };

  const getHomeLoaderView = () => (
    <div className="Home-loader-container">
      <Puff color="white" height={50} width={50} />
    </div>
  );

  const getHomeFailureView = () => <p>FAILURE</p>;

  const onCreatePost = async (event) => {
    event.preventDefault();
    if (userName && posttext) {
      const userDetails = {
        post_text: posttext,
        likes: 0,
        user_name: userName,
      };
      const url = "https://content-sharing-backed.onrender.com/posts";
      const token = Cookies.get("jwt_token");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      if (response.ok === true) {
        getMyPosts();
      }
      // console.log(response);
    } else {
      alert("Both the fields should be filled");
    }
  };

  const OnPostEdited = async (event, post_id) => {
    event.preventDefault();
    if (editText) {
      const userDetails = { post_text: editText };
      const url = `https://content-sharing-backed.onrender.com/posts/${post_id}`;
      const token = Cookies.get("jwt_token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      if (response.ok === true) {
        getMyPosts();
      }
      // console.log(response);
    } else {
      alert("Both the fields should be filled");
    }
  };

  const deletePost=async (post_id)=>{
    
      const url = `https://content-sharing-backed.onrender.com/posts/${post_id}`;
      const token = Cookies.get("jwt_token");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      console.log(response)
      getMyPosts()

  }

  const getHomeSuccessView = () => (
    <>
      <Popup
        modal
        trigger={<button className="create-btn-my-posts">Create Post +</button>}
      >
        {(close) => (
          <div className="popup-container">
            <div className="close-para-container">
              <p className="description">
                Add Your Post By Filling The Details
              </p>
              <button
                type="button"
                className="close-icon"
                onClick={() => close()}
              >
                <RxCross2 size={20} />
              </button>
            </div>

            <form onSubmit={onCreatePost} className="register-form-container">
              <label className="register-label" htmlFor="name">
                User Name
              </label>
              <input
                placeholder="Enter Your Name"
                className="name-input"
                onChange={(event) => setUserName(event.target.value)}
                type="text"
              />
              <label className="register-label" htmlFor="password">
                Post Text
              </label>
              <textarea
                rows={4}
                cols={8}
                placeholder="Enter Post Text"
                className="name-input"
                onChange={(event) => setPostText(event.target.value)}
                type="text"
              />
              <button type="submit" className="submit-btn">
                Post
              </button>
            </form>
          </div>
        )}
      </Popup>
      {myPostsList.length === 0 ? (
        <h1 className="no-posts">There Are No Posts Yet</h1>
      ) : (
        <ul className="myposts-ul-cont">
          {myPostsList.map((each) => (
            <li className="each-post-li">
              <div className="profile-cotainer">
                <p className="profile">{each.user_name[0]}</p>
                <p className="profile-name">{each.user_name}</p>
              </div>
              <div className="mypost-container">
                <p className="post-text">{each.post_text}</p>
                <div className="handle-post-cont">
                  <div className="like-container-myposts">
                    <button className="like-btn">
                      <AiOutlineLike size={30} color="blue" />
                    </button>
                    <p className="likes">{each.likes} Likes</p>
                  </div>

                  <Popup
                    modal
                    trigger={
                      <button className="like-btn-my">
                        <FiEdit2 color="blue" size={20} />
                      </button>
                    }
                  >
                    {(close) => (
                      <div className="popup-container">
                        <div className="close-para-container">
                          <p className="description">
                            Edit Your Post By Filling The Details
                          </p>
                          <button
                            type="button"
                            className="close-icon"
                            onClick={() => close()}
                          >
                            <RxCross2 size={20} />
                          </button>
                        </div>

                        <form
                          onSubmit={(event) =>
                            OnPostEdited(event, each.post_id)
                          }
                          className="register-form-container"
                        >
                          <label className="register-label" htmlFor="password">
                            Edit post text
                          </label>
                          <textarea
                            rows={4}
                            cols={8}
                            value={editText}
                            placeholder="Enter Post Text"
                            className="name-input"
                            onChange={(event) =>
                              setEditText(event.target.value)
                            }
                            type="text"
                          />
                          <button type="submit" className="submit-btn">
                            Edit post
                          </button>
                        </form>
                      </div>
                    )}
                  </Popup>

                  <button onClick={()=>deletePost(each.post_id)} className="like-btn-my">
                    <AiFillDelete color="blue" size={20} />
                  </button>


                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  const getSwitchedResults = () => {
    switch (apiStatus) {
      case apiStateConstants.loading:
        return getHomeLoaderView();
      case apiStateConstants.success:
        return getHomeSuccessView();
      case apiStateConstants.failure:
        return getHomeFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="bg-home-container">
      <Header />
      
      {getSwitchedResults()}
    </div>
  );
}

export default MyPosts;
