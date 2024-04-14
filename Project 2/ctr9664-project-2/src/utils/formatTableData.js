let columns = [];

// formatTableData(employObj) - Formats employer data to be displayed into a table.
// employObj: Employment object containing information to format.
export const formatTableData = (employObj) => {
    // Coop table formatting.
    if (employObj.title === "Co-op Table") {
        let coopRows = [];

        const createCoopData = (employer, degree, city, term) => { return {employer, degree, city, term}; }

        employObj.coopInformation.forEach(job => { coopRows.push(createCoopData(job.employer, job.degree, job.city, job.term)); });

        columns = [
            {id: 'employer', label: 'Employer Name', align: 'left'},
            {id: 'degree', label: 'Degree', align: 'right'},
            {id: 'city', label: 'City', align: 'right'},
            {id: 'term', label: 'Term', align: 'right'}
        ];

        return {columns, rows: coopRows};
    
    // Career table formatting.
    } else {
        let careerRows = [];

        const createEmploymentData = (employer, degree, city, title, startDate) => { return {employer, degree, city, title, startDate}; }

        employObj.professionalEmploymentInformation.forEach(job => { careerRows.push(createEmploymentData(job.employer, job.degree, job.city, job.title, job.startDate)); });

        columns = [
            {id: 'employer', label: 'Employer Name', align: 'left'},
            {id: 'degree', label: 'Degree', align: 'right'},
            {id: 'city', label: 'City', align: 'right'},
            {id: 'title', label: 'Title', align: 'right'},
            {id: 'startDate', label: 'Start Date', align: 'right'}
        ];

        return {columns, rows: careerRows};
    }
};