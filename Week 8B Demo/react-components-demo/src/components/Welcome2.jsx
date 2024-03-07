// External Component
const Welcome2 = ({name, job, myStyle}) => {
    // No state or instantiation; Move to render
    return (
        <section className={myStyle}>
            <h1>Hello, {name}</h1>
            <p>Current Job: {job}</p>
        </section>
    );
};

export default Welcome2;