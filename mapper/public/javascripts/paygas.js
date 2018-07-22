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
    $.getJSON('/javascripts/Mapper.json', function(data){//127.0.0.1:9545/

      var mapperArtifact = data;
      App.contracts.mapper = TruffleContract(mapperArtifact)

      App.contracts.mapper.setProvider(App.web3Provider);
      
    });

    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '#pay', App.handleStore);
  },

  

  handleStore: function() {
    web3.eth.getAccounts(function(error, accounts){
      if (error) {
        console.log(error);
      }
      App.contracts.mapper.deployed().then(function(data) {

      var locationID =  $("#id").val();
      return data.store(locationID);
      }).then(function(result) {
        let url = "http://localhost:4000/locationlist";
        window.location.replace(url);
        
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};
window.onload = App.init;
