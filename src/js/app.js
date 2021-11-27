const allowedAccounts = ["0x3e3221a47c713a7c4d52647b3f35be26cd1387a5", "0x77c8e260e607cb9f427067b5f31d94eae1260d07"];

App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: function () {
    return App.initWeb3();
  },
  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      //Ifaweb3instanceisalreadyprovidedbyMetaMask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      //Specifydefaultinstanceifnoweb3instanceprovided
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },
  initContract: function () {
    $.getJSON("Election.json", function (election) {
      //Instantiateanewtrufflecontractfromtheartifact
      App.contracts.Election = TruffleContract(election);
      //Connectprovidertointeractwithcontract
      App.contracts.Election.setProvider(App.web3Provider);
      App.loadAccountData();
      return App.render();
    });
  },
  loadAccountData: function() {
     //Loadaccountdata
     web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account:" + "<strong>" + account + "</strong>");
        if (allowedAccounts.includes(account)) {
          var accountSection = $("#account-section");
          accountSection.append("<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#addModal\">" +
          "Add Condidate" + "</button>");
        }
      }
    });
  },
  render: function () {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    content.hide();
    //Loadcontractdata
    App.contracts.Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        return electionInstance.candidatesCount();
      })
      .then(function (candidatesCount) {
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();
        var candidatesSelect = $("#candidatesSelect");
        candidatesSelect.empty();
        for (var i = 1; i <= candidatesCount; i++) {
          electionInstance.candidates(i).then(function (candidate) {
            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];
            //RendercandidateResult
            var candidateTemplate =
              "<tr><th>" +
              id +
              "</th><td>" +
              name +
              "</td><td>" +
              voteCount +
              "</td></tr>";
              candidatesResults.append(candidateTemplate);
              candidatesSelect.append("<option value='" + id + "'>" + name + "</option>");
          });
        }
        return electionInstance.voters(App.account);
      })
      .then((hasVoted) => {
        if (hasVoted) {
          $("form").hide();
        }
        loader.hide();
        content.show();
      })
      .catch(function (error) {
        console.warn(error);
      });
  },
  castVote: function() {
    var candidateId = $("#candidatesSelect").val();
    App.contracts.Election.deployed()
    .then((instance) => {
      return instance.vote(candidateId, { from: App.account });
    })
    .then(() => {
      App.render();
    })
    .catch((err) => {
      console.error(err);
    });
  },
  addCandidate: function() {
    var name = $("#nameInput").val();
    App.contracts.Election.deployed()
    .then((instance) => {
      return instance.addCandidate(name, { from: App.account });
    })
    .then(() => {
      App.render();
      $('#addModal').modal('hide');
    })
    .catch((err) => {
      console.error(err);
    });
  }
};
$(function () {
  $(window).load(function () {
    App.init();
  });
});
