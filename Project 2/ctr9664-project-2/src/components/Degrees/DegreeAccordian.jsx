import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const DegreeAccordian = ({degree}) => {
  if (degree.title) {
    let cString = '';
    for (let i = 0; i < degree.concentrations.length; i++){
        if (i === degree.concentrations.length - 1) { cString += degree.concentrations[i]; }
        else { cString += degree.concentrations[i] + ', '; }
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    {degree.title} - {degree.degreeName ? degree.degreeName.toUpperCase() : "GAC"}
                </AccordionSummary>
                <AccordionDetails>
                    {degree.description}
                    {<br/>}{<br/>}
                    Concentrations: {cString}
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

  return (
    <div>
        <Accordion>
            <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            >
                Graduate Advanced Certificates
            </AccordionSummary>
            <AccordionDetails>
                Availible Certificates: {dString}
            </AccordionDetails>
        </Accordion>
    </div>
  );
}

export default DegreeAccordian;