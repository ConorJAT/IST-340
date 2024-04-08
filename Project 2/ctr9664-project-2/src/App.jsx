// Import React tools.
import React, { useState } from 'react';
// import * as React from 'react';

// Import components.
import PeopleTabs from './components/People/PeopleTabs';
import DegreeAccords from './components/Degrees/DegreesAccords';
import Employment from './components/Employment/Employment';
import Minors from './components/Minors/Minors';

// Import utils.
import { getData } from './utils/getData';

// Import CSS.
import './App.css';

const App = () => {
  // Setup States.
  const [loaded, setLoaded] = React.useState(false);
  const [dataObj, setDataObj] = React.useState();

  // Go get data.
  React.useEffect( () => {
    // Page was rendered; time to get data.
    getData('about/').then( (json) => {
      console.log(json);
      setDataObj(json);
      setLoaded(true);
    });
  }, [] );

  // Return for before data is loaded.
  if (!loaded) {
    return (
      <>
        <div className="sticky">
          <h1>Welome to the RIT iSchool!</h1>
          <div>Loading Data...</div>
        </div>
      </>
    );
  }

  // Return for after data is loaded.
  return (
    <>
      <div className="sticky">
        <h1>Welome to the RIT iSchool!</h1>
      </div>
        
      <div className="app">
        <div className="about">
          <h2>{dataObj.title}</h2>
          <h3>{dataObj.description}</h3>
          <div className="abt-quote">
            <p className="quote">{dataObj.quote}</p>
            <p> -- {dataObj.quoteAuthor}</p>
          </div>
        </div>
        <hr/>

        {/* Put components here. */}
        <PeopleTabs/>
        <hr/>
        <DegreeAccords/>
        <hr/>
        <Employment/>
        <hr/>
        <Minors/>

      </div>
    </>
  );
};

export default App;
