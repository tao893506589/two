 // 获取n天后的日期
 function afterData(n){
    var d = new Date()
    var date = d.getDate()
    d.setDate(date+n)
    return d
}

function setCookie(name,value,{expires,path,domain,secure}){
    var cookieStr = encodeURIComponent(name)+'='+encodeURIComponent(value)
    if(expires){
        cookieStr += ';expires='+afterData(expires)
    }
    if(path){
        cookieStr += ';path='+path
    }
    if(domain){
        cookieStr += ';domain='+domain
    }
    if(secure){
        cookieStr += ';secure'
    }
    document.cookie = cookieStr
}


function getCookie(name){
    var cookieStr = decodeURIComponent(document.cookie) // 'username=钢铁侠; password=123'
    var start = cookieStr.indexOf(name+'=')
    if(start === -1){
        return null
    }
    //查询从start位置开始遇到第一个分号
    let end = cookieStr.indexOf(';',start)
    if(end === -1){
        end = cookieStr.length
    }
    // 需要进行字符串的提取 
    var str = cookieStr.substring(start,end)
    var arr = str.split('=')
    return arr[1]
}


function removeCookie(name){
    document.cookie = encodeURIComponent(name)+'=;expires='+new Date(0)
}


function $cookie(name){
    // 判断传入参数的个数
    switch(arguments.length){
        case 1:
            return getCookie(name)
        case 2:
            if(arguments[1] === null){ //进行cookie删除
                removeCookie(name)
            }else{
                setCookie(name,arguments[1],{}) //进行cookie设置
            }
            break;
        case 3:
            setCookie(name,arguments[1],arguments[2])
            break;
        default:
            break;
    }
}