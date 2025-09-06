// Parent Component
function App() {
  return (
    <div>
      <Greeting name="Vedant" />
      <Greeting name="Mayur" />
    </div>
  );
}

// Child Component
function Greeting(props) {
  return <h1>Hello, {props.name} 👋</h1>;
}

export default App;
