angular.module('Reflectiv', ['ngRoute'])
.service('Sprint', function(){
  return {}; // object to store persistant info
})

.config( [ '$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'topic.html' // serves start view
  })
  // .when('/topic/:id', {
  //   templateUrl: 'topic.html' // serves topic view
  // })
.when('/topic/:id/vote', {
    templateUrl: 'vote.html' // serves vote view
  })
.when('/topic/:id/results', {
    templateUrl: 'results.html' // serves results view
  })
.when('/voted', {
  templateUrl: 'voted.html'
});
}])

.controller('TopicsController', function($scope, $location, $http, Sprint){ // injects location, http, sprint
  var topicsList = this; // sets scope to topicsList
  
  topicsList.init = function(){
    if(Sprint.table === undefined){
      Sprint.table = $location.path().substring(7);
    }
  };

  topicsList.init();
  
  // Retrieve the list of already submitted votes when the topics page is accessed
  topicsList.topics = $http.get('/api/topics')
  .then(function(response){ // success function
    topicsList.topics = response.data; // stores topics in topicsList
  }, 
  function(response) { // error function
    console.log('you have an error ', response);
  });

  topicsList.create = function(){
    Sprint.table = Math.random().toString(36).substring(7);
    $scope.createLink = true;
    topicsList.sprintUrl = 'http://reflectiv.herokuapp.com/#/topic/' + Sprint.table + '/vote';
  };

  topicsList.addTopic = function(){
    var container = {};
    $scope.showResultsButton = true;
    for(var i =0; i<topicsList.topics.length; i++){
      container[topicsList.topics[i]["text"]] = true
    }

    if(!container[topicsList.topicText]){
        $http.post('/api/topics?'+Sprint.table, {text: topicsList.topicText,}) // adds topic to database
        .then(function(response) { // success function
          topicsList.topics = response.data; // updates topics
        }, 
        function(response) { // error function
          console.log('you have an error in your post request');
        });

        topicsList.topicText = ''; // clears input field        
        console.log("no duplicates found")
      } 
      
      topicsList.topicText = '';
    $scope.topicsAdded = true; 

    };

  topicsList.sprintUrl = 'http://reflectiv.herokuapp.com/topic/' + Sprint.table + '/vote'; // sets sharable url

  topicsList.startVote = function(){
      $location.path('/topic/' + Sprint.table + '/vote'); // navigates to vote view
    };
  
  topicsList.runner = function(){
      if(topicsList.topics.length){
        topicsList.startVote();
      }
    };
  })


.controller('VotesController', function($window, $location, $http, Sprint){ // injects location, http, sprint
  var votesList = this; // sets scope to votesLIst

  votesList.init = function(){
    if(Sprint.table === undefined){
      Sprint.table = $location.path().slice(7, 18);
    }
  };

  votesList.init();

  votesList.topics = $http.get('/api/topics') // gets topics to vote one
    .then(function(response){ // success function
      votesList.topics = response.data; // sets votesList variable
    }, 
    function(response) { // error function
      console.log('you have an error');
    });

    votesList.check = function() {
      // if every returns true, invoke vote();
      if(votesList.topics.every(checkVotes)){
        console.log(Sprint.table)
        vote();
        $location.path('/voted')
      };
      // checks if every topic has been voted on
      if(!votesList.topics.every(checkVotes)){
        for(var i = 0; i < votesList.topics; i++){
          if(votesList.topics[i].vote === 0){
            $window.alert("You did not vote for : ", votesList.topics[i].text)
          };
        };
      };
    };

    var vote = function(){
        $http.post('/api/votes', votesList.topics) // post vote to db
          .then(function(response) { // success function
            console.log('Vote submitted');
          }, 
        function(response) { // error function
          console.log('you have an error in your voting');
        });
        };

        var checkVotes = function(currentValue, index, array){
          return currentValue.vote > 0;
        };

  })

.controller('ResultsController', function($scope, $location, $http, Sprint){ // injects location, http
  var resultsList = this; // sets scope to resultsList
  resultsList.obj = {}; // initializes object that stores results
  
  resultsList.init = function(){
    if(Sprint.table === undefined){
      Sprint.table = $location.path().slice(7, 18);
    }
  };

  resultsList.init();
  
  resultsList.viewResults = function(){
      $location.path('/topic/' + Sprint.table + '/results'); // navigates to results view
    };   


  // Retrieve the list of already submitted votes when the topics page is accessed
  resultsList.results = $http.get('/api/votes')
  .then(function(response){ // success function
    resultsList.results = response.data; // store results in resultsList.results
    for (var i = 0; i < resultsList.results.length; i++){ // iterate over results to compile votes
      if (resultsList.obj[resultsList.results[i].text]) { // if vote exists
        resultsList.obj[resultsList.results[i].text].push(resultsList.results[i].vote); // push new vote onto votes array
      }
      else {
        resultsList.obj[resultsList.results[i].text] = [resultsList.results[i].vote]; // store the first vote in new array
      }
    }
    for(var arr in resultsList.obj){ // iterate over object storing vote arrays
      var sum = resultsList.obj[arr].reduce(function(a, b) { return a + b; }); // reduce arrays to get average
      resultsList.obj[arr] = (sum / resultsList.obj[arr].length).toFixed(1);
      console.log(resultsList.obj);
    }
  }, 
  function(response) { // error function
    console.log('you have an error');
  });
  
  resultsList.restart = function(){
    // Http request to url that will delete all rows in database for a new sprint
    $http.post('/api/reset', {}) 
      .then(function(response) { // success function
        console.log('Reset for new sprint');
      }, 
      function(response) { // error function
        console.log('you have an error in your voting');
      });

    $location.path('/'); // restart
    location.reload();
  };
});

