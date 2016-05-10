
import angular from 'angular';
import {Promise} from 'bluebird';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';

let app = angular.module('myApp',['ui.router','ngSanitize']);

app.config(['$stateProvider','$urlRouterProvider',
($state,$router)=>{
    $state
    .state('sign',{
        url : '/sign',
        templateUrl : 'views/signin.html'
    })
    .state('')
}])

app.factory('$api',['$http','$q', ($http,$q)=>{
    function request(method,url, data ) {
        var q = $q.defer();
        $http({
           url : url,
           method : method,
           data : data 
        }).then((json)=>{
            if(json && json.error){
                //
                console.log(json);
                alert(json.message);
                q.reject(json);
            }
            else {
                q.resolve(json);
            }
        },(...args)=>{
            q.reject(...args);
        });
        return q.promise;
    }
    let api = (...args)=>{
        return request('POST',...args);
    }
    api.get = (...args)=>{
        return request('GET',...args);
    }
    return api;
}]);

let userInfo = {};
app.factory('$core',['$api',($api)=>{
    
    return {
        update : function (){
            $api.get('/api/accounts')
            .then(function (info){
                userInfo = info;
                
            });
        },
        info : function (){
            return userInfo;
        }
    }
}]);

app.controller('masterCtrl',['$scope','$api',($s,$api)=>{
    var menuList = [
        { text : '' }
    ];
    $s.menuList = menuList;
    $s.val = {
        email : '',
        pw : ''
    }
    $s.signin = function (){
        
    }
    $s.signup = function (){
        $api('/accounts/join',{
            email : $s.val.email,
            pw : $s.val.pw
        }).then(function (result){
            if(result > 0){
                location.href = '#/welcome';
            }
        });
    }
    
}]);