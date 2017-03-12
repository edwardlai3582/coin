const counter = {
    coins : [],
    amount : 0,
    //clear previous result
    clearQuantities: function(){
      this.coins.forEach(function(coin){
        coin.clearNodeQuantity();
      });
    },
    //dynamic programming
    dp: function(amount, coinsArray){
      var dp=[];
      for(var i=0; i<=amount; i++){
        var temp={coins:{}};
        for(var j=0; j<coinsArray.length; j++){
          //worst case: only use 1s
          if(coinsArray[j].value === 1){
            temp['coins'][coinsArray[j].value]=i;
            temp.total=i;
          }
          else{
            temp['coins'][coinsArray[j].value]=0;
          }
        }
        dp.push(temp);
      }

      for(var i=0; i<=amount; i++){
        for(var j=0; j<coinsArray.length; j++){
          if(coinsArray[j].getValue() + i <= amount  ){
            if(dp[i + coinsArray[j].getValue()].total > dp[i].total + 1){
               dp[i + coinsArray[j].getValue()]['coins'] = Object.assign({},dp[i]['coins']);
               dp[i + coinsArray[j].getValue()]['coins'][coinsArray[j].getValue()]+=1;
               dp[i + coinsArray[j].getValue()].total = dp[i].total + 1;
            }
          }
        }
      }

      return dp[dp.length-1];
    },
    //calculate new result
    calculateResult : function(amount){
      amount = parseInt(amount, 10);

      //check amount
      if(isNaN(amount)||(amount<1)){
        console.log("ILLEGAL AMOUNT: "+amount);
        this.amount.value = "";
        this.clearQuantities();
        return;
      }

      //dp
      var dp = this.dp(amount, this.coins);
      console.log(dp);

      //set result
      Object.keys(dp.coins).forEach(function(coinValue){
        for(var i=0; i<this.coins.length; i++){
          if(this.coins[i].getValue() === parseInt(coinValue, 10)){
            this.coins[i].setQuantity(dp.coins[coinValue]);
            return;
          }
        }
      },this);

      //display result
      this.clearQuantities();
      this.coins.forEach(function(coin){
        if(coin.getQuantity() !== 0){
          coin.setNodeQuantity();
        }
      });
    },
    //value validation
    validValue: function(targetValue, position, coinsArray){
      var validResult = "";
      //check 1 exist
      if(coinsArray[position].getValue() === 1){
        return "INVALID: 1 coin always exists";
      }
      //check integer
      if(!Number.isInteger(targetValue)){
        return "INVALID: need to be an integer";
      }
      //check smaller than 1
      if(targetValue < 1){
        return "INVALID: cant be smaller than 1";
      }
      //check NaN
      if(isNaN(targetValue)){
        return "INVALID: cant be an NaN";
      }
      //check duplicate value
      for(var i=0; i<this.coins.length; i++){
        if(i !== position){
          if(coinsArray[i].getValue() === targetValue){
            return "INVALID: duplicate value";
          }
        }
      }
      //pass all testcases
      return "";
    },
    //called when coin's value changed
    valueChanged : function(e){
      var targetValue = Number(e.target.value);
      //search coin
      var position = this.coins.map(function(coin){return coin.getId();}).indexOf(e.target.id);
      //value validation
      var validResult = this.validValue(targetValue, position, this.coins);
      if(validResult === ""){
        //set new value
        this.coins[position].setValue(targetValue);
        //re-calculate result
        this.calculateResult(this.amount.value);
      }
      else{
        console.log(validResult);
        this.coins[position].resetInputValue();
      }
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
        this.calculateResult(this.amount.value);
      }.bind(this));
    },
};

window.onload = function() {
  //pass coin 25, 10, 5
  counter.start([25, 10, 5]);
};
