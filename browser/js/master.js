
import angular from 'angular';
import {Promise} from 'bluebird';
import uirouter from 'angular-ui-router';
import sanitize from 'angular-sanitize';

let app = angular.module('myApp',['ui.router','ngSanitize']);


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


app.controller('masterCtrl',['$scope','$api',($s,$api)=>{
    
}]);