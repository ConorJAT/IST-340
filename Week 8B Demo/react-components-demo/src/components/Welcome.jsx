// props = Catch all object for any parameters.
const Welcome = (props) => {
    return (
        <div>
            <h1>Hello, {props.name}</h1>
            <p>Age: {props.age}</p>
        </div>
    );
};  

export default Welcome;