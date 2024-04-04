import React from 'react';
import { TabPane, Tab } from 'semantic-ui-react';

import EmploymentPagTable from './EmploymentPagTable';

const EmploymentTabs = ({baseObj}) => {
    // Set up layout for displayed content.
    const panes = [
        { menuItem: 'Co-op Table', render: () => <TabPane>
            <EmploymentPagTable employObj={baseObj.formattedCoops}/>
            </TabPane> },
        { menuItem: 'Employment Table', render: () => <TabPane>
            <EmploymentPagTable employObj={baseObj.formattedEmployment}/>
            </TabPane> },
    ];

    return ( <Tab panes={panes}/> );
}

export default EmploymentTabs;