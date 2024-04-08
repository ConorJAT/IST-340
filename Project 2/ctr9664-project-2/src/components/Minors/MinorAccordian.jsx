import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import CourseModal from './CourseModal';

const MinorAccordian = ({minorInfo}) => {
       
    if (minorInfo.note) {
        return (
            <div>
                <Accordion>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                        {minorInfo.title}
                    </AccordionSummary>
                    <AccordionDetails>
                        Minor Code - {minorInfo.name}
                        <br/><br/>
                        About - {minorInfo.description}
                        <br/><br/>
                        <div>
                            {minorInfo.courses.map(course => {
                                return(<CourseModal course={course}/>);
                            })}
                        </div>
                        <br/><br/>
                        Note - {minorInfo.note}
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

    return (
        <div>
            <Accordion>
            <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    {minorInfo.title}
                </AccordionSummary>
                <AccordionDetails>
                    Minor Code - {minorInfo.name}
                    <br/><br/>
                    About - {minorInfo.description}
                    <br/><br/>
                    <div>
                        {minorInfo.courses.map(course => {
                            return(<CourseModal course={course}/>);
                        })}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default MinorAccordian;