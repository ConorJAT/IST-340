"use strict";

let currentImgIndex;

// init() - Sets up web app upon loading/reloading.
const init = () => {
    // If a last search cookie exists, rebuild last saved search.
    if(GetCookie('ctr9664-last-search') !== null) {
        // 1.) Parse last saved data into array.
        let pathway = GetCookie('ctr9664-last-search').split(',');

        // 2.) Fetch data needed to rebuild page.
        getData().then( dataObj => {
            // 3.) Start by building the base node.
            createNode(dataObj['base'], dataObj);

            // 4.) For each term in the pathway...
            for (let i = 0; i < pathway.length; i++) {
                // 4a) Get the latest select element and set its value to the current pathway value.
                let selects = document.getElementsByClassName('select-question');
                selects[selects.length - 1].value = pathway[i];

                // 4b.) If the latest select is not an end node, build the next regular node.
                if (selects[selects.length - 1].getAttribute('end-node') !== 'true') { 
                    createNode(dataObj[pathway[i]], dataObj); 

                // 4c.) Else, build the content and form sections of the page.
                } else {
                    createEndNode(dataObj[pathway[i]])
                }
            }            
        });

    // If no cookie is present, just build the base node.
    } else {
        getData().then( dataObj => {
            createNode(dataObj['base'], dataObj);
        });
    }
};

// getData() - Asynchronous; Retrieves external data from outside file.
const getData = async () => {
    // -- CHANGE DATA STRUCTURE HERE! --
    const response = await fetch('./data/mtg-chars.json');
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

    // 2.) Create new child div, h3 and select elements.
    let divElement = document.createElement('div');
    let h3Element = document.createElement('h3');
    let selectElement = document.createElement('select');

    // 3.) Set class, text node and 'end-node' attributes.
    divElement.setAttribute('class', 'container');
    divElement.style.opacity = '0';
    h3Element.appendChild(document.createTextNode(array[0]))
    selectElement.setAttribute('class', 'select-question');
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
        // 5a.) If there is any character content displayed, remove it.
        removeContent();
        let siblingElement = selectElement.parentNode.nextElementSibling;

        // 5b.) If the value is null, remove any preceding child nodes and don't build anything.
        if (selectElement.value === 'null'){
            if (siblingElement) { removeSiblings(siblingElement); }
            return;

        // 5c.) If the node is an end node, build the end node and form.
        } else if (selectElement.getAttribute('end-node') === 'true') {
            createEndNode(jsonObj[selectElement.value]);

            let pathway = [];
            let responses = document.getElementsByClassName('select-question');

            for (let response of responses) { pathway.push(response.value); }

            console.log(pathway);
            SetCookie('ctr9664-last-search', pathway);
            return;

        // 5d.) If not an end node, remove any preceding child nodes and build another standard node.
        } else {
            if (siblingElement) { removeSiblings(siblingElement); }
            createNode(jsonObj[selectElement.value], jsonObj);
        }
    });

    // 6.) Add the select element to the div and the div to the super div container.
    divElement.appendChild(h3Element);
    divElement.appendChild(selectElement);
    content.appendChild(divElement);

    // 7.) Animate the elements fading into place.
    requestAnimationFrame(() => { fadeIn(divElement, 1, .02); });
};

