angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user = user;
    } else {
      $state.go('login')
    }
  });

})

.controller('RecipesCtrl', function($scope, Recipes) {
  $scope.data = {};



$scope.addToInventory = function(){
  if($scope.data.inventory === undefined){
    $scope.data.inventory = [];
    if(!$scope.data.inventory.includes($scope.data.add)){
      $scope.data.inventory.push($scope.data.add);
      $scope.data.add = '';
    } else {
      console.log('already there...');
      $scope.data.add = '';
    }
} else {
  if(!$scope.data.inventory.includes($scope.data.add)){
    $scope.data.inventory.push($scope.data.add);
    $scope.data.add = '';
  } else {
    console.log('already there...');
    $scope.data.add = '';
  }
}
}

$scope.search = function(){
  var queries = $scope.data.inventory;
  Recipes.search(queries).then(function(data){
  $scope.data.recipes = data.recipes;
  })
}
})

.controller('RecipeDetailCtrl', function($scope, $stateParams, Recipes) {
  Recipes.get($stateParams.recipeId).then(function(recipe){
    $scope.recipe = recipe.recipe;
  });
})
.controller('LoginCtrl', function($scope, $state ) {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $state.go('tabs.dash');
    } else {
      $state.go('login')
    }
  });

  $scope.login = function(login) {
    firebase.auth().signInWithEmailAndPassword(login.email, login.password).then(function(response) {
      $state.go('tabs.dash');
    }).catch(function(error) {
      $state.reload();
      $scope.errorCode = error.code.split('/')[1];
      $scope.errorMessage = error.message;
    });
  }
})
.controller('SignupCtrl',function($scope, $state, AuthService) {
    $scope.data = {};
    $scope.back = function() {
        $state.go('welcome');
    }
    function checkPassword() {
        return $scope.data.confirmPassword == $scope.data.password;
    }

    function clearPassword() {
        $scope.data.password = "";
        $scope.data.confirmPassword = "";
    }

    $scope.createUser = function() {
      if(checkPassword()){
        AuthService.signupEmail($scope.data.email, $scope.data.password);
        clearPassword();
        $state.go('tab.dash');
      }
        }
})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
