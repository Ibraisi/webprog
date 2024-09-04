'use strict';
/*
Reflection question 1:
In most programming languages, a complete record for each ingredient would be used, for example:

Salad: {
  price: 10,
  foundation: true,
  protein: false,
  extra: false,
  dressing: false,
  vegan: true,
  gluten: false,
  lactose: false
}

This is not the case in the inventory, which is common when writing JavaScript code.
Why don't we need to store properties with the value false in the JavaScript objects?

Your answer:
Undefined properties are treated as false in boolean contexts.
This saves memory and improves readability.
It aligns with JavaScript's dynamic nature.

*/

import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
Reflection question 2: When will the two examples above give different outputs, and why
is inherited functions, such as forEach(), not printed? Hint: read about enumerable
properties and own properties.
Answer:
The two examples will give different outputs when the object has inherited enumerable
properties. The for...in loop iterates over all enumerable properties, including
inherited ones, while Object.keys() only returns an object's own enumerable properties.
Inherited functions like forEach() aren't printed because:

They're typically non-enumerable properties.
Object.keys() only returns own properties, not inherited ones.

This difference is due to how JavaScript handles property enumeration and inheritance.
Object.keys() provides a more predictable way to iterate over an object's direct
properties, which is often preferred in modern JavaScript for clarity and avoiding
unexpected inherited properties.
*/

console.log('\n--- Assignment 1 ---------------------------------------')
/**
Assignment 1: Write a function that returns a string containing the HTML <option>
elements for a select box, that has all salad ingredients with a certain property. Example:
makeOptions(inventory, ’foundation’) should return
<option value="Pasta" key="Pasta"> Pasta, 10 kr</option>
<option value="Sallad" key="Sallad"> Sallad, 10 kr</option> ...
Hint: Use the functions Array.prototype.filter(), Array.prototype.map() and
Array.prototype.reduce().
Note: The key attribute is not standard HTML. It is needed by React for tracking changes
in the DOM.
 */
function makeOptions(inv, prop) {
    return Object.keys(inv)
        .filter(name => inv[name][prop])
        .map(name => `<option value="${name}" key="${name}">${name}, ${inv[name].price} kr</option>`)
        .reduce((acc, curr) => acc + curr + '\n', '');

}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
/**
 We need a representation for a salad. Create a JavaScript class named Salad for that. You
need to store the selected foundation, protein, extras, and dressing. Later on, salad
objects will be passed to different components in the web app and to avoid having to pass
along the inventory to all components, the salad object should itself also store copies of
the properties of the ingredients in the salad. Use one object as a dictionary to store the
selected ingredients, see the printout bellow.
Assignment 2: Create a Salad class. You may use the ECMAScript 2015 class syntax,
or the backwards compatible constructor function for this and the remaining assignments
(except in assignment 3).
 */

class Salad {
    constructor(salad) {
        if(salad instanceof Salad) {
            this.ingredients = {...salad.ingredients};
        } else {
        this.ingredients = {};
    }
}

    add(name, ingredient) {
        this.ingredients[name] = ingredient;
        return this;
    }

    remove(name) {
        delete this.ingredients[name];
        return this;
    }
    /**
Assignment 4b: Add a static function, Salad.parse(json) that parse a string and return a
Salad object, or an array of Salad objects. The argument must be the JSON representation
of a singel salad, or an array of salads
     */
    static parse(json) {
        if (Array.isArray(json)) {
            return json.map(salad => new Salad(salad));
        } else {
            return new Salad(JSON.parse(json));
        }
    }
}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');


console.log('\n--- Assignment 3 ---------------------------------------')
Salad.prototype.getPrice = function() {
    return Object.values(this.ingredients).reduce((acc, curr) => acc + curr.price, 0);
}
Salad.prototype.count = function(prop){
    return Object.values(this.ingredients).filter(ingredient => ingredient[prop]).length;
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
 // En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
/**
 Reflection question 3: How are classes and inherited properties represented in JavaScript?
Let’s explore this by checking some types. What is the type and value of: Salad,
Salad.prototype, Salad.prototype.prototype, myCaesarSalad and myCaesarSalad.prototype?
Hint: console.log(’typeof Salad: ’ + typeof Salad);
What is the difference between an object’s prototype chain and having a prototype
property? Which objects have a prototype property? How do you get the next object in
the prototype chain? Also try:
console.log('check 1: ' +
(Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' +
(Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' +
(Object.prototype === Object.getPrototypeOf(Salad.prototype)));

Answer: # JavaScript Class and Inheritance Representation

1. **Classes**: Represented as constructor functions (e.g., `Salad`).
   - `typeof Salad` is 'function'

2. **Prototype Objects**:
   - `Salad.prototype` is an object containing shared methods/properties
   - Instances (e.g., `myCaesarSalad`) don't have a `prototype` property

3. **Prototype Chain**:
   - Different from having a `prototype` property
   - Accessed via `Object.getPrototypeOf()` or `__proto__`
   - Sequence: Instance -> Constructor.prototype -> Object.prototype -> null

4. **Inheritance**:
   - Instances inherit from their constructor's prototype
   - `Salad.prototype === Object.getPrototypeOf(myCaesarSalad)` is true

5. **Object Creation**:
   - Constructor functions have a `prototype` property
   - Instances have `__proto__` linking to their constructor's prototype

 */
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
/*
let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
*/
console.log('\n--- Assignment 6 ---------------------------------------')
/*
console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
*/

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
