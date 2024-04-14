// Import React tools.
import React, { useState } from 'react';

// Import components.
import DegreeGroup from './DegreeGroup';

// Import utils.
import { getData } from '../../utils/getData';

// Import CSS.
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

    // Return for when data is loaded.
    return (
        <div className='degrees'>
            <h1>Our Degrees</h1>
            <DegreeGroup type='Undergraduate' degreeList={dataObj.undergraduate}/>
            <DegreeGroup type='Graduate' degreeList={dataObj.graduate}/>
        </div>
    )
};

export default Degrees;