//后端
//新闻区
Mock.mock("api/dynamic", "post", function () {
  //获取本地数据
  let data = localStorage.dynamic;
  if (data == "" || data == "[]" || data == undefined) {
    return false;
  }
  data = JSON.parse(localStorage.dynamic);
  return data;
});
//赞助商
Mock.mock('api/friendlink','post',function(){
    //获取本地
    let data =  localStorage.friendlink;
    if(data==''||data==undefined||data=='[]'){
       return false
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