import React, { useState } from 'react';
import { TabPane, Tab } from 'semantic-ui-react';

// Import utils.
import { getData } from './../utils/getData';

// Import component.
import PeopleGroup from './PeopleGroup';

// Import CSS.
import './People.css';

const panes = [
  { menuItem: 'Faculty', render: () => <TabPane>
    <PeopleGroup title='Faculty' whichGroup={dataObj.faculty}/>
  </TabPane> },
  { menuItem: 'Staff', render: () => <TabPane>
    <PeopleGroup title='Staff' whichGroup={dataObj.staff}/>
  </TabPane> },
];

const PeopleTabs = () => {
  // Use states.
  const [loaded, setLoaded] = useState(false);
  const [dataObj, setDataObj] = useState();

  // Go get data.
  React.useEffect( () => {
    // Page was rendered; time to get data.
    getData('people/').then( (json) => {
        console.log(json);
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
    <>
      <h1>{dataObj.title}</h1>
      <h3>{dataObj.subTitle}</h3>

      <Tab panes={panes} />
    </>
    
  );
}; 

export default PeopleTabs;