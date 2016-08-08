// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform,$rootScope, $state) {
  // $state : 상태처리
  //tabHide지정 후 기본은 false

  //ionic view event
  $rootScope.$on("$ionicView.beforeEnter", function(){
    console.log("beforeEnter");
    //alert($state.current.name); //현재 상태를 받는다
    var currentLocation = $state.current.name;
    $rootScope.tabHide = false;
    if(currentLocation =="tab.video-detail" || currentLocation =="tab.chat-detail" )
      $rootScope.tabHide = true;
  })

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url: '/login',
      //abstract: true, //추상화 페이지라 접근 불가능함
      templateUrl: 'views/login.html'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true, //추상화 페이지라 접근 불가능함
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.todo', {
    url: '/todo',
    views: {
      'tab-todo': {
        templateUrl: 'templates/tab-todo.html',
        controller: 'TodoCtrl'
      }
    }
  })
    .state('tab.videos', {
      url: '/videos',
      views: {
        'tab-videos': {
          templateUrl: 'templates/tab-videos.html',
          controller: 'VideoCtrl'
        }
      }
    })
    .state('tab.video-detail', {
      url: '/videos/:videoId',
      views: {
        'tab-videos': {
          templateUrl: 'templates/video-detail.html',
          controller: 'VideoDetailCtrl'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:itemId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback

  //기본시작할때 경로
  $urlRouterProvider.otherwise('/login');

});
