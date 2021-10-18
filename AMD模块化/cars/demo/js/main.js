

/*
    配置引入文件的路径
*/
require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        'parabola':'parabola',
        'index':'index',
        'banner':'banner'
    },
    shim:{
        // 设置依赖关系，先引入jquery，后续再去加载jquery-cookie
        'jquery-cookie':['jquery']
    }
})

// AMD依赖前置
require(['index','banner'],function(index,banner){
    index.index()  // 实现了购物车的功能
    banner.banner() // 实现了轮播图的功能
})