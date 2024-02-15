// init() - Sets up web app upon loading/reloading.
const init = () => {
    getData().then( dataObj => {
        createNode(dataObj['base'], dataObj);
    });
};

// getData() - Asynchronous; Retrieves external data from outside file.
const getData = async () => {
    const response = await fetch('./data/char-info.json');
    const dataObj = await response.json();
    return dataObj;
};

// createNode(array, jsonObj) - Dynamically creates div elements with select elements
//                              based on data passed in from the JSON object.
// array - Current array used to populate 'this' select element.
// jsonObj - JSON object that holds all the data.
const createNode = (array, jsonObj) => {
    // 1.) Get superior div container (holds all select divs).
    let content = document.getElementById('content');

    // 2.) Create new child div and select elements.
    let divElement = document.createElement('div');
    let h3Element = document.createElement('h3');
    let selectElement = document.createElement('select');

    // 3.) Set class and 'end-node' attributes.
    divElement.setAttribute('class', 'container');
    divElement.style.left = '-400px';
    h3Element.appendChild(document.createTextNode(array[0]))
    selectElement.setAttribute('end-node', array[1]);

    // 4.) Populate select element with option elements (data from current array).
    for (let i = 2; i < array.length; i += 2){
        let selectOption = document.createElement('option');
        selectOption.setAttribute('value', array[i+1]);
        selectOption.appendChild(document.createTextNode(array[i]));

        selectElement.appendChild(selectOption);
    }

    // 5.) Add an event listener onto the select element for any changes in value.
    selectElement.addEventListener('change', () => {
        let siblingElement = selectElement.parentNode.nextElementSibling;

        // 5a.) If the value is null, remove any preceding child nodes and don't build anything.
        if (selectElement.value === 'null'){
            if (siblingElement) { removeSiblings(siblingElement); }
            return;

        // 5b.) If the node is an end node, build the end node and form.
        } else if (selectElement.getAttribute('end-node') === 'true') {
            console.log("Creating end node.")
            return;

        // 5c.) If not an end node, remove any preceding child nodes and build another standard node.
        } else {
            if (siblingElement) { removeSiblings(siblingElement); }
            createNode(jsonObj[selectElement.value], jsonObj);
        }
    });

    // 6.) Add the select element to the div and the div to the super div container.
    divElement.appendChild(h3Element);
    divElement.appendChild(selectElement);
    content.appendChild(divElement);

    // 7.) Animate the elements sliding into place.
    requestAnimationFrame(() => { slideIn(divElement, 0, 8); });
};

const createEndNode = () => {

};

// slideIn(element, end, delta) - As elements are being added onto the page, animate
//                                them sliding into place.
// element - Element being animated.
// end - End location where element is going to be.
// delta - How much is the element moving per frame.
const slideIn = (element, end, delta) => {
    let pos = parseInt(element.style.left);
	if (pos < end){
		element.style.left = pos + delta + 'px';
		requestAnimationFrame(() => { slideIn(element, end, delta); });
	}
};

// removeSiblings(element) - Recursively removes any and all siblings in front of
//                           the passed in parameter.
// element - Element to remove all preceding siblings. 
const removeSiblings = async (element) => {
    if (element.nextElementSibling){
        removeSiblings(element.nextElementSibling);
    }

    document.getElementById('content').removeChild(element);
};

init();