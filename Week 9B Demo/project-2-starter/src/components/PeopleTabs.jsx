import React from 'react';
import { TabPane, Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Faculty', render: () => <TabPane>Tab 1 Content</TabPane> },
  { menuItem: 'Staff', render: () => <TabPane>Tab 2 Content</TabPane> },
]

const PeopleTabs = () => <Tab panes={panes} />

export default PeopleTabs;