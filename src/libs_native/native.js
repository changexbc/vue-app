/**
 * Created by diva on 2015/7/23.
 */

var Daze = {
    navigator:{
        useWebNavigation: function(){
            return false
        }
    },
    dazeClientVersion: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D167/DazeClient_For_iOS_75000_3.6.0',
    geolocation: {
        getGPSCity: function (obj, callback) {
            if (callback) {
                callback({
                    id: 92,
                    city: '杭州',
                    province: '浙江省',
                    coords: {
                        latitude: 0,
                        longitude: 0
                    }
                });
            }
        },
        getCurrentPosition: function (callback) {
            if (callback) {
                callback({
                    id: 92,
                    city: '杭州',
                    province: '浙江省',
                    coords: {
                        latitude: 0,
                        longitude: 0
                    }
                });
            }
        },
        getSelectCity:function(object,callback){
            if (callback) {
                callback({
                    cityId: 92,
                    city: '杭州'
                });
            }
        }
    },
    system: {
        addObserver: function (obj) {
        },
        postObserver: function (obj) {
        }
    },
    network: {
        getType: function (callback) {
            if (callback) {
                callback({
                    isOnline: true
                });
            }
        }
    },
    setTitle: function (title) {
        document.title = title;
    },
    showOptionMenu: function (obj, callback) {
        if (callback) {
            var $menu = $('#menu');
            if ($menu.length) {
                $menu.click(callback);
            }
        }
    },
    showMsg: function (params) {
        alert(params);
    },
    pushWindow: function (params) {
        if (_.isObject(params)) {
            var href = window.location.href;
            window.location.href = href.split('dev/')[0] + 'dev/' + params.appId + '/app/' + params.url;
        } else if (_.isString(params)) {
            window.location.href = params;
        }
    },
    showSelectWin: function (couponList, callback) {
        callback({})
    },
    share: function (params, callback) {
        if (callback) {
            callback({
                isSuccess: true
            })
        }
    },
    pay: function (params, callback) {
        if (callback) {
            callback({
                isSuccess: true
            })
        }
    },
    photo: function (obj, callback) {
        if (callback) {
            callback({
                url: 'http://img.junrongtang.com/car_service_fine/1508041751560.jpg'
            });
        }
    },
    popTo: function (search) {
        history.back(search);
    },
    login: function (callback) {
        if (callback) {
            callback({
                isSuccess: true,
                pid: 42,
                uid: 9312,
                userId: 5123753
            });
        }
    },
    chat: function (callback) {
        if (callback) {
            callback();
        }
    },
    closeWindow: function(){
        alert('closeWindow')
    }
};

module.exports = Daze
