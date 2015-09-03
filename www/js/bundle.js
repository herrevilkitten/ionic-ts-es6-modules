System.register("main.js", ["controllers.js", "services.js"], function(_export) {
  "use strict";
  var starterControllers,
      starterServices;
  return {
    setters: [function(_controllers) {
      starterControllers = _controllers["default"];
    }, function(_services) {
      starterServices = _services["default"];
    }],
    execute: function() {
      _export("default", angular.module('starter', ['ionic', 'ionic.service.core', 'ngCordova', starterControllers.name, starterServices.name]).run(["$ionicPlatform", function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
          }
          if (window.StatusBar) {
            window.StatusBar.styleLightContent();
          }
        });
      }]).config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        }).state('tab.dash', {
          url: '/dash',
          views: {'tab-dash': {
              templateUrl: 'templates/tab-dash.html',
              controller: 'DashCtrl'
            }}
        }).state('tab.chats', {
          url: '/chats',
          views: {'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'ChatsCtrl'
            }}
        }).state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {'tab-chats': {
              templateUrl: 'templates/chat-detail.html',
              controller: 'ChatDetailCtrl'
            }}
        }).state('tab.account', {
          url: '/account',
          views: {'tab-account': {
              templateUrl: 'templates/tab-account.html',
              controller: 'AccountCtrl'
            }}
        });
        $urlRouterProvider.otherwise('/tab/dash');
      }]));
    }
  };
});

System.register("services.js", [], function(_export) {
  'use strict';
  var ChatsFactory;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      ChatsFactory = function ChatsFactory() {
        _classCallCheck(this, ChatsFactory);
        var chats = [{
          id: 0,
          name: 'Ben Sparrow',
          lastText: 'You on your way?',
          face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
          id: 1,
          name: 'Max Lynx',
          lastText: 'Hey, it\'s me',
          face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
          id: 2,
          name: 'Adam Bradleyson',
          lastText: 'I should buy a boat',
          face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
          id: 3,
          name: 'Perry Governor',
          lastText: 'Look at my mukluks!',
          face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
          id: 4,
          name: 'Mike Harrington',
          lastText: 'This is wicked good ice cream.',
          face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];
        return {
          all: function all() {
            return chats;
          },
          remove: function remove(chat) {
            chats.splice(chats.indexOf(chat), 1);
          },
          get: function get(chatId) {
            for (var i = 0; i < chats.length; i++) {
              if (chats[i].id === parseInt(chatId)) {
                return chats[i];
              }
            }
            return null;
          }
        };
      };
      _export('default', angular.module('starter.services', []).service('Chats', ChatsFactory));
    }
  };
});

System.register("controllers.js", [], function(_export) {
  'use strict';
  var DashCtrl,
      ChatsCtrl,
      ChatDetailCtrl,
      AccountCtrl;
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  return {
    setters: [],
    execute: function() {
      DashCtrl = function DashCtrl($scope) {
        _classCallCheck(this, DashCtrl);
      };
      ;
      ChatsCtrl = function ChatsCtrl($scope, Chats) {
        _classCallCheck(this, ChatsCtrl);
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
          Chats.remove(chat);
        };
      };
      ChatDetailCtrl = function ChatDetailCtrl($scope, $stateParams, Chats) {
        _classCallCheck(this, ChatDetailCtrl);
        $scope.chat = Chats.get($stateParams.chatId);
      };
      AccountCtrl = function AccountCtrl($scope) {
        _classCallCheck(this, AccountCtrl);
        $scope.settings = {enableFriends: true};
      };
      _export('default', angular.module('starter.controllers', []).controller('DashCtrl', DashCtrl).controller('ChatsCtrl', ChatsCtrl).controller('ChatDetailCtrl', ChatDetailCtrl).controller('AccountCtrl', AccountCtrl));
    }
  };
});
