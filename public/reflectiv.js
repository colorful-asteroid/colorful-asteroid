angular.module('Reflectiv', ['ngRoute'])
  .config( [ '$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'start.html'
      })
      .when('/leader', {
        templateUrl: 'leader.html'
      })
      .when('/topic', {
        templateUrl: 'topic.html'
      })
      .when('/topic/:id', {
        templateUrl: 'topic.html'
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
  .controller('TopicsController', function($scope, $location){
    var topicsList = this;
    topicsList.topics = [
      {text: 'REFLECTIV KICKS ASS'}
    ];
    topicsList.create = function(){
      $location.path('/topic/yolo');
      //$scope.$apply();
    };
    topicsList.addTopic = function(){
      topicsList.topics.push({text: topicsList.topicText});
      topicsList.topicText = '';
    };
  })
  .controller('VotesController', function(){
    var votesList = this;
    votesList.votes = [
      { topic: 'How cool is reflectiv?',
        warmth: '100',
        comment: 'it\'s probably the coolest project ever'
      }
    ];
    votesList.addVotes = function(){
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











