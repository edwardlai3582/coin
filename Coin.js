function Coin (id, value, valueChanged, parentNode){
  this.id = id;
  this.value = value;
  this.quantity = 0;
  //add node
  //create element
  var li = document.createElement("li");
  li.innerHTML = '<div class="coinvalueWrapper"><input type="number" class="coinvalue"></div><div class="quantityWrapper hide"></div>';


  li.querySelector("input").id = this.id;
  li.querySelector("input").value = this.value;
  li.querySelector("input").addEventListener('blur', valueChanged);

  parentNode.appendChild(li);

  this.node = li;
};
