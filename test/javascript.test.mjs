// Need to use .mjs extension to tell Node that this is a JavaScript module
import { expect } from 'chai';

describe('JavaScript tests', function() {
    it('test operators', function() {
        // !! (i.e. ! Operator twice) Coerces Object to boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be
        // false. Anything else, true.
        let myFalsey = undefined;
        expect(myFalsey).to.not.be.an('boolean')
        myFalsey = !!myFalsey
        expect(myFalsey).to.be.a('boolean')

        let myTruthy = undefined;
        expect(myTruthy).to.not.be.an('boolean')
        myTruthy = !!myTruthy
        expect(myTruthy).to.be.a('boolean')

        // Spread operator (three dots) is useful syntax for combining arrays into a single one
        var colors = ['red', 'green', 'blue'];
        var refColors = [...colors, 'yellow'];
        expect(refColors).to.eql(['red', 'green', 'blue', 'yellow']);

        // Rest operator (also three dots) is a way to support variable inputs
        function sum(first, ...others ) {
            for (var i=0; i < others.length; i++) {
                first += others[i];
            }
            return first;
        }
        expect(sum(1, 2,)).to.equal(3);
        expect(sum(1, 2, 3)).to.equal(6);
    });

    it('test objects', function() {
        // Check if a JavaScript object has a field
        let myObject = { name: "Hasan", surname: "Zaidi" }
        let hasProperty = myObject.hasOwnProperty("myField")
        expect(hasProperty).to.be.false;

        // Removes a property in an object
        let objectWithId = {id: 1, visibility: true}
        delete objectWithId.visibility;
        expect(objectWithId).to.eql({id: 1});

        // Loop through properties in object
        for (var key in myObject) {
            if (key === 'name') {
                expect(myObject[key]).to.equal("Hasan");
            }
        }

        const {name, surname} = myObject;
        expect(name).to.equal("Hasan");
        expect(surname).to.equal("Zaidi");

        // Can compare objects using `JSON.stringify` (although this won't work all the time as property order is not guaranteed):
        let myObject2 = { name: "Hasan", surname: "Zaidi" }
        let str1 = JSON.stringify(myObject)
        let str2 = JSON.stringify(myObject2)
        expect(str1).to.equal(str2);
    });

    it('test arrays', function() {
        let arr = [1, 4, 9]

        // Get array length
        let len = arr.length
        expect(len).to.equal(3);

        // Push to add value to end of array
        arr.push(16);
        len = arr.length
        expect(len).to.equal(4);

        // Deleting an array sets it to undefined. Length is unchanged
        delete arr[2]
        len = arr.length
        expect(len).to.equal(4);
        expect(arr[2]).to.be.undefined;

        // Deletes one value starting from position 2. Similar to delete but position 2 is removed and length is now 3.
        arr.splice(2, 1);
        len = arr.length
        expect(len).to.equal(3);
        expect(arr[2]).to.equal(16);

        // Map function which returns an array of "id"
        let myObjects = [{id: 7, visibility: true}, {id: 3, visibility: true}]
        let ids = myObjects.map(function (item) {
          return item.id;
        });
        expect(ids).to.eql([7, 3]);

        // Reduce functions which concatenates a list of "id" (separated by commas)
        let allIds = myObjects.reduce(function(previousValue, currentValue) {
          return currentValue.id + ", " + previousValue;
        }, '');
        expect(allIds).to.equal("3, 7, ");

        // Simple loop over an array
        let sum = 0
        for (var value of arr) {
          sum = sum + value;
        }
        expect(sum).to.equal(21);

        // Destructure arrays as well
        let medals = ['gold', 'silver', 'bronze']
        let [first, second, third] = medals;
        expect(first).to.equal("gold");
    });

    it('test arrow notation', function() {
        // Arrow notation - Example 1 (simplifying function call)
        // Old way
        function funcName(params) {
            return params + 2;
        }
        expect(funcName(3)).to.equal(5);

        // New way
        var funcNameNew = (params) => params + 2
        expect(funcNameNew(3)).to.equal(5);

        // Arrow notation - Example 2 (iterating through a list)
        var materials = ['Hydrogen', 'Helium', 'Lithium'];

        // Old way
        let lengths = materials.map(function(material) {
            return material.length;
        });
        expect(lengths).to.eql([8, 6, 7]);

        // New way
        let lengthsNew = materials.map((material) => {
            return material.length;
        });
        expect(lengthsNew).to.eql([8, 6, 7]);

        // Arrow notation - Example 3 (filtering a list)
        // Old way
        let myArr = [1, 2, 3, 4]
        let evenArray = myArr.filter(function (value) {return value % 2 === 0});
        expect(evenArray).to.eql([2, 4]);

        // New way
        let evenArrayNew = myArr.filter(value => value % 2 === 0);
        expect(evenArrayNew).to.eql([2, 4]);
    });

    it('test strings', function() {
        // Can interpolate Strings using back ticks instead of quotation marks
        let videoId = 123;
        let url = `https://www.youtube.com/embed/${videoId}`;
        expect(url).to.equal("https://www.youtube.com/embed/123");
    });

    it('test prototypical inheritance', function() {
        function F() {
            this.a = 1;
            this.b = 2;
        }
        var o = Object.create(new F());

        // Every object has this prototype property which points to another object which should be delegated responsibility in case the property we’re looking for is not found on the current one
        // Unlike other languages, the "parent" object is passed as a reference so we can access parent functions even if they were created after the child object
        F.prototype.b = 3;
        F.prototype.c = 4;
        F.prototype.getFive = function() {
            return 5
        }

        // Because 'o' has property 'a' it inherited from 'F'");
        expect(o.a).to.equal(1);

        // Because 'o' has its own property 'b' which shadows the one in the prototype 'F'"
        expect(o.b).to.equal(2);

        // Because 'o' doesn't have its own property 'c' but the prototype does, even though 'c' was created after object 'o'"
        expect(o.c).to.equal(4);
    });
});