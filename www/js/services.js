angular.module('starter.services', [])

.factory('Todos', function () {
    return {
      all: function ($http, $scope) {
        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos",
          method: "GET",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          }
        });

        return promise;
      },

      remove: function($http,todo){
        //alert(todo._id.$oid);
        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos/"+todo._id.$oid,
          method: "DELETE",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          }
        });

        promise.error(function (data, status, header, config) {
          alert("error : " + status + " /" + data);
        });
        promise.success(function (data, status, header, config) {
        });
      },
      update: function($http,todo){
        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos/"+todo._id.$oid,
          method: "PUT",
          params:{
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          },
          data:todo
        });

        promise.error(function(data, status, header, config){
          alert("error :" + status + " / "+ data);
        });
        promise.success(function(data, status, header, config){
        });

      },
      get: function (videoId) {
        for (var i = 0; i < videos.length; i++) {
          if (videos[i].id === parseInt(videoId)) {
            return videos[i];
          }
        }
        return null;
      }
    };
  })


  .factory('Videos', function () {
    var videos = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/001.gif'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/002.gif'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/003.gif'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/004.gif'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/005.gif'
    }, {
      id: 5,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/006.gif'
    }, {
      id: 6,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/007.gif'
    }, {
      id: 7,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/008.gif'
    }, {
      id: 8,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/009.gif'
    }, {
      id: 9,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/010.gif'
    }, {
      id: 10,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/011.gif'
    }];

    return {
      all: function () {
        return videos;
      },
      remove: function (video) {
        videos.splice(videos.indexOf(video), 1);
      },
      get: function (videoId) {
        for (var i = 0; i < videos.length; i++) {
          if (videos[i].id === parseInt(videoId)) {
            return videos[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });


