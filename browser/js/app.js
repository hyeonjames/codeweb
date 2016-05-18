import angular from 'angular';
import router from 'angular-ui-router';
import sanitize from 'angular-sanitize';

let app = angular.module('myApp',['ui.router','ngSanitize']);

app.config(['$stateProvider','$urlRouterProvider',
($state,$router)=>{
    $state
    .state('sign',{
        url : '/sign',
        views : {
            "content" : {
                templateUrl : 'views/signin.html',
                controller : 'signCtrl'
            }
        }
    })
    .state('home',{
        url : '/home',
        views : {
            "content" : {
                templateUrl : 'views/home.html',
                controller : 'homeCtrl'
            }
        }
    })
    .state('welcome',{
        url : '/welcome',
        templateUrl : 'views/welcome.html',
        controller : 'welcomeCtrl'
    })
    .state('auth',{
        url : '/auth/:accNo/:registCode',
        templateUrl : 'views/auth.html',
        controller : 'authCtrl'
    });
    $router.otherwise('/home');
}]);

require('./controllers.js')(app);
require('./directives.js')(app);
require('./factories.js')(app);