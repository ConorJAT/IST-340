// Import React tools.
import React from 'react';

// Import component.
import PeopleModal from './PeopleModel';

const PeopleGroup = ({title, whichGroup}) => {
    // Return a displayed group of individuals (staff or faculty).
    return (
        <>
            <h2>{title}</h2>
            <div className="peopleList">
                {whichGroup.map( (person) => [
                    <div key={person.username} className='peopleListItem'>
                        <img src={person.imagePath}/>
                        {/*<h3>{person.name}</h3>*/}
                        <PeopleModal person={person}/>
                    </div>
                ])}
            </div>
        </>
    );
};

export default PeopleGroup;