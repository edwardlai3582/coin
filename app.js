const counter = {
    coins : [],
    amount : 0,
    clearQuantities: function(){
      this.coins.forEach(function(coin){
        coin.node.getElementsByClassName("quantityWrapper")[0].innerHTML = "";
        coin.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper hide";
      });
    },
    calculate : function(amount){
      amount = parseInt(amount, 10);

      //check amount
      if(isNaN(amount)||(amount<1)){
        console.log("illegal amount: "+amount);
        return;
      }

      //greedy not 100% correct
      this.coins.sort(function(c1, c2) {return c2.value - c1.value;});
      for(var i=0; i<this.coins.length; i++){
        this.coins[i].quantity = Math.floor(amount / this.coins[i].value);
        amount = amount %  this.coins[i].value;
      }

      //display result
      this.clearQuantities();
      this.coins.forEach(function(coin){
        if(coin.quantity !== 0){
          console.log(coin.value+" x "+coin.quantity);
          coin.node.getElementsByClassName("quantityWrapper")[0].innerHTML = '<div class="quantity">'+coin.quantity+'</div>';
          coin.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper";
        }
      });
      console.log("/////////////////")
    },
    valueChanged : function(e){
      console.log(e.target.id+"'s value changed to "+e.target.value);

      //search coin
      var position = this.coins.map(function(coin){return coin.id;}).indexOf(e.target.id);

      //value validation
      //check 1 exist
      if(this.coins[position].value === 1){
        console.log("1 coin will always exist");
        this.coins[position].node.querySelector("input").value=this.coins[position].value;
        return;
      }
      //check smaller than 1
      if(parseInt(e.target.value, 10) <1){
        console.log("cant smaller than 1");
        this.coins[position].node.querySelector("input").value=this.coins[position].value;
        return;
      }
      //check duplicate value
      for(var i=0; i<this.coins.length; i++){
        if(i !== position){
          if(this.coins[i].value === parseInt(e.target.value, 10)){
            console.log("duplicate");
            this.coins[position].node.querySelector("input").value=this.coins[position].value;
            return;
          }
        }
      }

      console.log("start make change");
      this.coins[position].value = e.target.value
    },
    start : function(){
      var coinNodes = document.querySelectorAll("#denominations > li");
      coinNodes.forEach(function(coinNode){
        this.coins.push({
          id: "coin"+this.coins.length,
          node: coinNode,
          value: parseInt(coinNode.querySelector("input").value, 10),
          quantity: 0
        });
      },this);

      this.coins.forEach(function(coin, index){
        coin.node.querySelector("input").id = coin.id;
        coin.node.querySelector("input").addEventListener('blur', this.valueChanged.bind(this));
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
