// Import React tools.
import React, { useState } from 'react';
// import * as React from 'react';

// Import components.
import PeopleTabs from './components/People/PeopleTabs';
import Degrees from './components/Degrees/Degrees';
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
  const [currentPage, setCurrentPage] = React.useState('home');

  // Go get data.
  React.useEffect( () => {
    // Page was rendered; time to get data.
    getData('about/').then( (json) => {
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

  switch (currentPage) {
    case "people":
      return (
        <>
          <nav className='nav'>
            <h1 className='nav-title' onClick={() => setCurrentPage('home')}>
              <img src='./src/assets/ischool-logo.png' alt='Logo of RIT iSchool.' width='45px' height='45px'/>
              RIT iSchool
            </h1>
            <div className='nav-tabs'>
              <div className='nav-tab' onClick={() => setCurrentPage('people')}>Our People</div>
              <div className='nav-tab' onClick={() => setCurrentPage('degree')}>Degrees</div>
              <div className='nav-tab' onClick={() => setCurrentPage('minors')}>Minors</div>
              <div className='nav-tab' onClick={() => setCurrentPage('employment')}>Employment</div>
            </div>
          </nav>

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <PeopleTabs/>
        </>
      );
    
    case "degree":
      return (
        <>
          <nav className='nav'>
            <h1 className='nav-title' onClick={() => setCurrentPage('home')}>
              <img src='./src/assets/ischool-logo.png' alt='Logo of RIT iSchool.' width='45px' height='45px'/>
              RIT iSchool
            </h1>
            <div className='nav-tabs'>
              <div className='nav-tab' onClick={() => setCurrentPage('people')}>Our People</div>
              <div className='nav-tab' onClick={() => setCurrentPage('degree')}>Degrees</div>
              <div className='nav-tab' onClick={() => setCurrentPage('minors')}>Minors</div>
              <div className='nav-tab' onClick={() => setCurrentPage('employment')}>Employment</div>
            </div>
          </nav>

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="app">
            <Degrees/>
          </div>
        </>
      );
    
    case "minors":
      return (
        <>
          <nav className='nav'>
            <h1 className='nav-title' onClick={() => setCurrentPage('home')}>
              <img src='./src/assets/ischool-logo.png' alt='Logo of RIT iSchool.' width='45px' height='45px'/>
              RIT iSchool
            </h1>
            <div className='nav-tabs'>
              <div className='nav-tab' onClick={() => setCurrentPage('people')}>Our People</div>
              <div className='nav-tab' onClick={() => setCurrentPage('degree')}>Degrees</div>
              <div className='nav-tab' onClick={() => setCurrentPage('minors')}>Minors</div>
              <div className='nav-tab' onClick={() => setCurrentPage('employment')}>Employment</div>
            </div>
          </nav>

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="app">
            <Minors/>
          </div>
        </>
      );

    case "employment":
      return (
        <>
          <nav className='nav'>
            <h1 className='nav-title' onClick={() => setCurrentPage('home')}>
              <img src='./src/assets/ischool-logo.png' alt='Logo of RIT iSchool.' width='45px' height='45px'/>
              RIT iSchool
            </h1>
            <div className='nav-tabs'>
              <div className='nav-tab' onClick={() => setCurrentPage('people')}>Our People</div>
              <div className='nav-tab' onClick={() => setCurrentPage('degree')}>Degrees</div>
              <div className='nav-tab' onClick={() => setCurrentPage('minors')}>Minors</div>
              <div className='nav-tab' onClick={() => setCurrentPage('employment')}>Employment</div>
            </div>
          </nav>

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="app">
            <Employment/>
          </div>
        </>
      );

    default:
      return (
        <>
          <nav className='nav'>
            <h1 className='nav-title' onClick={() => setCurrentPage('home')}>
              <img src='./src/assets/ischool-logo.png' alt='Logo of RIT iSchool.' width='45px' height='45px'/>
              RIT iSchool
            </h1>
            <div className='nav-tabs'>
              <div className='nav-tab' onClick={() => setCurrentPage('people')}>Our People</div>
              <div className='nav-tab' onClick={() => setCurrentPage('degree')}>Degrees</div>
              <div className='nav-tab' onClick={() => setCurrentPage('minors')}>Minors</div>
              <div className='nav-tab' onClick={() => setCurrentPage('employment')}>Employment</div>
            </div>
          </nav>

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="about">
            <h2>{dataObj.title}</h2>
            <h3>{dataObj.description}</h3>
            <div className="abt-quote">
              <p className="quote">{dataObj.quote}</p>
              <p> -- {dataObj.quoteAuthor}</p>
            </div>
          </div>
        </>
      );
  }
};

export default App;
