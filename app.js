const counter = {
    coins : [],
    amount : 0,
    //clear previous result
    clearQuantities: function(){
      this.coins.forEach(function(coin){
        coin.clearQuantity();
      });
    },
    //calculate new result
    calculate : function(amount){
      amount = parseInt(amount, 10);

      //check amount
      if(isNaN(amount)||(amount<1)){
        console.log("ILLEGAL AMOUNT: "+amount);
        this.amount.value = "";
        return;
      }

      //greedy not 100% correct
      this.coins.sort(function(c1, c2) {return c2.getValue() - c1.getValue();});
      for(var i=0; i<this.coins.length; i++){
        this.coins[i].setQuantity(Math.floor(amount / this.coins[i].getValue()));
        amount = amount %  this.coins[i].getValue();
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
    //called when coin's value changed
    valueChanged : function(e){
      var targetValue = parseInt(e.target.value, 10);
      //search coin
      var position = this.coins.map(function(coin){return coin.getId();}).indexOf(e.target.id);

      //value validation
      //check 1 exist
      if(this.coins[position].getValue() === 1){
        console.log("INVALID: 1 coin always exists");
        this.coins[position].resetInputValue();
        return;
      }
      //check smaller than 1
      if(targetValue < 1){
        console.log("INVALID: cant be smaller than 1");
        this.coins[position].resetInputValue();
        return;
      }
      //check NaN
      if(isNaN(targetValue)){
        console.log("INVALID: cant be an NaN");
        this.coins[position].resetInputValue();
        return;
      }
      //check duplicate value
      for(var i=0; i<this.coins.length; i++){
        if(i !== position){
          if(this.coins[i].getValue() === targetValue){
            console.log("INVALID: duplicate value");
            this.coins[position].resetInputValue();
            return;
          }
        }
      }

      //set new value
      this.coins[position].setValue(targetValue);

      //re-calculate result
      this.calculate(this.amount.value);
    },
    //start the app
    start : function(coinsArray){
      //add default coin 1
      if(Array.isArray(coinsArray)) {
          coinsArray.push(1);
      }
      else {
          coinsArray = [1];
      }

      coinsArray.forEach(function(coin){
        //validation
        if(isNaN(coin)||(coin<1)){
          console.log("illegal value")
          return;
        }
        //add Coin object to coins
        this.coins.push(new Coin("coin"+this.coins.length, coin, this.valueChanged.bind(this), document.getElementById("denominations")));
      },this);

      this.amount = document.getElementById("amount");
      //add event linstener for calculation
      document.getElementById("calculateForm").addEventListener('submit', function(e){
        e.preventDefault();
        this.calculate(this.amount.value);
      }.bind(this));
    },
};

//pass coin 25, 10, 5
counter.start([25, 10, 5]);
