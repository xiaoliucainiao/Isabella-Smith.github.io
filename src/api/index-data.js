// 后端
// 新增
Mock.mock('api/lunbo','post',function(e){
    // 接收数据
    let data =JSON.parse(e.data);
    //获取本地判断
    let lunbo = localStorage.lunbo
    if(lunbo==''||lunbo==undefined||lunbo=='[]'){
        //无数据直接存储
        data.id=1;
        localStorage.lunbo=JSON.stringify([data])
        return true
    }
    //判断图片是否重复
    lunbo = JSON.parse(lunbo)
    for(let i = 0 ; i < lunbo.length ; i++){
        if(lunbo[i].img==data.img){
            return false
        }
    }
    //id自增
    data.id=TopId(lunbo)
    //追加数据
    lunbo.push(data);
    localStorage.lunbo=JSON.stringify(lunbo);
})
//回显
Mock.mock('api/show','post',function(){
   //获取本地数值
   let data =localStorage.lunbo;
   if(data==''||data=="[]"||data==undefined){
    return 1
   }
   return JSON.parse(data);
})
//单独删除
Mock.mock('api/dele','post',function(e){
    let index = e.data
    let data = JSON.parse(localStorage.lunbo);
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].id==id){
            data.splice(i,1)
        }
    }
    localStorage.lunbo=JSON.stringify(data);
    return
})
//单独修改
Mock.mock('api/modify','post',function(data){
    let datas = JSON.parse(data.data) ;
    let index = datas[1];
    let newdata =datas[0];
    //获取本地
   let lunbo = JSON.parse(localStorage.lunbo)
   for(let i = 0 ; i < lunbo.length ; i++){
    if(lunbo[i].id==index){
        lunbo.splice(i,1,newdata)
    }
}
   localStorage.lunbo=JSON.stringify(lunbo)
})
//批量修改
Mock.mock("/api/modifysAfter","post",function(data){
    //标记下标
  let index
  //标记内容
  let e;
  //获取本地
let datas = JSON.parse(localStorage.lunbo);
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
    let data = JSON.parse(localStorage.lunbo);
    //遍历对比id
    for(let i = 0 ; i< id.length; i++){
        for(let j = 0 ; j<data.length ;j++){
            if(id[i]==data[j].id){
                data.splice(j,1)
            }
        }
    }
   localStorage.lunbo=JSON.stringify(data );
})
//查找
Mock.mock("/api/lookFor","post",function(i){
    //获取本地
    let e =JSON.parse(i.data)
        //下标
        let index
        //标记数据
        let bol = false
        // debugger
        if(e==''){
            return 1;
        }
        //获取本地
        let data = JSON.parse(localStorage.lunbo)
        //遍历对比
        for(let i =0 ; i < data.length ; i++){
            if(data[i].title==e){
                bol=true
                index=i
                return [data[i],index]
            }
        }
        if(bol==false){
            return 2;
        }
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
