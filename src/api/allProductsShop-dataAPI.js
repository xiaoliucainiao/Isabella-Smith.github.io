// 后端
// 回显
Mock.mock('api/showShop','post',function(){
 let place =  localStorage.place
 let Type = localStorage.Type
 if((place&&Type)==''||(place&&Type)==undefined||(place&&Type)=='[]'){
    return
 }
 place=JSON.parse(localStorage.place);
 Type = JSON.parse(localStorage.Type);
 return[place,Type]
})
// 新增
Mock.mock('api/Shop','post',function(e){
    // 接收数据
    let data =JSON.parse(e.data);
    //获取本地判断
    let Shop = localStorage.Shop
    if(Shop==''||Shop==undefined||Shop=='[]'){
        //无数据直接存储
        data.id=1;
        localStorage.Shop=JSON.stringify([data])
        return true
    }
    //判断图片是否重复
    Shop = JSON.parse(Shop)
    for(let i = 0 ; i < Shop.length ; i++){
        if(Shop[i].img==data.img){
            return false
        }
    }
    //id自增
    data.id=TopId(Shop)
    //追加数据
    Shop.push(data);
    localStorage.Shop=JSON.stringify(Shop);
})
//回显
Mock.mock('api/show','post',function(){
   //获取本地数值
   let data =localStorage.Shop;
   if(data==''||data=="[]"||data==undefined){
    return 1
   }
   return JSON.parse(data);
})
//单独删除
Mock.mock('api/dele','post',function(e){
    let index = e.data
    let data = JSON.parse(localStorage.Shop);
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].id==index){
            data.splice(i,1)
        }
    }
    // data.splice(index,1)
    localStorage.Shop=JSON.stringify(data);
    return
})
//单独修改
Mock.mock('api/modify','post',function(data){
    let datas = JSON.parse(data.data) ;
    let index = datas[1];
    let newdata =datas[0];
    //获取本地
   let Shop = JSON.parse(localStorage.Shop)
   for(let i = 0 ; i < Shop.length ; i++){
    if(Shop[i].id==index){
        Shop.splice(i,1,newdata)
    }
}
//    Shop.splice(index,1,newdata)
   localStorage.Shop=JSON.stringify(Shop)
})
//批量修改
Mock.mock("/api/modifysAfter","post",function(data){
    //标记下标
  let index
  //标记内容
  let e;
  //获取本地
let datas = JSON.parse(localStorage.Shop);
//对比id
for(let i = 0 ; i < datas.length ; i++){
      if(datas[i].id==data.data){
          index=i
          e=datas[i]
      }
  }
  //返回数据
  return[e,index]
})
//批量删除
Mock.mock("/api/deleAfter","post",function(i){
    //获取本地
   let id =JSON.parse(i.data) 
    let data = JSON.parse(localStorage.Shop);
    //遍历对比id
    for(let i = 0 ; i< id.length; i++){
        for(let j = 0 ; j<data.length ;j++){
            if(id[i]==data[j].id){
                data.splice(j,1)
            }
        }
    }
   localStorage.Shop=JSON.stringify(data );
})
  //地区回显
  function places(e){
     //遍历本地
   let data=JSON.parse(localStorage.place)
   for(let i = 0 ; i< data.length; i++){
    if(data[i].placeID==e){
        return data[i].place
    }
   }
  }
  //分类回显
  function tpe(e){
      //遍历本地
   let data=JSON.parse(localStorage.Type)
   for(let i = 0 ; i< data.length; i++){
    if(data[i].TypeID==e){
        return data[i].Type
    }
   }
  }
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