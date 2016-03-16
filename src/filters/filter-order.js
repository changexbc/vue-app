const order_status2text = function(status) {
    let text = ''
    switch (status) {
        case -1:
            text = '已删除';
            break;
        case 1:
            text = '无法支付';
            break;
        case 2:
            text = '待支付';
            break;
        case 3:
            text = '已支付';
            break;
        case 4:
            text = '审核信息';
            break;
        case 5:
            text = '待审核';
            break;
        case 6:
            text = '审核失败';
            break;
        case 7:
            text = '审核通过';
            break;
        case 10:
            text = '处理中';
            break;
        case 11:
            text = '处理失败';
            break;
        case 12:
            text = '处理成功';
            break;
        case 13:
            text = '待退款';
            break;
        case 14:
            text = '已退款';
            break;
        case 15:
            text = '确认完成';
            break;
        case 16:
            text = '已评价';
            break;
        case 20:
            text = '已关闭';
            break;
        case 25:
            text = '支付确认中';
            break;
    }
    return text
}
const pay_type2text = function(type) {
    let text = ''
    switch (type) {
        case 1:
            text = '支付宝客户端支付';
            break;
        case 2:
            text = '支付宝网页支付';
            break;
        case 3:
            text = '银联客户端支付';
            break;
        case 4:
            text = '银联网页支付';
            break;
        case 5:
            text = '余额支付';
            break;
        case 6:
            text = '支付宝客户端 & 余额支付';
            break;
        case 7:
            text = '支付宝网页支付 & 余额支付';
            break;
        case 8:
            text = '银联客户端 & 余额支付';
            break;
        case 9:
            text = '银联网页支付 & 余额支付';
            break;
        case 10:
            text = '微信支付';
            break;
        case 11:
            text = '微信支付 & 余额支付';
            break;
        case 12:
            text = '连连科技支付';
            break;
        case 13:
            text = '连连科技网页支付';
            break;
        case 14:
            text = '连连科技支付 & 余额支付';
            break;
        case 15:
            text = '连连科技网页支付 & 余额支付';
            break;
        case 16:
            text = '阿里百川支付';
            break;
        case 17:
            text = '阿里百川支付 & 余额支付';
            break;
    }
    return text
}

export { order_status2text, pay_type2text }
