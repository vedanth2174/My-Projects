import react from "react";
import reactDOM from "react-dom/client";
import "./App.css";
import ProfileCard from "./components/ProfileCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

// function Greeting (props){
//   return <h3>Hello {props.name}, age {props.age}.Let's start react.</h3>
// }

function App(){
  const name = "Vedant";
  return (<>
  <Header></Header>
  {/* <Greeting name = "Everyone" ></Greeting> */}
  <ProfileCard name = "Vedant Hippalgave" age = "20" tagline = "When nothing is for sure, anything can happen..."></ProfileCard>
  <ProfileCard name = "Bill Gates" age = "54" tagline = "I am the owner of Microsoft"></ProfileCard>
  <ProfileCard name = "Virat Kohli" age = "36" tagline = "I am the Best"></ProfileCard>
  <h2>Learning react feels like express but for UI</h2>
  <Footer></Footer>
  </>
  )
}

export default App;