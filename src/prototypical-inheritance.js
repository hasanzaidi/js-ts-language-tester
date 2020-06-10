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

console.log("'o.a' returns " + o.a + " because 'o' has property 'a' it inherited from 'F'");
console.log("'o.b' returns " + o.b + " instead of 3 because 'o' has its own property 'b' which shadows the one in the prototype 'F'");
console.log("'o.c' returns " + o.c + " because 'o' doesn't have its own property 'c' but the prototype does, even though 'c' was created after object 'o'");
