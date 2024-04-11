import React from 'react';

import DegreeAccordian from './DegreeAccordian';

const DegreeGroup = ({type, degreeList}) => {
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