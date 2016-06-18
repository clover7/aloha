var app = angular.module('starter.controllers', [])

app.controller('LoginCtrl', function ($scope, $state) {
    console.log("LoginCtrl");
  })

  .controller('DashCtrl', function ($scope, Videos) {
    console.log("DashCtrl");
    $scope.items = Videos.all();
  })

  .controller('TodoCtrl', function ($scope, $http, Todos, $ionicLoading, $ionicPopup, $ionicModal) {
    console.log("TodoCtrl");
    $ionicLoading.show();
    function readTodo(){
      var data = Todos.all($http);
      console.log(data);
      data.error(function (data, status, header, config) {
        $ionicLoading.hide();
        alert("error : " + status + " /" + data);
      });
      data.success(function (data, status, header, config) {
        $ionicLoading.hide();
        console.log("success : " + status + " /" + data);
        $scope.todos = data;
      });
    }

    readTodo();

    $scope.updateTodo = function (todo) {
      console.log(todo);
      $ionicLoading.show();
      var updated = Todos.update($http, todo);
      updated.error(function (data, status, header, config) {
        $ionicLoading.hide();
        console.log("error : " + status + " /" + data);
      });
      updated.success(function (data, status, header, config) {
        $ionicLoading.hide();
        //alert("updated");
        //console.log("updated!");
        readTodo();
      });
    }

    $scope.deleteTodo = function (todo) {
      $ionicPopup.confirm({
        title: "Delete",
        template: "really delete???"
      }).then(function (result) {
        if (result) {
          $ionicLoading.show();
          var done = Todos.remove($http, todo);
          done.error(function (data, status, header, config) {
            $ionicLoading.hide();
            console.log("error : " + status + " /" + data);
          });
          done.success(function (data, status, header, config) {
            $ionicLoading.hide();
            readTodo();
          });
        }
        else {
          alert(result);
        }
      });
    }

    $scope.writeTodo = function($event, todo){
      $event.preventDefault();

      console.log("$scope.title : " + $scope.title);
      console.log("writeTodo1 : " + todo);
      //todo = new Todos(todo);

      var title = todo;
      //console.log("writeTodo : " + title);

      if(title == undefined){
        alert("please input todo");
        $scope.title = "";
      }else{
        //var todo = {"title":title, "end":false};
        var writeDone = Todos.write($http, todo);
        writeDone.error(function (data, status, header, config) {
          $ionicLoading.hide();
          alert("error : " + status + " /" + data);
        });
        writeDone.success(function (data, status, header, config) {
          $ionicLoading.hide();
          $scope.closeModal();
          console.log("success : " + status + " /" + data);

          readTodo();
        });
      }
      $scope.title = "";
    }

    var baseUrl = "views/todoWrite.html";
    $ionicModal.fromTemplateUrl(baseUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(){
      $scope.modal.show();
      //setTimeout(function(){
      //$scope.modal.show();
      //},100);
    }
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
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
