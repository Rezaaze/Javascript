'use strict'
// picking up the grid element for appending the tiles in it
const grid = document.getElementById('grid');


// a function for creating the tiles
function createTile(count, k) {
    const newDiv = document.createElement('DIV');
    newDiv.classList.add('grid-item');
    newDiv.style.order = count;
    const h1 = document.createElement('H3');
    h1.innerText = `${k.species}`;
    const newImg = document.createElement('IMG');
    newImg.src = "./images/" + k.species.toLowerCase() + ".png";
    const newP = document.createElement('P');
    newP.innerText = `${k.fact}`
    newDiv.appendChild(h1)
    newDiv.appendChild(newImg)
    newDiv.appendChild(newP)
    grid.appendChild(newDiv)
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
//comparing all Dinosaurs with the object manualy entered by height and return how many dinos are smaller 

const comb1 = function (obj, arr) {
    let count = 0;

    for (let dino of arr) {
        const heightInCm = dino.height * 2.54
        if (obj.height > heightInCm) {
            count++
        }
    }

    return `You are taller than ${count} Dinosaurs listed here`
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
//comparing all Dinosaurs with the object manualy entered and return how many dinos are lighter 
const comb2 = function (obj, arr) {
    let count = 0;

    for (let dino of arr) {
        const weightInKg = dino.weight * 0.453592;
        if (obj.weight > weightInKg) {
            count++
        }
    }

    return `You are heavier than ${count} Dinosaurs listed here`
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
//comparing all Dinosaurs with the object manualy entered and return how many dinos have the same diet 
const comb3 = function (obj, arr) {
    let count = 0;

    for (let dino of arr) {

        if (obj.diet === dino.diet) {
            count++
        }
    }

    return `You have the same diet like ${count} Dinosaurs listed here`
}


// Create Dino Constructor
const Dino = function (species, weight, height, diet, where, when, fact) {

    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;

}

//binding the methods to the class prototype
Dino.prototype.compareHeight = comb1
Dino.prototype.compareWeight = comb2
Dino.prototype.compareDiet = comb3

console.log(Dino.prototype)

// Create Dino Objects
const dinoArray = [];
// creating 8 objects without values but with keys
for (let i = 0; i < 8; i++) {

    dinoArray.push(new Dino())
}

//fetching the data from the json file
fetch("./dino.json").then(response => {
    return response.json();
})
    .then(jsondata => {
        // assigning the values to the keys
        for (let i = 0; i < jsondata.Dinos.length; i++) {
            Object.assign(dinoArray[i], jsondata.Dinos[i])
        }




    })


// Create Human Object
const human = {}
// Use IIFE to get human data from form

const mag = function outter() {
    let count = 0
    return function inner() {
        count++
        console.log(count)
    }
}

// IMPORTANT !!! I dont know why and where I should use an IFFE i do understand that IFFEs are functions and they are invoked immediatley after 
//creating them and they are helpful if you want to change variables only the way the programmers want but i dont see the need for it right now
// why i should use it in this context please explain




// creating an eventlistener to the btn 
document.getElementById('btn').addEventListener('click', e => {

    //if btn is clicked form will disappear and the inputs will be saved in variables
    document.getElementById('dino-compare').style.display = "none"
    const species = document.getElementById('name').value;
    const feet = document.getElementById('feet').value;
    const inches = document.getElementById('inches').value;

    // calculate the height in Cm
    const height = Math.round((feet * 30.48) + (inches * 2.54));

    //calculate the weight in Kg
    const weight = Math.round(0.45359 * document.getElementById('weight').value);
    const diet = document.getElementById('diet').value.toLowerCase();

    //assigning the values to the human object
    Object.assign(human, { species, height, weight, diet })
    human.fact = dinoArray[0].compareHeight(human, dinoArray) + ' \n ' + dinoArray[0].compareDiet(human, dinoArray) + '\n' + dinoArray[0].compareWeight(human, dinoArray)




    // creating the tiles and giving them a order the human tile has a solid order number 
    let count = 0;
    for (let k of dinoArray) {
        if (count === 4) {
            count++;
        }
        createTile(count, k)
        count++
    }
    //creating the human tile 
    createTile(4, human)

})


console.log(human)











