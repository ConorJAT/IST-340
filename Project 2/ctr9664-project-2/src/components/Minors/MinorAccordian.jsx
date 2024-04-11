import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import CourseModal from './CourseModal';

const MinorAccordian = ({minorInfo}) => {
       
    if (minorInfo.note) {
        return (
            <div>
                <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                        <h4 className='minor-name'>{minorInfo.title}</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className="minor-ctnt">Minor Code: {minorInfo.name}</p>
                        <br/>
                        <p className="minor-ctnt">{minorInfo.description}</p>
                        <br/>
                        <div className='minor-section'>
                            <p className="minor-ctnt">Required Classes: </p>
                            <div className="minor-courses">
                                {minorInfo.courses.map(course => {
                                    return(<div className="course"><CourseModal course={course}/></div>);
                                })}
                            </div>
                        </div>
                        <br/>
                        <p className="minor-ctnt">(Note: {minorInfo.note})</p>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

    return (
        <div>
            <Accordion>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <h4 className='minor-name'>{minorInfo.title}</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <p className="minor-ctnt">Minor Code: {minorInfo.name}</p>
                    <br/>
                    <p className="minor-ctnt">{minorInfo.description}</p>
                    <br/>
                    <div className='minor-section'>
                        <p className="minor-ctnt">Required Classes: </p>
                        <div className="minor-courses">
                            {minorInfo.courses.map(course => {
                                return(<div className="course"><CourseModal course={course}/></div>);
                            })}
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default MinorAccordian;