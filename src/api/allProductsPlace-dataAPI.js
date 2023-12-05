// 后端
// 新增
Mock.mock('api/place','post',function(e){
    // 接收数据
    let data =JSON.parse(e.data);
    //获取本地判断
    let place = localStorage.place
    if(place==''||place==undefined||place=='[]'){
        //无数据直接存储
        data.id=1;
        localStorage.place=JSON.stringify([data])
        return true
    }
    //判断地区和id是否重复
    place = JSON.parse(place)
    for(let i = 0 ; i < place.length ; i++){
        if(place[i].place==data.place||place[i].placeID==data.placeID){
            return false
        }
    }
    //id自增
    data.id=TopId(place);
    place.push(data)
    localStorage.place=JSON.stringify(place);
})
//回显
Mock.mock('api/show','post',function(){
   //获取本地数值
   let data =localStorage.place;
   if(data==''||data=="[]"||data==undefined){
    return 1
   }
   return JSON.parse(data);
})
//单独删除
Mock.mock('api/dele','post',function(e){
    let id = e.data
    let data = JSON.parse(localStorage.place);
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].id==id){
            data.splice(i,1)
        }
    }
    localStorage.place=JSON.stringify(data);
    return
})
//单独修改
Mock.mock('api/modify','post',function(data){
    let datas = JSON.parse(data.data) ;
    let index = datas[1];
    let newdata =datas[0];
    //获取本地
   let place = JSON.parse(localStorage.place)
//    for(let i = 0 ; i < place.length ; i++){
//     debugger
//     if(place[i].place==newdata.place||place[i].placeID==newdata.placeID){
//         return false
//     }
// }
for(let i = 0 ; i < place.length ; i++){
    if(place[i].id==index){
        place.splice(i,1,newdata)
    }
}
//    place.splice(index,1,newdata)
   localStorage.place=JSON.stringify(place)
})
//批量修改
Mock.mock("/api/modifysAfter","post",function(event){
    //标记下标
  let index
  //标记内容
  let e;
  //获取本地
let datas = JSON.parse(localStorage.place);
//对比id
for(let i = 0 ; i < datas.length ; i++){
      if(datas[i].id==event.data){
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
    let data = JSON.parse(localStorage.place);
    //遍历对比id
    for(let i = 0 ; i< id.length; i++){
        for(let j = 0 ; j<data.length ;j++){
            if(id[i]==data[j].id){
                data.splice(j,1)
            }
        }
    }
   localStorage.place=JSON.stringify(data );
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
