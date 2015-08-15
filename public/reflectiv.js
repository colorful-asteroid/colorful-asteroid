angular.module('Reflectiv', ['ngRoute'])
.service('Sprint', function(){
  return {}; // object to store persistant info
})
.config( [ '$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'start.html'
  })
  .when('/leader', {
    templateUrl: 'leader.html'
  })
  .when('/topic/:id', {
    templateUrl: 'topic.html'
  })
  .when('/topic/:id/vote', {
    templateUrl: 'vote.html'
  })
  .when('/topic/:id/results', {
    templateUrl: 'results.html'
  });
}])
.controller('TopicsController', function($location, $http, Sprint){
  var topicsList = this;

  // Retrieve the list of already submitted votes when the topics page is accessed
  topicsList.topics = $http.get('/api/topics')
  // first function is callback on succcess
  .then(function(response){
    topicsList.topics = response.data;
  }, 
  // second function is callback on error
  function(response) {
    console.log('you have an error');
  });

  topicsList.create = function(){
    Sprint.table = Math.random().toString(36).substring(7) ;
    $location.path('/topic/' + Sprint.table);
  };

  topicsList.addTopic = function(){

    $http.post('/api/topics', {text: topicsList.topicText,})
    // first function is callback on success
    .then(function(response) {
      topicsList.topics = response.data;
    }, 
    // second function is callback on error
    function(response) {
      console.log('you have an error in your post request');
    });

    topicsList.topicText = '';
  };

  topicsList.sprintUrl = 'http://reflectiv.guru/topic/' + Sprint.table + '/';

  topicsList.startVote = function(){
      // needs to store all items voted on in database
      $location.path('/topic/' + Sprint.table + '/vote');
    };
  })
.controller('VotesController', function($location, $http, Sprint){
  var votesList = this;
  votesList.voteValue = 50;
    
    votesList.topics = $http.get('/api/topics')
    // first function is callback on succcess
    .then(function(response){
      votesList.topics = response.data;
    }, 
    // second function is callback on error
    function(response) {
      console.log('you have an error');
    });
    votesList.vote = function(){
      $http.post('/api/votes', {text: "Testing 123", vote: votesList.voteValue})
      // first function is callback on success
      .then(function(response) {
        console.log('Vote submitted');
      }, 
      // second function is callback on error
      function(response) {
        console.log('you have an error in your voting');
      });
    };

      //receive list of all iems voted on
      //iterate over items
        //store votes into database
      //serve waiting page to voter
    
    votesList.viewResults = function(){
      $location.path('/topic/' + Sprint.table + '/results');
    };  
})

.controller('ResultsController', function($location, $http){
  var resultsList = this;
  resultsList.results = [
    { text: 'Gundam', score: 100},
    { text: 'Gundam Wing', score: 85},
    { text: 'Gundam Seed', score: 40}
  ];
  resultsList.restart = function(){
    $location.path('/');
  };

});











