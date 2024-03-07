import './App.css';
import Welcome2 from './components/Welcome2';

const Welcome = ({name}) => {
  return <div><h1>Hello, {name}</h1></div>
};

function App() {
  // JavaScript Here
  console.log("Within the app.");

  return (
    // JSX Here

    <>
      {/* JavaScript code in scope has to be written with {} */}
      {console.log("Within the JSX.")}
      <Welcome name="Conor"/>
      <hr/>
      <Welcome2 name="Liam" job="Furry" myStyle="myStyle"/>
      <Welcome2 name="Conor" job="Student" myStyle="otherStyle"/>
    </>
  )
}

export default App
