var app = angular.module('starter.controllers', [])

app

  .controller('LoginCtrl', function ($scope, $state) {
    console.log("LoginCtrl");
    $scope.moveMain = function () {
      $state.go("/dash");
    }
  })
  .controller('DashCtrl', function ($scope, Videos) {
    console.log("DashCtrl");
    $scope.items = Videos.all();
  })

  .controller('TodoCtrl', function ($scope, $http, Todos) {
    console.log("TodoCtrl");
    //$ionicLoading.show();

    var data = Todos.all($http);
    data.error(function (data, status, header, config) {

      alert("error : " + status + " /" + data);
    });
    data.success(function (data, status, header, config) {
      console.log("success : " + status + " /" + data);
      $scope.todos =data;
    });
  })

  .controller('VideoCtrl', function ($scope, Videos) {
    $scope.items = Videos.all();
    $scope.remove = function (video) {
      Videos.remove(video);
    };
  })

  .controller('VideoDetailCtrl', function ($scope, $stateParams, Videos) {
    $scope.item = Videos.get($stateParams.itemId);
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };

  });
