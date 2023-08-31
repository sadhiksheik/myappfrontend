import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { Puff } from "react-loader-spinner";
import Header from "../Header";

import "./index.css";
import Cookies from "js-cookie";

const apiStateConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  loading: "LOADING",
  failure: "FAILURE",
};

// const posts = [
//   {post_id:2,post_text:"I love coding",likes:12,user_id:2,user_name:"Sadhik Sheik"},
//   {post_id:3,post_text:"Happy Birthday in advance to aour beloved leader",likes:12,user_id:3,user_name:"Sathish Pydi"},
// {post_is:4,post_text:"Happy Birthday in advance to aour beloved leader",likes:14,user_id:3,user_name:"Leo Motto"},
// // {4|Haii All, hope everyone doing great|14|4},
// // {5|Im not handsome, but i can give hands to someone|13|5},
// // {6|I have joined in next wave CCBP to learn all the necessary sofware technologies|12|6},
// // {7|I began exploring different courses where i cauld find learning different sofware technologies|12|7},
// // {8|Travelling to chennai for site visit|13|8},
// // {9|Stock market will be the future booming aspect|13|9},
// // {10|taken 100 days coding challenge|13|10},
// // {13|Hii im sathish im an electrical engineer|12|2},
// // {14|Hii im leo im a mechanical engineer|12|3},
// ]

function Home() {
  const [postsList, setPostsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStateConstants.success);
  
  // const [isLikedMap, setIsLikedMap] = useState({});
  const [likedList,setLikedList] = useState([])
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setApiStatus(apiStateConstants.loading);
    const token = Cookies.get("jwt_token");
    console.log(token);
    const url = "https://content-sharing-backed.onrender.com/posts";

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        const fetchedData = await response.json();
        setPostsList(fetchedData);
        console.log(fetchedData);
        setApiStatus(apiStateConstants.success);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setApiStatus(apiStateConstants.failure);
    }
  };

  // const handleLike = async (post) => {
  //   setApiStatus(apiStateConstants.loading);
  //   const postId = post.post_id;
  //   const updatedLikes = isLikedMap[postId] ? post.likes - 1 : post.likes + 1;
  //   const token = Cookies.get("jwt_token");
  //   const url = `https://content-sharing-backed.onrender.com/like/${postId}`;
  //   const postDetails = {
  //     ...post,
  //     likes: updatedLikes,
  //   };

  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(postDetails),
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     if (response.ok) {
  //       const fetchedData = await response.json();
  //       setApiStatus(apiStateConstants.success);
  //       setIsLikedMap((prevIsLikedMap) => ({
  //         ...prevIsLikedMap,
  //         [postId]: !prevIsLikedMap[postId],
  //       }));
  //       setPostsList(fetchedData);
  //       setApiStatus(apiStateConstants.success);

        
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error during like/unlike operation: ", error);
  //     setApiStatus(apiStateConstants.failure);
  //   }
  // };

  const handleLike = (id) => {
    const updatedList = likedList.includes(id)
      ? likedList.filter((each) => each.id !== id)
      : [...likedList, id]; 
  
    setLikedList(updatedList);
  };
  

  const getHomeLoaderView = () => (
    <div className="Home-loader-container">
      <Puff color="#00BFFF" height={100} width={100} />
    </div>
  );

  const getHomeFailureView = () => <p>FAILURE</p>;

  const getHomeSuccessView = () => (
    <ul className="home-cont">
      {postsList.map((each) => (
        <li className="each-post-li" key={each.post_id}>
          <div className="profile-cotainer">
            <p className="profile">{each.user_name[0]}</p>
            <p className="profile-name">{each.user_name}</p>
          </div>
          <div className="post-container">
            <p className="post-text">{each.post_text}</p>
          </div>
          <div className="like-container">
            <button
              onClick={() => handleLike(each.post_id)}
              className="like-btn"
            >
              {likedList.includes(each.post_id) ? (
                <AiFillLike size={30} color="blue" />
              ) : (
                <AiOutlineLike size={30} color="blue" />
              )}
            </button>
            <p className="likes">{each.likes} Likes</p>
          </div>
        </li>
      ))}
    </ul>
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

export default Home;
