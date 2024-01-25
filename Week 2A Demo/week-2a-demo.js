'use strict';

function addIt(){
    let sum = 0;
    let length = arguments.length;

    for (let i = 0; i<length; i++) { sum += arguments[i]; }
    return sum;
}

console.log(addIt(4, 5, 6));
console.log(addIt(1, 2, 3, '4'));