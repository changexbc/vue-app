import md5 from './md5.js'

const getQueryString = function (url) {
    if (url) {
        url = url.substr(url.indexOf("?") + 1);
    }
    let result = {}, queryString = url || location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
    }

    return result;
}
const rules = {
    IDCard(val){
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
    },
    password(val){
        return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}/.test(val);
    },
    tel(val) {
        return /^(\+86([\s-])?)?1\d{10}$/.test(val);
    },
    number(val) {
        return /^[0-9]*$/.test(val);
    },
    email(val) {
        return /^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);
    },
    licence(val) {
        return /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/.test(val);
    }
}

export {
    getQueryString,
    rules
}
