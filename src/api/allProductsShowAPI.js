//后端
Mock.mock('api/sho','post',function(){
    // 获取本地
    let dataplace = localStorage.place
    let dataType =localStorage.Type
    if((dataplace&&dataType)==''||(dataplace&&dataType)==undefined||(dataplace&&dataType)=='[]'){
        return false
    }
    dataplace = JSON.parse( localStorage.place)
    dataType = JSON.parse(localStorage.Type)
    return [dataplace,dataType]
})
Mock.mock('api/sp','post',function(e){
    let id = e.data
    // 声明数组
    let arr = []
    //获取遍历本地
    let data = localStorage.Shop;
    if(data==''||data=='[]'||data==undefined){
        return
    }
    data = JSON.parse(localStorage.Shop);
    //遍历追加
    for(let i = 0 ; i < data.length; i++){
        if(data[i].TypeID==id){
            arr.push(data[i])
        }
    }
    return arr
})
Mock.mock('api/spl','post',function(e){
    let id = e.data
    // 声明数组
    let arr = []
    //获取遍历本地
    let data = localStorage.Shop;
    if(data==''||data=='[]'||data==undefined){
        return
    }
    data = JSON.parse(localStorage.Shop);
    //遍历追加
    for(let i = 0 ; i < data.length; i++){
        if(data[i].placeID==id){
            arr.push(data[i])
        }
    }
    return arr
})
Mock.mock('api/shop','post',function(e){
    let id = e.data
    //获取本地数据
    let data = localStorage.Shop;
    let newdata = localStorage.shopping
    if(newdata==''||newdata=='[]'||newdata==undefined){
        data = JSON.parse(localStorage.Shop)
        for(let i = 0 ; i< data.length ;i++){
            if(data[i].id==id ){
                localStorage.shopping=JSON.stringify([data[i]])
            }
        }
        return
    }
    newdata = JSON.parse(localStorage.shopping)
    data = JSON.parse(localStorage.Shop)
    for(let j = 0 ; j <  data.length ; j++){
            if(data[j].id==id){
                for(let k = 0 ; k < newdata.length;k++){
                    if(data[j].id==newdata[k].id){
                        return 1
                    }
                }
                newdata.push(data[j])
                localStorage.shopping=JSON.stringify(data)
            // localStorage.shopping=JSON.stringify(data)
        }
    }
    return
    // for(let j = 0 ; j< data.length ;j++){
    //     if(data[j].id==id){
    //         data.push(data[j])
    //         console.log(123);
    //         // localStorage.shopping=JSON.stringify(data)
    //     }
    // }
    return
})
//商品回显
Mock.mock('api/show','post',function(){
    //获取本地数据
    let data = localStorage.Shop
    if(data==''||data=='[]'||data==undefined){
        return false
    }
    data=JSON.parse(localStorage.Shop);
    return data
})
//查询
Mock.mock('api/looks','post',function(name){
//获取购物车本地
let data = localStorage.Shop
if(data==''||data==undefined||data=='[]'){
    return false
}
 data= JSON.parse(localStorage.Shop)
 //遍历本地
for(let i = 0 ; i < data.length ; i++){
    if(data[i].name==name.data){
        return data[i]
    }
}
})
Mock.mock("api/cookie","post",function(){
    let bol = false
    //获取本地
    let data =document.cookie.split(';');
    //cookie分割清除空格
    for(let i = 0 ; i < data.length ; i++){
        data[i]=data[i].trim()
        //再次分割获取对应键值对
        data[i]=data[i].split('=')
        if(data[i][0]=='user'){
            bol=true
            break
        }
    }
    return bol
})