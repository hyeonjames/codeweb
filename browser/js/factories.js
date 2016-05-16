import app from './index.js';
import {Promise} from 'bluebird';

app.factory('$api',['$http','$q', ($http,$q)=>{
    function request(method,url, data ) {
        var q = $q.defer();
        $http({
           url : url,
           method : method,
           data : data 
        }).then((json)=>{
            var data = json.data;
            if(data && data.error){
                //
                console.log(data);
                alert(data.message);
                q.reject(data);
            }
            else {
                q.resolve(data);
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

let userInfo = {
    name : 'guest',
    level : 0,
    load : false
};
app.factory('$session',['$api',($api)=>{
    
    return {
        update : function (){
            return $api.get('/api/accounts')
            .then(function (info){
                $.extend(userInfo,info);
                userInfo.load = true;
            });
        },
        signin : function (info){
            return new Promise((resolve,reject)=>{
                
                $api('/api/accounts/signin',{
                    email : info.email,
                    pw : info.pw
                }).then((result)=>{
                    if(result == 0){
                        resolve(false);
                    } else {
                        $.extend(userInfo,result);
                        resolve(true);
                    }
                }, reject);
                
            });
        },
        info : function (){
            return userInfo;
        }
    }
}]);
