const init = () => {
    getData().then( dataObj => {
        console.log(dataObj);

        createNode(dataObj['base'], dataObj);
    });
};

const getData = async () => {
    const response = await fetch('./data/char-info.json');
    const dataObj = await response.json();
    return dataObj;
};

const createNode = (array, jsonObj) => {
    let content = document.getElementById('content');

    let divElement = document.createElement('div');
    let selectElement = document.createElement('select');

    divElement.setAttribute('class', 'container');
    selectElement.setAttribute('end-node', array[0]);

    for (let i = 1; i < array.length; i += 2){
        let selectOption = document.createElement('option');
        selectOption.setAttribute('value', array[i+1]);
        selectOption.appendChild(document.createTextNode(array[i]));

        selectElement.appendChild(selectOption);
    }

    selectElement.addEventListener('change', () => {
        if (selectElement.value === 'null'){
            return;
        } else if (selectElement.getAttribute('end-node') === 'true') {
            console.log("Creating end node.")
            return;
        } else {
            createNode(jsonObj[selectElement.value], jsonObj);
        }
    });

    divElement.appendChild(selectElement);
    content.appendChild(divElement);
};

const createEndNode = () => {

};

init();