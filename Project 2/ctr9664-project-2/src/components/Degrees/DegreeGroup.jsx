// Import React tools.
import React from 'react';

// Import component.
import DegreeAccordian from './DegreeAccordian';

const DegreeGroup = ({type, degreeList}) => {
    // Create groups of degree accordians based on grad and undergrad.
    return (
        <div className='deg-group'>
            <h2>{type} Degrees</h2>
            { degreeList.map( (degree) => [
                <div key={degree.title ? degree.degreeName : 'gac'}>
                    <DegreeAccordian degree={degree}/>
                </div>
            ])}
        </div>
    );
};

export default DegreeGroup;