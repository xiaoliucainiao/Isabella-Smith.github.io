// 轮播图
Mock.mock('api/lunbos','post',function(){
    //声明数组
    let arr=[]
    let arrtitle =[]
    let arrherf=[]
    let arrtext =[]
    //获取本地图片
    let data = localStorage.lunbo
    if(data==''||data==undefined||data=='[]'){
        return 1
    }
    data=JSON.parse(localStorage.lunbo);
    //遍历存入数据
    for(let i = 0 ; i < data.length ; i++ ){
        arr.push('../../public/images/lunbo/'+data[i].img)
        arrtitle.push(data[i].title)
        arrherf.push(data[i].herf)
        arrtext.push(data[i].text)
    }
    return [arr,arrtitle,arrherf,arrtext]
})
// 关于我们
Mock.mock('api/Our','post',function(){
    //获取本地
    let data = localStorage.Our
    if(data==''||data=='[]'||data==undefined){
        return 1
    }
     data =JSON.parse(localStorage.Our) 
    return data
})
//热卖商品1
Mock.mock('api/shopp','post',function(){
    //获取本地存储
let data = localStorage.Shop
if(data==''||data=='[]'||data==undefined){
    return false
}
data = JSON.parse(localStorage.Shop)
return data

})
// 热卖商品2
Mock.mock('api/hotSelling','post',function(){
    //获取本地
    let data = localStorage.hotSelling;
    if(data==''||data=='[]'||data==undefined){
        return
    }
    data=JSON.parse(localStorage.hotSelling);
    return data
})
// 热卖商品2右图
Mock.mock('api/hotSellingR','post',function(){
   //获取本地
   let data = localStorage.hotSellingR
   if(data==''||data=='[]'||data==undefined){
    return
    }
    data=JSON.parse(localStorage.hotSellingR);
    return data
})
//背景附着上图
Mock.mock('api/bglistT','post',function(){
   //获取本地
   let data = localStorage.bglistT
   if(data==''||data=='[]'||data==undefined){
    return
    }
    data=JSON.parse(localStorage.bglistT);
    return data
})
//背景图片中
 Mock.mock('api/bglistC','post',function(){
        //获取本地
        let data = localStorage.bglistC
        if(data==''||data=='[]'||data==undefined){
         return
         }
         data=JSON.parse(localStorage.bglistC);
         return data
})
//背景图片下
Mock.mock('api/bglistB','post',function(){
 //获取本地
 let data =  localStorage.bglistB;
 if(data==''||data==undefined||data=='[]'){
    return
 }
 data=JSON.parse(localStorage.bglistB);
         return data
})
//赞助商
Mock.mock('api/friendlink','post',function(){
    //获取本地
    let data =  localStorage.friendlink;
    if(data==''||data==undefined||data=='[]'){
       return
    }
    data=JSON.parse(localStorage.friendlink);
            return data
   })
   //强制登录以及免密登录
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