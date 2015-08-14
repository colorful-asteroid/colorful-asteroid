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
.controller('TopicsController', function($location, Sprint){
  var topicsList = this;
  topicsList.topics = [
  {text: 'HOW COOL IS REFLECTIV?'}
  ];

  topicsList.create = function(){
    Sprint.table = Math.random().toString(36).substring(7) ;
    $location.path('/topic/' + Sprint.table);
  };

  topicsList.addTopic = function(){
    topicsList.topics.push({text: topicsList.topicText});
    topicsList.topicText = '';
  };

  topicsList.startVote = function(){
      // needs to store all items voted on in database
      $location.path('/topic/' + Sprint.table + '/vote');
    };
  })
.controller('VotesController', function($http){
  var votesList = this;
    // votesList.topics = [
    //   { topic: 'How cool is reflectiv?'},
    //   { topic: 'How cool is TGA?'}
    // ];
    votesList.topics = $http.get('/api/test')
    .then(function(response){
      votesList.topics = response.data;
      console.log('****************', votesList.topics);
    }, function(response) {
      console.log('you have an error');
    });



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











