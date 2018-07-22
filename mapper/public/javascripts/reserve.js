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
    $.getJSON('Mapper.json', function(data){http://127.0.0.1:9545/

      var mapperArtifact = data;
      App.contracts.mapper = TruffleContract(mapperArtifact)

      App.contracts.mapper.setProvider(App.web3Provider);
      
    });

    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '.store', App.handleStore);
    $(document).on('click', '.read', App.handleRead);
  },

  

  handleStore: function() {
    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }
      App.contracts.mapper.deployed().then(function(data) {

       var locationID =  $("#store").val();
       return data.store(locationID);
      }).then(function(result) {

        $("#store").val("");
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleRead: function() {
    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.mapper.deployed().then(function(data) {

       var locationID =  $("#read").val();
       return data.read(locationID, {from: account, value: 2000000000000000000});
      }).then(function(result) {

        $("#read").val("");
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
  
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});


module.export=App
const app = require(".positionhidden,json")