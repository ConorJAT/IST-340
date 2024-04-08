import React, { useState } from 'react';

// Import utils.
import { getData } from '../../utils/getData';

import MinorAccordian from './MinorAccordian';

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
        <>
            <h1>Our Undergrad Minor Programs</h1>
            {
                dataObj.UgMinors.map(minor => {
                    return (
                        <MinorAccordian minorInfo={minor}/>
                    );
                })
            }
        </>
    )
};

export default Minors;