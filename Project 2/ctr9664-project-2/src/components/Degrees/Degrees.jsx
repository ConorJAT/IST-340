import React, { useState } from 'react';

// Import utils.
import { getData } from '../../utils/getData';
import DegreeGroup from './DegreeGroup';

import './Degrees.css';

const Degrees = () => {
    // Use states.
    const [loaded, setLoaded] = useState(false);
    const [dataObj, setDataObj] = useState();

    // Go get data.
    React.useEffect( () => {
        // Page was rendered; time to get data.
        getData('degrees/').then( (json) => {
            setDataObj(json);
            setLoaded(true);
        });
    }, [] );

    // Return for data not loaded yet.
    if (!loaded) {
        return (
            <h1>Loading our degrees...</h1>
        );
    }

    return (
        <div className='degrees'>
            <h1>Our Degrees</h1>
            <DegreeGroup type='Undergraduate' degreeList={dataObj.undergraduate}/>
            <DegreeGroup type='Graduate' degreeList={dataObj.graduate}/>
        </div>
    )
};

export default Degrees;