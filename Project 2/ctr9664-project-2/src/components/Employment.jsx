import React, { useState } from 'react';
import { TabPane, Tab } from 'semantic-ui-react';

// Import utils.
import { getData } from '../utils/getData';
import { formatTableData } from '../utils/formatTableData';

import EmploymentTabs from './EmploymentTabs';

const Employment = () => {
    // Use states.
    const [loaded, setLoaded] = useState(false);
    const [dataObj, setDataObj] = useState();

    // Go get data.
    React.useEffect( () => {
        // Page was rendered; time to get data.
        getData('employment/').then( (json) => {
            console.log(json);
            setDataObj(json);
            setLoaded(true);
        });
    }, [] );

    // Return for data not loaded yet.
    if (!loaded) {
        return (
            <h1>Loading our employment data...</h1>
        );
    }

    const formattedCoops = formatTableData(dataObj.coopTable);
    const formattedEmployment = formatTableData(dataObj.employmentTable);

    return (
        <>
            <EmploymentTabs baseObj={{formattedCoops, formattedEmployment}}/>
        </>
    );
};

export default Employment;