import React from 'react';

import DegreeAccordian from './DegreeAccordian';

const DegreeGroup = ({type, degreeList}) => {
    return (
        <>
            <h2>{type} Degrees</h2>
            <div>
                { degreeList.map( (degree) => [
                    <div key={degree.title ? degree.degreeName : 'gac'}>
                        <DegreeAccordian degree={degree}/>
                    </div>
                ])}
            </div>
        </>
    );
};

export default DegreeGroup;