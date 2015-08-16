angular.module('Reflectiv', ['ngRoute'])
.service('Sprint', function(){
  return {}; // object to store persistant info
})
.config( [ '$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'start.html'
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
      // create models
      // $http.post('/api/votes', {text: "Testing 123", vote: 50})
      $http.post('/api/votes', votesList.topics)
      // first function is callback on success
      .then(function(response) {
        console.log('Vote submitted');
      }, 
      // second function is callback on error
      function(response) {
        console.log('you have an error in your voting');
      });
    };

    votesList.viewResults = function(){
      $location.path('/topic/' + Sprint.table + '/results');
    };  
  })

.controller('ResultsController', function($location, $http){
  var resultsList = this;
  resultsList.obj = {};

  // Retrieve the list of already submitted votes when the topics page is accessed
  resultsList.results = $http.get('/api/topics')
  // first function is callback on succcess
  .then(function(response){
    resultsList.results = response.data;
    for (var i = 0; i < resultsList.results.length; i++){
      console.log('**************', resultsList.results[i].text);

      if (resultsList.obj[resultsList.results[i].text]) {
        resultsList.obj[resultsList.results[i].text].push(resultsList.results[i].vote);
      }
      else {
        resultsList.obj[resultsList.results[i].text] = [resultsList.results[i].vote];
      }
    }
    console.log('resultsList.obj', resultsList.obj);
    
  }, 
  // second function is callback on error
  function(response) {
    console.log('you have an error');
  });

  resultsList.present = function(){
  };


  resultsList.restart = function(){
    $location.path('/');
  };

});










