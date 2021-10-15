// 原生模块  在黑窗口写东西    readline()    基本用不到

//   在黑窗口打印一句话   然后回答  最后将问题和回答在打印一遍
const readline = require("readline")
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.question("hahahahahah?",(answer)=>{
    console.log(`hahahahaha ${answer}`);
    rl.close()
})