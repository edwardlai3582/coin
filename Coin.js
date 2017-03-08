function Coin (index, value, element){
  this.id = "coin"+index;
  this.value = value;
  this.element = element;

};

Coin.prototype.getName = function() {
    return this.name;
};

Coin.prototype.getValue = function() {
    return parseInt(this.value, 10);
};

Coin.prototype.handleEvent = function(event) {
    switch (event.type) {
        case "change": this.change(this.element.value);
    }
};

Coin.prototype.change = function(value) {
    this.data = value;
    this.element.value = value;
};
