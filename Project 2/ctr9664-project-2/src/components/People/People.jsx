// Import React tools.
import React, { useState } from 'react';

// Import utils.
import { getData } from '../../utils/getData';

// Import CSS.
import './People.css';

const People = () => {
    // Setup States.
    const [loaded, setLoaded] = useState(false);
    const [dataObj, setDataObj] = useState();

    // Go get data.
    React.useEffect( () => {
        // Page was rendered; time to get data.
        getData('people/').then( (json) => {
            console.log(json);
            setDataObj(json);
            setLoaded(true);
        });
    }, [] );

    if (!loaded) {
        return (
            <h1>Loading People...</h1>
        );
    }
    
    return (
        <>
            <h1>{dataObj.title}</h1>
            <h3>{dataObj.subTitle}</h3>

            <h3>Faculty</h3>
            <div className="peopleList">
                {dataObj.faculty.map( (person) => [
                    <div key={person.email} className='peopleListItem'>
                        <h3>{person.name}</h3>
                        <img src={person.imagePath}/>
                    </div>
                ])}
            </div>

            <h3>Staff</h3>
            <div className="peopleList">
                {dataObj.staff.map( (person) => [
                    <div key={person.email} className='peopleListItem'>
                        <h3>{person.name}</h3>
                        <img src={person.imagePath}/>
                    </div>
                ])}
            </div>
        </>
    );
};

export default People;