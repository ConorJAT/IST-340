import React, { useState } from 'react';

// Import utils.
import { getData } from '../../utils/getData';

import MinorAccordian from './MinorAccordian';

import './Minors.css';

const Minors = () => {
    // Use states.
    const [loaded, setLoaded] = useState(false);
    const [dataObj, setDataObj] = useState();

    // Go get data.
    React.useEffect( () => {
        // Page was rendered; time to get data.
        getData('minors/').then( (json) => {
            setDataObj(json);
            setLoaded(true);
        });
    }, [] );

    // Return for data not loaded yet.
    if (!loaded) {
        return (
            <h1>Loading our undergrad minors...</h1>
        );
    }

    return (
        <div className='minors'>
            <h1>Our Undergrad Minor Programs</h1>
            <div className="minor-accords">
            {
                dataObj.UgMinors.map(minor => {
                    return (
                        <MinorAccordian key={minor.name} minorInfo={minor}/>
                    );
                })
            }
            </div>
        </div>
    )
};

export default Minors;