import {useState} from "react";

function ProfileCard(props){
  const [likes, setLikes] = useState(0);
  return (
    <div className="ProfileCard">
  <h1>Hii, this is {props.name}</h1>
  <p> My age is {props.age}. </p>
  <p>{props.tagline}</p>
  <h2>Like: {likes}</h2>
  <button onClick={()=> setLikes(likes+1)}>👍🏻</button>
  </div>
  )
} export default ProfileCard;