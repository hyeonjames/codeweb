
import {Promise} from 'bluebird';

module.exports = (app) => {
    app.controller('masterCtrl', ['$scope', '$api', '$session', ($s, $api, $ses) => {
        var menuList = [
            { text: '' }
        ];
        $s.menuList = menuList;
        $s.init = function () {
            $ses.update();
        }
        $s.user = $ses.info();

        $.extend($s, {
            signin() {
                location.href = '#/sign';
            },
            val: {
                searchKey: '',
                searchMode: false
            }
        });
    }]);
    app.controller('signCtrl', ['$scope', '$api', '$session', ($s, $api, $ses) => {
        let user = $ses.info();
        if (user.level > 0) {
            alert('이미 로그인한 상태입니다.');
            location.href = '#/home';
        }
        $s.val = {
            email: '',
            pw: ''
        }
        $s.signin = function () {
            $ses.signin({ email: $s.val.email, pw: $s.val.pw })
                .then((succ) => {
                    if (!succ) {
                        alert('아이디 혹은 비밀번호를 확인해주세요.');
                    } else {
                        location.href = '#/home';
                    }
                });
        }
        $s.signup = function () {
            $api('/api/accounts/signup', {
                email: $s.val.email,
                pw: $s.val.pw
            }).then(function (result) {
                if (result > 0) {
                    location.href = '#/welcome';
                } else if (result == 0) {
                    alert('이미 가입한 이메일입니다.');
                }
            });
        }


    }]);

    app.controller('homeCtrl', ['$scope', '$api', '$session', ($s, $api, $ses) => {

    }]);

    app.controller('welcomeCtrl', ['$scope', '$api', '$session', ($s, $api, $ses) => {
        $s.user = $ses.info();
    }]);

}