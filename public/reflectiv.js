angular.module('Reflectiv', ['ngRoute'])
.service('Sprint', function(){
  return {};

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
  });

}])
.controller('LeaderController', function($scope){
    // Gather input from user
    // User input will be assigned to $scope.name variable
    $scope.createSprint = function() {
      console.log($scope.name);
    // format JSON object to send to DB
    // Connect to DB
    // Make post request with DB
  };
})
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

  topicsList.startVote = function(){
      // needs to store all items voted on in database
      $location.path('/topic/' + Sprint.table + '/vote');
    };
  })
.controller('VotesController', function($http){
  // console.log(this.voteValue);

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



    votesList.addVotes = function(){
      $http.post('/api/votes', {text: "Testing 123", vote: votesList.voteValue})
      // first function is callback on success
      .then(function(response) {
        console.log('Vote submitted');
      }, 
      // second function is callback on error
      function(response) {
        console.log('you have an error in your voting');
      });
      

      //receive list of all iems voted on
      //iterate over items
        //store votes into database
      //serve waiting page to voter
    };
  })

.controller('masterController', function($http){
  $http.get('/api/test')
  .then(function(response){
    console.log('stuff');
  }, function(response) {

  });
});











