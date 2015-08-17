angular.module('Reflectiv', ['ngRoute'])
.service('Sprint', function(){
  return {}; // object to store persistant info
})
.config( [ '$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'start.html' // serves start view
  })
  .when('/topic/:id', {
    templateUrl: 'topic.html' // serves topic view
  })
  .when('/topic/:id/vote', {
    templateUrl: 'vote.html' // serves vote view
  })
  .when('/topic/:id/results', {
    templateUrl: 'results.html' // serves results view
  });
}])
.controller('TopicsController', function($location, $http, Sprint){ // injects location, http, sprint
  var topicsList = this; // sets scope to topicsList

  // Retrieve the list of already submitted votes when the topics page is accessed
  topicsList.topics = $http.get('/api/topics')
  .then(function(response){ // success function
    topicsList.topics = response.data; // stores topics in topicsList
  }, 
  function(response) { // error function
    console.log('you have an error');
  });

  topicsList.create = function(){
    Sprint.table = Math.random().toString(36).substring(7); // generates sprint id
    $location.path('/topic/' + Sprint.table); // sets url to sprint id
  };

  topicsList.addTopic = function(){
    $http.post('/api/topics', {text: topicsList.topicText,}) // adds topic to database
    .then(function(response) { // success function
      topicsList.topics = response.data; // updates topics
    }, 
    function(response) { // error function
      console.log('you have an error in your post request');
    });

    topicsList.topicText = ''; // clears input field
  };

  topicsList.sprintUrl = 'http://reflectiv.guru/topic/' + Sprint.table + '/'; // sets sharable url

  topicsList.startVote = function(){
      $location.path('/topic/' + Sprint.table + '/vote'); // navigates to vote view
    };
  })

.controller('VotesController', function($location, $http, Sprint){ // injects location, http, sprint
  var votesList = this; // sets scope to votesLIst

  votesList.topics = $http.get('/api/topics') // gets topics to vote one
    .then(function(response){ // success function
      votesList.topics = response.data; // sets votesList variable
    }, 
    function(response) { // error function
      console.log('you have an error');
    });

    votesList.vote = function(){
      $http.post('/api/votes', votesList.topics) // post vote to db
      .then(function(response) { // success function
        console.log('Vote submitted');
      }, 
      function(response) { // error function
        console.log('you have an error in your voting');
      });
    };

    votesList.viewResults = function(){
      $location.path('/topic/' + Sprint.table + '/results'); // navigates to results view
    };  
  })

.controller('ResultsController', function($location, $http){ // injects location, http
  var resultsList = this; // sets scope to resultsList
  resultsList.obj = {}; // initializes object that stores results

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
      resultsList.obj[arr] = sum / resultsList.obj[arr].length;
    }
  }, 
  function(response) { // error function
    console.log('you have an error');
  });

  resultsList.restart = function(){
    $location.path('/'); // restart
  };

})
.filter('reverse', function() { // function to reverse order of topics in ng-repeat
  return function(items) {
    return items.slice().reverse();
  };
});

