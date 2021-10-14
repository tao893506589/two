// 这个文件是我们的库文件
// 封装函数的原则：变化的内容提取成参数 不变的内容可以写死在函数内
var QF = {
    /* url是URL   
        obj: 对象 key是querystring的key value是querystring的value 

    */
    //  key=value&key1=value1 这样的字符串格式叫做querystring 也叫作查询串
    get(url, obj, callback) {
        // 将obj 转换为 querystring
        // 假设 obj是{a:1, b: 2, c: 3}  
        // 则我需要得到的字符串应该是: a=1&b=2&c=3 
        var str = "";
        for (var i in obj) {
            str += i + "=" + obj[i] + "&";
            // 第一次循环 i是a obj[i]是1 str => a=1&
            // 第二次循环 i是b obj[i]是2 str => a=1&b=2&
            // 第三次循环 i是c obj[i]是3 str => a=1&b=2&c=3&
        }
        // 去掉尾巴的&
        str = str.slice(0, -1);


        var xhr = new XMLHttpRequest();
        xhr.open("get", url + "?" + str, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
    },
    post(url, obj, callback) {
        // 将obj 转换为 querystring
        // 假设 obj是{a:1, b: 2, c: 3}  
        // 则我需要得到的字符串应该是: a=1&b=2&c=3 
        var str = "";
        for (var i in obj) {
            str += i + "=" + obj[i] + "&";
            // 第一次循环 i是a obj[i]是1 str => a=1&
            // 第二次循环 i是b obj[i]是2 str => a=1&b=2&
            // 第三次循环 i是c obj[i]是3 str => a=1&b=2&c=3&
        }
        // 去掉尾巴的&
        str = str.slice(0, -1);


        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send( str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(JSON.parse(xhr.responseText))
            }
        }
    }
}

// QF.get() 就可以发送一个get请求
// QF.post() 就可以发送一个post请求
