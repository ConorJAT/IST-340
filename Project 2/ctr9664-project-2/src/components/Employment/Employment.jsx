// Import React tools.
import React, { useState } from 'react';

// Import component.
import EmploymentTabs from './EmploymentTabs';

// Import utils.
import { getData } from '../../utils/getData';
import { formatTableData } from '../../utils/formatTableData';

// Import CSS.
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

    // Format all employment data.
    const formattedCoops = formatTableData(dataObj.coopTable);
    const formattedEmployment = formatTableData(dataObj.employmentTable);

    // Return for when data is loaded.
    return (
        <div className='employment'>
            <h1 className='emp-header'>Employment Information</h1>
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

            <h2 className='emp-header'>{dataObj.degreeStatistics.title}</h2>
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

            <h2 className='emp-header'>{dataObj.employers.title}</h2>
            <div className='emp-employers'>
                {dataObj.employers.employerNames.map((name) => {
                    return (

                        <span className='employer'>{name}</span>
                    );
                })}
            </div>

            <h2 className='emp-header'>{dataObj.careers.title}</h2>
            <div className='emp-careers'>
                {dataObj.careers.careerNames.map((name) => {
                    return (
                        <span className='career'>{name}</span>
                    );
                })}
            </div>

            <div className="emp-data">
                <h2 className='emp-header'>Table of Employers</h2>
                <EmploymentTabs baseObj={{formattedCoops, formattedEmployment}}/>
            </div>
        </div>
    );
};

export default Employment;