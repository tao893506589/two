//   通过requrie.config()管理当前html上的所有的模块

    require.config({
       paths:{
           add:'add',          // 写路径   不需要加./和后缀名
            jian:'jian'
       } 
    })

    require(['add','jian'],function(add,jian){              // 引入的时候要加''
        console.log(add.outadd(1,1));
        console.log(jian.outjian(1,2));
    })