// Import React tools.
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

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
  const [menuOpen, setMenuOpen] = React.useState(false);

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
      <div>
        <h1>Welome to the RIT iSchool!</h1>
        <div>Loading Data...</div>
      </div>
    );
  }

  // Setup mobile/hamburger menu toggle.
  const toggleDrawer = (newOpen) => () => {
    setMenuOpen(newOpen);
  };

  // Setup mobile/hamburger menu content.
  const mobileMenu = [
    { name: "Home", value: "home" },
    { name: "Our People", value: "people" },
    { name: "Degrees", value: "degree" },
    { name: "Minors", value: "minors" },
    { name: "Employment", value: "employment" }
  ];

  // Setup mobile/hamburger menu object.
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {mobileMenu.map((subject) => (
          <ListItem key={subject.value} disablePadding>
            <ListItemButton onClick={() => setCurrentPage(subject.value)}>
              <ListItemText primary={subject.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Setup navbar object.
  const navbar = (
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
          <div className='nav-mobile' onClick={{} = toggleDrawer(true)}><MenuIcon fontSize='large'/></div>
        </div>
      </nav>

      <Drawer open={menuOpen} onClose={toggleDrawer(false)}>
            {DrawerList}
      </Drawer>
    </>
  );

  // Page state tracking to only display one page's content at a time.
  switch (currentPage) {
    // People content:
    case "people":
      return (
        <>
          {navbar}

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <PeopleTabs/>
        </>
      );
    
    // Degree content:
    case "degree":
      return (
        <>
          {navbar}

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="app">
            <Degrees/>
          </div>
        </>
      );
    
    // Undergrad minor content:
    case "minors":
      return (
        <>
          {navbar}

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="app">
            <Minors/>
          </div>
        </>
      );

    // Employment content:
    case "employment":
      return (
        <>
          {navbar}

          <div className="img-container">
            <img src='./src/assets/golisano.jpg' alt="Image of Golisano College." className="page-img"/>
          </div>

          <div className="app">
            <Employment/>
          </div>
        </>
      );

    // Default (home) content:
    default:
      return (
        <>
          {navbar}

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