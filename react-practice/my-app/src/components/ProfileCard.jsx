function ProfileCard(props){
  return (
    <div className="ProfileCard">
  <h1>Hii, this is {props.name}</h1>
  <p> My age is {props.age}. </p>
  <p>{props.tagline}</p>
  </div>
  )
} export default ProfileCard;