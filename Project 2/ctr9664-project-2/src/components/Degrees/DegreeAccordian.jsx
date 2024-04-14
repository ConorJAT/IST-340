// Import React tools.
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const DegreeAccordian = ({degree}) => {
    // Return if current is an actual degree.
    if (degree.title) {
        return (
            <div>
                <Accordion>
                    <AccordionSummary 
                    expandIcon={<ArrowDownwardIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                        <h4 className='deg-name'>{degree.title} - {degree.degreeName ? degree.degreeName.toUpperCase() : "GAC"}</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p className='deg-content'>{degree.description}</p>
                        <br/>
                        <div className="deg-section">
                            <p className='deg-content'>Concentrations: </p>
                            <div className="deg-concents">
                                {degree.concentrations.map((c) => { 
                                    return (
                                        <span className="concent">{c}</span>
                                    );
                                })}
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

    let dString = '';
    for (let i = 0; i < degree.availableCertificates.length; i++){
        if (i === degree.availableCertificates.length - 1) { dString += degree.availableCertificates[i]; }
        else { dString += degree.availableCertificates[i] + ', '; }
    }

    // Return for advanced certificates.
    return (
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ArrowDownwardIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <h4 className='deg-name'>Graduate Advanced Certificates</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="deg-section">
                        <p className='deg-content'>Availible Certificates: </p>
                        <div className="deg-concents">
                            {degree.availableCertificates.map((c) => { 
                                return (
                                    <span className="concent">{c}</span>
                                );
                            })}
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default DegreeAccordian;