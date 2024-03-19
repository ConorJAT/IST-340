import { useState } from 'react';
import Welcome from './components/Welcome';
import Welcome2 from './components/Welcome2';
import './App.css';

const App = () => {
  // JavaScript Here
  console.log("Within the app.");

  // Build-In States
  // const [name, setName] = useState(null);
  // const [test, setTest] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const [dataObj, setDataObj] = useState();

  // Methods
  const getData = () => {
    // Load data into dataObj, set loaded to true.
    setDataObj({
      title: "React Demo", 
      description:"This is a React Demo."
    });
    setLoaded(true);
  };

  // Rendering
  if (!loaded) {
    return (
      <>
        <h1>Loading Data...</h1>
        <button onClick={getData}>Get Data</button>
      </>
    );
  }

  return (
    // JSX Here

    <>
      {/* JavaScript code in scope has to be written with {} */}
      {console.log("Within the JSX.")}
      <h1>{dataObj.title}</h1>
      <p>{dataObj.description}</p>
      <hr/>
      <Welcome name="Conor" age="20"/>
      <hr/>
      <Welcome2 name="Liam" job="Furry" myStyle="myStyle"/>
      <Welcome2 name="Conor" job="Student" myStyle="otherStyle"/>
    </>
  );
};

export default App
