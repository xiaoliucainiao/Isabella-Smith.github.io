//登录
Mock.mock('api/user','post',function(e){
    let user = JSON.parse(e.data)
    //获取本地存储
    let data = localStorage.user;
    if(data==''||data=='[]'||user==undefined){
        //先注册
        return false
    }
    data = JSON.parse(data);
    //调用时间
    var time = new Date();
    // 设置cooklie失效时间
    time.setTime(time.getTime() +60*1000);
    //遍历
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].user==user.id&&data[i].password==user.pas){
            if(user.state){
                //存入kookie 设置1分钟
                document.cookie=`user=${user.id};expires=${time.toUTCString()}`
                return true
            }else{
                //存入kookie 存入会话
                document.cookie=`user=${user.id}`
                return true
            }
        }
    }
})
//注册
Mock.mock('api/logo','post',function(e){
    let user = JSON.parse(e.data)
    //获取本地存储
    let data = localStorage.user;
    if(data==''||data=='[]'||data==undefined){
        //直接存储数据
        localStorage.user = JSON.stringify([user])
        return true
    }
    data = JSON.parse(data);
    //遍历
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].user==user.user){
            return false
        }
    }
    //存入本地存储
    data.push(user)
    localStorage.user = JSON.stringify(data)
    return true

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