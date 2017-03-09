function Coin (id, value, valueChanged, parentNode){
  this.id = id;
  this.value = value;
  this.quantity = 0;
  //create elemet for node
  var li = document.createElement("li");
  li.innerHTML = '<div class="coinvalueWrapper"><input type="number" class="coinvalue"></div><div class="quantityWrapper hide"></div>';
  li.querySelector("input").id = this.id;
  li.querySelector("input").value = this.value;
  li.querySelector("input").addEventListener('blur', valueChanged);
  parentNode.appendChild(li);
  this.node = li;
};

Coin.prototype.getId = function(){
  return this.id;
};

Coin.prototype.getValue = function(){
  return this.value;
};

Coin.prototype.setValue = function(value){
  this.value = value;
};

Coin.prototype.getQuantity = function(){
  return this.quantity;
};

Coin.prototype.setQuantity = function(quantity){
  this.quantity = quantity;
};

Coin.prototype.resetInputValue = function(){
  this.node.querySelector("input").value = this.getValue();
};

Coin.prototype.clearNodeQuantity = function(){
  this.node.getElementsByClassName("quantityWrapper")[0].innerHTML = "";
  this.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper hide";
};

Coin.prototype.setNodeQuantity = function(){
  this.node.getElementsByClassName("quantityWrapper")[0].innerHTML = '<div class="quantity">'+this.quantity+'</div>';
  this.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper";
};
