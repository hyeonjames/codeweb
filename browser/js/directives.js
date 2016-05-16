import app from './index.js';
import {Promise} from 'bluebird';

app.directive('articleList',['$api',($api)=>{
    return {
        restrict : 'E',
        templateUrl : '/views/board.html',
        link : (scope,elem,attr)=>{
            let count = Number(attr.count) || 10;
            $.extend(scope,{
                bind(page){
                    let boardNo = Number(attr.no);
                    if(isNaN(boardNo)){
                        return false;
                    }
                    $api.get(`/api/articles/${boardNo}/${page}/${count}`)
                    .then((records)=>{
                        scope.list = records;
                    });
                    return true;
                }
            });
        }
    }
}]);