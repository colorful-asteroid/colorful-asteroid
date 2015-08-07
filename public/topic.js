angular.module('topicsApp', [])
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
  });
