angular.module('starter.services', [])
.factory('Recipes', function($http) {
  var key = '27bd680f67309da824f11f37386ea0bd';
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  var searchUrl = 'http://food2fork.com/api/search?key=' + key + '&q='
  var getRecipeUrl = 'http://food2fork.com/api/get?key=' + key + '&rId=';
  // Might use a resource here that returns a JSON array
  // Some fake testing data




  return {
    get: function(recipeId) {
      return   $http({
          method: 'GET',
          url: proxyUrl + getRecipeUrl + recipeId
        }).then(function successCallback(response) {
            var recipe = response.data;
            return recipe;
          }, function errorCallback(response) {
            console.log(response);
          });
    },
    search: function(queries){
      return   $http({
          method: 'GET',
          url: proxyUrl + searchUrl + queries.join(',')
        }).then(function successCallback(response) {
            var recipe = response.data;
            return recipe;
          }, function errorCallback(response) {
            console.log(response);
          });
    }
  };
})
.factory('AuthService', function(){
  function getCurrentUser() {
    return firebase.auth().currentUser;
  }

    return {
            getCurrentUser: function() {
                return getCurrentUser();
            },

            onAuthStateChanged: function(callback) {
                return firebase.auth().onAuthStateChanged(callback);
            },

            isUserLoggedOn:function() {
                return  (getCurrentUser()==null) ? false : true;
            },

            signupEmail: function(newEmail, newPassword) {
                var authUserPromise = firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword);
                return authUserPromise;
            },

            loginUser: function(email, password) {
                var authUserPromise = firebase.auth().signInWithEmailAndPassword(email, password)
                return authUserPromise;
            },
            loginUserAnnon: function() {
                var authUserPromise = firebase.auth().signInAnonymously();
                return authUserPromise;
            },
            logoutUser: function(email, password) {
                var authUserPromise = firebase.auth().signOut();
                return authUserPromise;
            },
            resetPassword: function(emailtoReset) {
                var resetPasswordPromise = firebase.auth().sendPasswordResetEmail(emailtoReset);
                return  resetPasswordPromise;
            },
            reauthenticate: function(credential){
              var user = getCurrentUser();

              user.reauthenticate(credential).then(function(response){
                return response;
                }).catch(function(err){
                return err;
              });
            },
            updateEmail: function(user, email) {
                user.updateEmail(email).then(function() {
                }, function(error) {
                });
              },
              updatePassword: function(password){
                var user = getCurrentUser();
                user.updatePassword(password).then(function() {
                  // Update successful.
                }, function(error) {
                  // An error happened.
                });
              }

        }
});
