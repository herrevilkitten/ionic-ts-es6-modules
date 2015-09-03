/// <reference path="../typings/tsd.d.ts" />

class DashCtrl {
  constructor($scope) {

  }
}

// With the new view caching in Ionic, Controllers are only called
// when they are recreated or on app start, instead of every page change.
// To listen for when this page is active (for example, to refresh data),
// listen for the $ionicView.enter event:
//
//$scope.$on('$ionicView.enter', function(e) {
//});
class ChatsCtrl {
  constructor($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  }
}

class ChatDetailCtrl {
  constructor($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  }
}

class AccountCtrl {
  constructor($scope) {
    $scope.settings = {
      enableFriends: true
    }
  }
}

export default angular.module('starter.controllers', [])
  .controller('DashCtrl', DashCtrl)
  .controller('ChatsCtrl', ChatsCtrl)
  .controller('ChatDetailCtrl', ChatDetailCtrl)
  .controller('AccountCtrl', AccountCtrl);
