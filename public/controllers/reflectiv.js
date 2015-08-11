angular.module('reflectiv', [])
  .controller('TopicsController', function(){
    var topicsList = this;
    topicsList.topics = [
      {text: 'REFLECTIV KICKS ASS'}
    ];
    topicsList.addTopic = function(){
      console.log('getting into add topic');
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
  });
