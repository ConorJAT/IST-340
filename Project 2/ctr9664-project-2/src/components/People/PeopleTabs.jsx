// Import React tools.
import React, { useState } from 'react';
import { TabPane, Tab } from 'semantic-ui-react';

// Import utils.
import { getData } from '../../utils/getData';

// Import component.
import PeopleGroup from './PeopleGroup';

// Import CSS.
import './People.css';

const PeopleTabs = () => {
  // Use states.
  const [loaded, setLoaded] = useState(false);
  const [dataObj, setDataObj] = useState();

  // Go get data.
  React.useEffect( () => {
    // Page was rendered; time to get data.
    getData('people/').then( (json) => {
        setDataObj(json);
        setLoaded(true);
    });
  }, [] );

  // Return for data not loaded yet.
  if (!loaded) {
    return (
      <h1>Loading our people...</h1>
    );
  }

  // Set up layout for displayed content.
  const panes = [
    { menuItem: 'Faculty', render: () => <TabPane>
      <PeopleGroup title='Faculty' whichGroup={dataObj.faculty}/>
    </TabPane> },
    { menuItem: 'Staff', render: () => <TabPane>
      <PeopleGroup title='Staff' whichGroup={dataObj.staff}/>
    </TabPane> },
  ];

  // Return content, if exists.
  return (
    <div className='people'>
      <h1>{dataObj.title}</h1>
      <h3>{dataObj.subTitle}</h3>

      <Tab panes={panes} />
    </div>
    
  );
}; 

export default PeopleTabs;