// createEndNode(character) - Dynamically creates the character info display and end user form.
// character - JSON object holding all necessary character information and images.
const createEndNode = (character) => {
    // --- Create content section! ---
    // 1.) Create all necessary base elements.
    const charContent = document.getElementById('char-content');
    const charImgHolder = document.createElement('div');
    const charImg = document.createElement('img');
    const charDesc = document.createElement('div');

    // 2.) Set ID for image container div.
    charImgHolder.setAttribute('id', 'char-img-holder');

    // 3.) Build the img HTML element. Use the first image as default, always.
    currentImgIndex = 0;
    charImg.setAttribute('src', character['images'][0]);
    charImg.setAttribute('alt', character['img-alt'][0]);
    charImg.setAttribute('id', 'char-img');
    charImgHolder.appendChild(charImg);

    // 4.) If a character image array contains more than 1, build buttons to swap between images.
    if (character.images.length > 1) {
        // 4a.) Create button elements.
        const nextBtn = document.createElement('button');
        const prevBtn = document.createElement('button');

        // 4b.) Build button elements.
        nextBtn.setAttribute('id', 'next-btn');
        prevBtn.setAttribute('id', 'prev-btn');
        nextBtn.appendChild(document.createTextNode('>'));
        prevBtn.appendChild(document.createTextNode('<'));

        // 4c.) Add event listeners to both of the buttons whenever they're clicked.
        nextBtn.addEventListener('click', () => { changeImg(character.images, 1); });
        prevBtn.addEventListener('click', () => { changeImg(character.images, -1); });

        // 4d.) Add buttons to the image container div.
        charImgHolder.appendChild(nextBtn);
        charImgHolder.appendChild(prevBtn);
    }

    // 5.) Add image container to the content section.
    charContent.appendChild(charImgHolder);

    // 6.) Create new text elements to hold character text info.
    const charName = document.createElement('h3');
    const charSpecies = document.createElement('p');
    const charColor = document.createElement('p');
    const charHome = document.createElement('p');

    // 7.) Transfer data from JSON object over into elements as text nodes.
    charName.appendChild(document.createTextNode(`Your MtG Character is: ${character['name']}`));
    charSpecies.appendChild(document.createTextNode(`Species: ${character['species']}`));
    charColor.appendChild(document.createTextNode(`Color Identity: ${character['colors']}`));
    charHome.appendChild(document.createTextNode(`Home Plane: ${character['homeplane']}`));

    // 8.) Add text elements to character info container.
    charDesc.appendChild(charName);
    charDesc.appendChild(charSpecies);
    charDesc.appendChild(charColor);
    charDesc.appendChild(charHome);

    // 9.) Add text container to the content section.
    charDesc.setAttribute('id', 'char-desc');
    charContent.appendChild(charDesc);

    // 10.) Animate the character content fading into place.
    charContent.style.opacity = 0;
    requestAnimationFrame(() => { fadeIn(charContent, 1, .02); })

    // --- Create submit form section! ---
    // 1.) Create new elements that will buld the form section of the web app.
    const formSection = document.getElementById('submit-form');
    const formHeader = document.createElement('h3');
    const form = document.createElement('form');

    // 2.) Add text node to the form header.
    formHeader.appendChild(document.createTextNode('Sign Up For Our Newsletter!'))

    // 3.) Apply necessary attributes to the form element.
    form.setAttribute('action', '#');
    form.setAttribute('method', 'get');
    form.setAttribute('id', 'form');

    // 4.) Create and build each input element to be placed into form.
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
    const submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('id', 'submit-btn');
    submitBtn.setAttribute('value', 'Sign Up!');

    // 5.) Check to see if there's any localStorage data that can be loaded in.
    const storageMsg = document.createElement('p');

    if (localStorage.getItem('ctr9664-form-data')) {
        const prevFormData = localStorage.getItem('ctr9664-form-data').split(',');
       
        nameField.setAttribute('value', prevFormData[0]);
        emailField.setAttribute('value', prevFormData[1]);
        phoneField.setAttribute('value', prevFormData[2]);

        storageMsg.setAttribute('id', 'storage-msg');
        storageMsg.appendChild(document.createTextNode(prevFormData[3]));
    }

    form.setAttribute('onsubmit', 'return formErrorCheck()');

    // 6.) Append all input elements, in addition to text nodes and line breaks into the form.
    if (localStorage.getItem('ctr9664-form-data')) {
        form.appendChild(storageMsg);
    }
    
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
    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));
    form.appendChild(submitBtn);

    // 7.) Append the form header and form itself into the form section of the page.
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

// removeContent() - Removes all content currently displayed, as well as the form.
const removeContent = () => {
    const content = document.getElementById('char-content');
    const contentChildren = content.childNodes;
    for (let i = contentChildren.length - 1; i > -1; i--){
        content.removeChild(contentChildren[i]);
    }

    const form = document.getElementById('submit-form');
    const formChildren = form.childNodes;
    for (let i = formChildren.length - 1; i > -1; i--){
        form.removeChild(formChildren[i]);
    }

}

// changeImg(imgArray, changeBy) - Changes the src of the character image to another using
//                                 a passed in array of image addresses.
// imgArray - Array holding the addresses of various images for a particular character.
// changeBy - Value to increment or decrement by in the array.
const changeImg = (imgArray, changeBy) => {
    const img = document.getElementById('char-img');

    // If the increment leads the value being to high, set to index 0.
    if ((currentImgIndex + changeBy) >= imgArray.length){
        currentImgIndex = 0;

    // If the decrement leads the value being too low, set the index to the length - 1.
    } else if ((currentImgIndex + changeBy) < 0) {
        currentImgIndex = imgArray.length - 1;

    // Else, perform the operation normally.
    } else {
        currentImgIndex = currentImgIndex + changeBy;
    }

    img.setAttribute('src', imgArray[currentImgIndex])
}

// formErrorCheck() - Used for form validation. Should there be any unfilled inputs, the
//                    respective background will turn pink and prevent the form from submitting.
//                    Will also store form data to local storage once sufficient data is provided.
const formErrorCheck = () => {
    const nameField = document.getElementById('name-field');   
    const emailField = document.getElementById('email-field');   
    const phoneField = document.getElementById('phone-num');   
    let ret = true;

    if(nameField.value === '') {
        nameField.style.backgroundColor = 'pink';
        ret = false;
    } else {
        nameField.style.backgroundColor = 'white';
    }

    if(emailField.value === '') {
        emailField.style.backgroundColor = 'pink';
        ret = false;
    } else {
        emailField.style.backgroundColor = 'white';
    }

    if(phoneField.value === '') {
        phoneField.style.backgroundColor = 'pink';
        ret = false;
    } else {
        phoneField.style.backgroundColor = 'white';
    }

    if (ret) {
        const formData = [
            nameField.value, 
            emailField.value,
            phoneField.value,
            '(Form data loaded from last submission).'];
        
        localStorage.setItem('ctr9664-form-data', formData);

        console.log('User form data saved!');
    }

    return ret;
};

// Cookie Helper Code (implemented from localStorage/cookies in-class demo)
function SetCookie (name,value,maxAge,path,domain,sameSite,secure) {
    document.cookie = name + "=" + escape (value) +
    ((maxAge) ? ";max-age=" + maxAge  : "") +
    ((path) ? ";path=" + path  : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((sameSite) ? ";samesite=" + sameSite : ";samesite=strict") +
    ((secure) ? ";secure;" : ";");
}

function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal (j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
	}
	return null;
}

function DeleteCookie (name,path,domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

window.onload = init;