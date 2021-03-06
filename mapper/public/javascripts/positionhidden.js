
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== 'undefined'){
      App.web3Provider = web3.currentProvider;
    }else{
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    }
    web3 = new Web3(App.web3Provider);
    
    return App.initContract();
  },


  initContract: function() {
    
    $.getJSON('/javascripts/Mapper.json', function(data){
      
      var mapperArtifact = data;
      
      App.contracts.mapper = TruffleContract(mapperArtifact)

      App.contracts.mapper.setProvider(App.web3Provider);
      
    });
    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '#pay', App.handleRead);
  },

  handleRead: function() {
    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }
      
      var account = accounts[0];
      console.log(account);
      console.log(App.contracts);
      App.contracts.mapper.deployed().then(function(data) {
      console.log(locationID);
      var locationID =  $("#id").text();  
      return data.read(locationID, {from: account, value: 3000000000000000000});
      }).then(function(result) {
          navigator.geolocation.getCurrentPosition((position)=>{
        
        let url = "http://localhost:4000/position/"+ position.coords.latitude + "/" + position.coords.longitude;
        window.location.replace(url);
        url="";

      },(err)=>{
        console.log(err);
      });
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
  
};


window.onload = App.init;

