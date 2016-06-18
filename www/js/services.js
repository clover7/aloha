angular.module('starter.services', [])

  .factory('Todos', function () {
    return {
      all: function ($http) {
        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos",
          method: "GET",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          }
        });
        return promise;
      },
      remove: function ($http, todo) {
        //alert(todo._id.$oid);
        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos/" + todo._id.$oid,
          method: "DELETE",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          }
        });
        return promise;
      },
      update: function ($http, todo) {
        console.log("service : " + todo);
        todo.updateDate = new Date();
        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos/" + todo._id.$oid,
          method: "PUT",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          },
          data: todo
        });
        return promise;
      },
      write: function ($http, todo) {
        console.log("todo write:" + todo);
        todo.createDate = new Date();

        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos",
          method: "POST",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          },
          data: todo //서버로 넘길 데이터
        });
        return promise;
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

    //var itemsRef = new Firebase("https://Aloha.firebaseio.com/items");
    //return $firebaseArray(itemsRef);
    var videos = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/001.gif'  ,
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/002.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/003.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/004.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/005.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 5,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/006.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 6,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/007.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 7,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/008.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 8,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/009.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 9,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/010.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }, {
      id: 10,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/011.gif',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
    }];

    return {
      all: function () {
        return videos;
      },
      remove: function (video) {
        videos.splice(videos.indexOf(video), 1);
      },
      write: function ($http, todo) {
        console.log("todo write:" + todo);
        todo.createDate = new Date();
        $scope.items.$add({
          "name": name
        });


        var promise = $http({
          url: "https://api.mlab.com/api/1/databases/angular/collections/todos",
          method: "POST",
          params: {
            "apiKey": "0m3TAU3qpXHvc9LRN5JgYSCuZbvKS5N6"
          },
          data: todo //서버로 넘길 데이터
        });
        return promise;
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
      face: 'img/ben.png',
      date: new Date()
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png',
      date: new Date()
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg',
      date: new Date()
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png',
      date: new Date()
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png',
      date: new Date('Sun Jun 19 2016 02:10:19 GMT+0900 (KST)')
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


