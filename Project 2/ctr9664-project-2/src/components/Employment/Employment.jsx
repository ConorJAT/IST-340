import React, { useState } from 'react';

// Import utils.
import { getData } from '../../utils/getData';
import { formatTableData } from '../../utils/formatTableData';

import EmploymentTabs from './EmploymentTabs';

import './Employment.css';

const Employment = () => {
    // Use states.
    const [loaded, setLoaded] = useState(false);
    const [dataObj, setDataObj] = useState();

    // Go get data.
    React.useEffect( () => {
        // Page was rendered; time to get data.
        getData('employment/').then( (json) => {
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
        <div className='employment'>
            <h1>Employment Information</h1>
            <h3>{dataObj.introduction.title}</h3>

            <div className='emp-types'>
                {dataObj.introduction.content.map((section) => {
                    return (
                        <div className='type'>
                            <h2>{section.title}</h2>
                            <p>{section.description}</p>
                        </div>
                    );
                })}
            </div>

            <h2>{dataObj.degreeStatistics.title}</h2>
            <div className='emp-stats'>
                {dataObj.degreeStatistics.statistics.map((stat) => {
                    return (
                        <div className='stat'>
                            <h3>{stat.value}</h3>
                            <p>{stat.description}</p>
                        </div>
                    );
                })}
            </div>

            <h2>{dataObj.employers.title}</h2>
            <div className='emp-employers'>
                {dataObj.employers.employerNames.map((name) => {
                    return (
                        // <div>
                        //     <p>{name}</p>
                        // </div>
                        <span className='employer'>{name}</span>
                    );
                })}
            </div>

            <h2>{dataObj.careers.title}</h2>
            <div className='emp-careers'>
                {dataObj.careers.careerNames.map((name) => {
                    return (
                        // <div>
                        //     <p>{name}</p>
                        // </div>
                        <span className='career'>{name}</span>
                    );
                })}
            </div>

            <EmploymentTabs baseObj={{formattedCoops, formattedEmployment}}/>
        </div>
    );
};

export default Employment;