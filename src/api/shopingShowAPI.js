//后端
Mock.mock('api/sho','post',function(){
    let data= localStorage.shopping;
    if(data==''||data=='[]'||data==undefined){
        return false
    }
    data = JSON.parse(localStorage.shopping);
    return data
})
Mock.mock('api/de','post',function(e){
    let id = e.data
    //获取本地数据
    let data = JSON.parse(localStorage.shopping)
    for(let i = 0 ; i<data.length ; i++){
        if(data[i].id==id){
            data.splice(i,1)
        }
    }
    localStorage.shopping=JSON.stringify(data)
    return
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
        let data = JSON.parse(localStorage.shopping)
        //遍历对比
        for(let i =0 ; i < data.length ; i++){
            if(data[i].name==e){
                bol=true
                index=i
                return [data[i],index]
            }
        }
        if(bol==false){
            return 2;
        }
  })
//批量删除
Mock.mock("/api/deleAfter","post",function(i){
    //获取本地
   let id =JSON.parse(i.data)
    let data = JSON.parse(localStorage.shopping);
    //遍历对比id
    for(let i = 0 ; i< id.length; i++){
        for(let j = 0 ; j<data.length ;j++){
            if(id[i]==data[j].id){
                data.splice(j,1)
            }
        }
    }
   localStorage.shopping=JSON.stringify(data);
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