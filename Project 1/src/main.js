const init = () => {
    getData().then( dataObj => {
        console.log(dataObj);
    });
};

const getData = async () => {
    const response = await fetch('./data/char-info.json');
    const dataObj = await response.json();
    return dataObj;
};

const createNode = (array) => {

};

const createEndNode = () => {

};

init();