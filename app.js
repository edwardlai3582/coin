const counter = {
    coins : [],
    amount : 0,
    calculate : function(amount){
      console.log("Amount is "+amount);
      //greedy not 100% correct
      this.coins.sort(function(c1, c2) {return c2.value - c1.value;});
      for(var i=0; i<this.coins.length; i++){
        this.coins[i].quantity = Math.floor(amount / this.coins[i].value);
        amount = amount %  this.coins[i].value;
      }
      this.coins.forEach(function(coin){
        if(coin.quantity !== 0){
          coin.node.getElementsByClassName("quantityWrapper")[0].innerHTML = '<div class="quantity">'+coin.quantity+'</div>';
          coin.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper";
        }
        else{
          coin.node.getElementsByClassName("quantityWrapper")[0].innerHTML = "";
          coin.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper hide";
        }
      });
    },
    valueChanged : function(e){
      console.log(e.target.id+"'s value changed to "+e.target.value);
      var position = parseInt(e.target.id.replace("coin", ""), 10);
      this.coins[position].value = e.target.value
    },
    start : function(){
      var coinNodes = document.querySelectorAll("#denominations > li");
      coinNodes.forEach(function(coinNode){
        this.coins.push({
          node: coinNode,
          value: parseInt(coinNode.querySelector("input").value, 10),
          quantity: 0
        });
      },this);

      this.coins.forEach(function(coin, index){
        coin.node.querySelector("input").id = "coin"+index;
        coin.node.addEventListener('input', this.valueChanged.bind(this));
      },this);

      console.log(this.coins);
      this.amount = document.getElementById("amount");
      document.getElementById("calculateForm").addEventListener('submit', function(e){
        e.preventDefault();
        this.calculate(document.getElementById('amount').value);
      }.bind(this));
    },
};

counter.start();
