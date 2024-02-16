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
    let content = document.getElementById('questions');

    // 2.) Create new child div and select elements.
    let divElement = document.createElement('div');
    let h3Element = document.createElement('h3');
    let selectElement = document.createElement('select');

    // 3.) Set class and 'end-node' attributes.
    divElement.setAttribute('class', 'container');
    divElement.style.opacity = '0';
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
            createEndNode(jsonObj[selectElement.value]);
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
    requestAnimationFrame(() => { fadeIn(divElement, 1, .02); });
};

const createEndNode = (character) => {
    // Create content section!
    const charContent = document.getElementById('char-content');
    const charImg = document.createElement('img');
    const charDesc = document.createElement('div');

    charImg.setAttribute('src', character['images'][0]);
    charImg.setAttribute('alt', character['img-alt'][0]);
    charImg.setAttribute('id', 'char-img');
    charContent.appendChild(charImg);


    const charName = document.createElement('h3');
    const charSpecies = document.createElement('p');
    const charColor = document.createElement('p');
    const charHome = document.createElement('p');

    charName.appendChild(document.createTextNode(`Your MtG Character is: ${character['name']}`));
    charSpecies.appendChild(document.createTextNode(`Species: ${character['species']}`));
    charColor.appendChild(document.createTextNode(`Color Identity: ${character['colors']}`));
    charHome.appendChild(document.createTextNode(`Home Plane: ${character['homeplane']}`));

    charDesc.appendChild(charName);
    charDesc.appendChild(charSpecies);
    charDesc.appendChild(charColor);
    charDesc.appendChild(charHome);

    charDesc.setAttribute('id', 'char-desc');
    charContent.appendChild(charDesc);

    // Create submit form section!
    const formSection = document.getElementById('submit-form');
    const formHeader = document.createElement('h3');
    const form = document.createElement('form');

    formHeader.appendChild(document.createTextNode('Sign Up For Our Newsletter!'))

    form.setAttribute('action', '');
    form.setAttribute('method', 'get');
    form.setAttribute('id', 'form');

    const nameField = document.createElement('input');
    nameField.setAttribute('type', 'text');
    nameField.setAttribute('name', 'name');
    nameField.setAttribute('id', 'name-field');
    nameField.setAttribute('placeholder', 'Enter your name...');
    const emailField = document.createElement('input');
    emailField.setAttribute('type', 'text');
    emailField.setAttribute('name', 'email');
    emailField.setAttribute('id', 'email-field');
    emailField.setAttribute('placeholder', 'Enter your email...');
    const phoneField = document.createElement('input');
    phoneField.setAttribute('type', 'text');
    phoneField.setAttribute('name', 'phone');
    phoneField.setAttribute('id', 'phone-num');
    phoneField.setAttribute('placeholder', 'Enter your phone number...');

    form.appendChild(document.createTextNode('Name: '));
    form.appendChild(nameField);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Email: '));
    form.appendChild(emailField);
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createTextNode('Phone: '));
    form.appendChild(phoneField);

    formSection.appendChild(formHeader);
    formSection.appendChild(form);
};

// fadeIn(element, end, delta) - As elements are being added onto the page, animate
//                               them fading onto the page.
// element - Element being animated.
// end - End opacity element is going to be.
// delta - How much is the element fading per frame.
const fadeIn = (element, end, delta) => {
    let opacity = parseFloat(element.style.opacity);
	if (opacity < end){
		element.style.opacity = `${opacity + delta}`;
		requestAnimationFrame(() => { fadeIn(element, end, delta); });
	}
};

// removeSiblings(element) - Recursively removes any and all siblings in front of
//                           the passed in parameter.
// element - Element to remove all preceding siblings. 
const removeSiblings = (element) => {
    if (element.nextElementSibling){
        removeSiblings(element.nextElementSibling);
    }

    document.getElementById('questions').removeChild(element);
};

init();