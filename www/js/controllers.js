var app = angular.module('starter.controllers', ['firebase'])

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

    function Todo(data){
      this._id = data._id;
      this.title = data.title;
      this.end = data.end;
      this.createDate = data.createDate;
      this.updateDate = data.updateDate;
      //$$hashKey: "object:57"
      //_id: {$oid: "57655ef1c2ef161e70adae0e"}
      //createDate: "2016-06-18T16:12:12.695Z"
      //end: false
      //title: "1234"
      //updateDate: "2016-06-18T16:12:46.620Z"
      //Object 견본
    }
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
      todo.updateDate = new Date();
      //todo.id = todo._id.$oid;
      var setTodo = new Todo(todo);

      $ionicLoading.show();
      var updated = Todos.update($http, setTodo);
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

      todo.createDate = new Date();
      todo.updateDate = new Date();
      todo.end = false;
      var setTodo = new Todo(todo);

      var title = setTodo.title;
      //console.log("writeTodo : " + title);
      if(title == undefined){
        alert("please input todo");
        $scope.title = "";
      }else{
        //var todo = {"title":title, "end":false};
        var writeDone = Todos.write($http, setTodo);
        writeDone.error(function (data, status, header, config) {
          $ionicLoading.hide();
          alert("error : " + status + " /" + data);
        });
        writeDone.success(function (data, status, header, config) {
          $ionicLoading.hide();
          $scope.closeModal();
          console.log("success : " + status + " /" + data);
          readTodo();
          $scope.title = "";
        });
      }
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

  .controller('ChatsCtrl', function ($scope, Chats, $firebaseArray) {
    $scope.items = Chats.all();
    $scope.remove = function (video) {
      Chats.remove(video);
    };

    var messagesRef = new Firebase("https://aloha-651ec.firebaseio.com/aloha");
    // download the data from a Firebase reference into a (pseudo read-only) array
    // all server changes are applied in realtime
    $scope.messages = $firebaseArray(messagesRef);
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    // the $firebaseArray service properly handles database queries as well
    $scope.filteredMessages = $firebaseArray(query);


    var airportsRef = new Firebase("https://publicdata-airports.firebaseio.com/");
    airportsRef.child("SFO").on("value", delayInfo);
    function delayInfo(snapshot) {
      var airport = snapshot.val();
      console.log("Delay: " + airport.delay + " reason: " + airport.status.reason);
    }

  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, $ionicScrollDelegate) {
    $scope.item = Chats.get($stateParams.itemId);
    //
    //function($scope, $ionicHistory, $firebaseArray, $cordovaCamera, $firebase, $ionicScrollDelegate) {
    //
    //  $ionicHistory.clearHistory();
    //

    var message = $scope.myMessage;
    console.log(message);

    function Talk(message) {
      this.message = message;
      this.date = new Date();
    }
    $scope.Lists = [];

    $scope.sendMessage = function(msg){
      //console.log("$scope.msg : " + msg.my); SD
      var newMessage = msg.my;
      if(newMessage == undefined){
        alert("please input message");
        $scope.msg.my = "";
      }else{
        //var date = new Date();
        $scope.messageClass = "msg my";
        //class="msg my"
        //var getDate = $filter('date')(new Date(), 'MMM d, y h:mm a');
        //var html = "<p>" + newMessage + "</p>";
        //html += "<p class='right date'>"+ getDate +"</p>";
        //console.log(html);
        var setNewTalk = new Talk(newMessage);
        $scope.Lists.push(setNewTalk);
        console.log(setNewTalk);
      }
      $scope.msg.my = "";
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
    }
  })

  .controller('VideoCtrl', function ($scope, Videos) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.videos = Videos.all();
    $scope.remove = function (video) {
      Videos.remove(video);
    };
  })

  .controller('VideoDetailCtrl', function ($scope, $stateParams, Videos) {
    $scope.video = Videos.get($stateParams.videoId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };

  });
