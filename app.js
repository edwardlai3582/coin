const counter = {
    coins : [],
    amount : 0,
    //clear previous result
    clearQuantities: function(){
      this.coins.forEach(function(coin){
        coin.node.getElementsByClassName("quantityWrapper")[0].innerHTML = "";
        coin.node.getElementsByClassName("quantityWrapper")[0].className = "quantityWrapper hide";
      });
    },
    //calculate new result
    calculate : function(amount){
      amount = parseInt(amount, 10);

      //check amount
      if(isNaN(amount)||(amount<1)){
        console.log("illegal amount: "+amount);
        this.amount.value = "";
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
    //called when coin's value changed
    valueChanged : function(e){
      console.log(e.target.id+"'s value changed to "+e.target.value);
      var targetValue = parseInt(e.target.value, 10);
      //search coin
      var position = this.coins.map(function(coin){return coin.id;}).indexOf(e.target.id);

      //value validation
      //check 1 exist
      if(this.coins[position].value === 1){
        console.log("1 coin always exists");
        this.coins[position].node.querySelector("input").value=this.coins[position].value;
        return;
      }
      //check smaller than 1
      if(targetValue <1){
        console.log("cant be smaller than 1");
        this.coins[position].node.querySelector("input").value=this.coins[position].value;
        return;
      }
      //check NaN
      if(e.target.value === ""){
        console.log("cant be an empty string");
        this.coins[position].node.querySelector("input").value=this.coins[position].value;
        return;
      }
      //check duplicate value
      for(var i=0; i<this.coins.length; i++){
        if(i !== position){
          if(this.coins[i].value === targetValue){
            console.log("duplicate value");
            this.coins[position].node.querySelector("input").value=this.coins[position].value;
            return;
          }
        }
      }

      //set new value
      this.coins[position].value = targetValue;

      //re-calculate result
      this.calculate(this.amount.value);
    },
    //start the app
    create : function(coinsArray){
      coinsArray.forEach(function(coin){
        //validation
        if(isNaN(coin)||(coin<1)){
          console.log("illegal value")
          return;
        }
        //create element
        var li = document.createElement("li");
        li.innerHTML = '<div class="coinvalueWrapper"><input type="number" class="coinvalue"></div><div class="quantityWrapper hide"></div>';
        document.getElementById("denominations").appendChild(li);
        //add coin object to coins
        this.coins.push({
          id: "coin"+this.coins.length,
          node: li,
          value: coin,
          quantity: 0
        });
      },this);

      this.coins.forEach(function(coin, index){
        coin.node.querySelector("input").id = coin.id;
        coin.node.querySelector("input").value = coin.value;
        coin.node.querySelector("input").addEventListener('blur', this.valueChanged.bind(this));
      },this);

      console.log(this.coins);
      this.amount = document.getElementById("amount");

      //add event linstener for calculation
      document.getElementById("calculateForm").addEventListener('submit', function(e){
        e.preventDefault();
        this.calculate(this.amount.value);
      }.bind(this));
    },
};

//pass coin 25, 10, 5, 1
counter.create([25, 10, 5, 1]);
