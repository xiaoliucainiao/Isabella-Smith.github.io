//样式书写
//获取按钮
var leftButton = document.querySelector(".login .left button");
var rightButton = document.querySelector(".login .right button");
//获取显示框
var mask = document.querySelector(".login .masking");
var maskBottom = document.querySelector(".masking .bottom");
//添加事件
leftButton.addEventListener('click',function () {
  mask.style.left = "35px";
  maskBottom.style.zIndex = 0;
});
rightButton.addEventListener ('click',function () {
  mask.style.left = "295px";
  maskBottom.style.zIndex = -1;
});
//获取按钮
var login = document.getElementById("login"); //登录按钮
var id = document.querySelector(".top input[type=text]");
var pas = document.querySelector(".top input[type=password]");
let cks = document.querySelector(".top input[type=checkbox]");
//登录焦点事件
function Focus() {
  var loginId = id.value; //登录id
  var loginPas = pas.value; //登录密码
  // 添加事件
  //失去焦点事件 +正则表达式
  //判断账号
  id.onblur = function () {
    loginId = id.value;
    if (loginId == "") {
      this.placeholder = "请输入账号";
      this.classList.add("warning");
    } else {
      var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
      if (reg.test(loginId)) {
        // 字符串符合规则
      } else {
        // 字符串不符合规则
        alert('账号不符合标准,请输入长度为4到16位且不包含-的特殊字符') ;
      }
    }
  };
  //判断密码
  pas.onblur = function () {
    loginPas = pas.value;
    if (loginPas == "") {
      this.placeholder = "请输入密码";
      this.classList.add("warning");
    } else {
      var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
      if (reg.test(loginPas)) {
        // 字符串符合规则
      } else {
        // 字符串不符合规则
        alert("密码不符合标准,请输入长度为4到16位且不包含-的特殊字符");
      }
    }
  };
}
Focus();
//登录
login.addEventListener('click',function () {
  var loginId = id.value; //登录id
  var loginPas = pas.value; //登录密码
  let ck = cks.checked; //保持登录状态
  var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
  if (reg.test(loginPas) == false) {
    // 字符串不符合规则
    alert("账号或密码不符合标准,请输入长度为4到16位且不包含-的特殊字符");
    return false;
  }
  //判断输入框是否有值
  if (loginId == "" || loginPas == "") {
    if (loginId == "") {
      id.placeholder = "请输入账号";
      id.classList.add("warning");
    }
    if (loginPas == "") {
      pas.placeholder = "请输入密码";
      pas.classList.add("warning");
    }
    return false;
  }
  var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
  if (reg.test(loginPas)) {
    // 字符串符合规则
  } else {
    // 字符串不符合规则
    alert("账号或密码不符合标准,请输入长度为4到16位且不包含-的特殊字符");
    return false;
  }
  json={
    id:loginId,
    pas:loginPas,
    state:ck,
  }
  $.ajax({
    type: "post",
    url: "api/user",
    dataType: "json",
    data: JSON.stringify(json),
    success: function (response) {
      if (response == false) {
        alert("先请注册");
        mask.style.left = "35px";
        maskBottom.style.zIndex = 0;
        return false;
      }else{
        alert('登录成功')
        window.location.href='index.html'
      }
    }
  });
 
  // //加密赋值
  // loginPas=hex_md5(loginPas)
  // //遍历本地数据判断用户是否存在
  // var sum; //标记数据
  // user = user.split(",");
  // for (var i = 0; i < user.length; i++) {
  //   //再次分割
  //   newuser = user[i].split("-");
  //   if (loginId == newuser[1]) {
  //     //判断密码
  //     if (loginPas == newuser[2]) {
  //       sum = 1;
  //       newuser.splice(7,1,time())
  //       let newarr=localStorage.user.split(',')
  //       newarr.splice(i,1,newuser.join('-'))
  //       localStorage.user=newarr
  //       break
  //     }
  //   }
  // }
  // if (sum == 1) {
  // //   //获取本地数据
  // //   let user=localStorage.user.split(',')
  // //  //遍历循环
  // //   for(let i = 0 ; i < user.length ;i++){
  // //     let newuser = user[i].split('-')
      
  // //   } 
  // localStorage.tump=loginId
  //   alert("登录成功正在跳转");
  //   window.location.reload()
  //  window.location.href='user.html' 
  //   return true;
  // } else {
  //   const result = confirm("账号或者密码有误，没有账号？是否注册？");

  //   if (result) {
  //     // 用户点击了确认按钮
  //     // 执行相应的操作
  //     mask.style.left = "35px";
  //     maskBottom.style.zIndex = 0;
  //   } else {
  //     // 用户点击了取消按钮
  //     // 取消操作
  //   }
  //   return false;
  // }
});
//注册模块register
var Id = document.querySelector(".masking .bottom input[type=text]");
var Pas = document.querySelectorAll(".masking .bottom input[type=password]");
var Phone = document.querySelector(".masking .bottom #phon");
var font = document.querySelectorAll('.masking .bottom font');
var radio = document.querySelectorAll(".masking .bottom input[type=radio]");
var number = document.querySelector(".masking .bottom #numb");
var sexs = document.querySelector('.masking .bottom #number')
//添加事件
//焦点事件
function Bfocus() {
  var registerId = Id.value; //注册id
  var registerPas = Pas[0].value; //注册密码
  var confirmPas = Pas[1].value; //注册确认密码
  // 添加事件
  //失去焦点事件 +正则表达式
  //判断账号
  Id.onblur = function () {
    registerId = Id.value;
    if (registerId == "") {
      this.placeholder = "请输入账号";
      this.classList.add("warning");
    } else {
      var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
      if (reg.test(registerId)) {
        // 字符串符合规则
        font[0].style.opacity=0
      } else {
        // 字符串不符合规则
      font[0].style.opacity=1
        return
      }
    }
  };
  //判断密码
  Pas[0].onblur = function () {
    registerPas = Pas[0].value;
    if (registerPas == "") {
      this.placeholder = "请输入密码";
      this.classList.add("warning");
    } else {
      var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
      if (reg.test(registerPas)) {
        // 字符串符合规则
        font[3].style.opacity=0
      } else {
        // 字符串不符合规则
        font[3].style.opacity=1
        return
      }
    }
  };
  Pas[1].onblur = function () {
    registerPas = Pas[1].value;
    if (registerPas == "") {
      this.placeholder = "请输入密码";
      this.classList.add("warning");
    } else {
      var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
      if (reg.test(registerPas)) {
        // 字符串符合规则
        font[4].style.opacity=0
          //确认密码判断
        if(Pas[0].value!==Pas[1].value){
          font[4].style.opacity=1
          return
          }
      } else {
        // 字符串不符合规则
        font[4].style.opacity=1
        return
      }
    }
  };

  Phone.onblur = function () {
    newphone = Phone.value;
    if (newphone == "") {
      this.placeholder = "请输入正确的用户名";
      this.classList.add("warning");
    } else {
      var reg =/^[\u4e00-\u9fa5]+$/;
      if (reg.test(newphone)) {
        // 字符串符合规则
        font[1].style.opacity=0
      } else {
        // 字符串不符合规则
        font[1].style.opacity=1
        return
      }
    }
  };
  number.onblur = function () {
    ber = number.value;
    if (ber == "") {
      this.placeholder = "请输入正确的手机号";
      this.classList.add("warning");
    } else {
      var reg =/^(?:(?:\+|00)86)?1\d{10}$/;
      if (reg.test(ber)) {
        // 字符串符合规则
        font[2].style.opacity=0;
      } else {
        // 字符串不符合规则
        font[2].style.opacity=1
        return
      }
    }
  };
  sexs.onblur = function () {
    ber = sexs.value;
    if (ber == "") {
      this.placeholder = "请输入正确的年龄";
      this.classList.add("warning");
    } else {
      var reg =/^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
      if (reg.test(ber)) {
        // 字符串符合规则
        font[5].style.opacity=0;
      } else {
        // 字符串不符合规则
        font[5].style.opacity=1
        return
      }
    }
  };
}
Bfocus();
//注册按钮正则
document.getElementById('register').addEventListener('click',function(){
    var sum = 0; //正则标记
    var registerId = Id.value; //获得注册id值
    var registerPas = Pas[0].value; //获得密码值
    var confirmPas = Pas[1].value; //获得确认密码值
    let age=number.value//年龄
    let newphone = Phone.value;
    //判断值
    if (registerId == "") {
      Id.placeholder = "请输入账号";
      Id.classList.add("warning");
    }
    var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
    if (reg.test(registerId)) {
      // 字符串符合规则
    } else {
      // 字符串不符合规则
      alert("账号不符合标准,请输入长度为4到16位且不包含-的特殊字符");
      sum++;
    }
    //密码
    if (registerPas == "") {
      Pas[0].placeholder = "请输入密码";
      Pas[0].classList.add("warning");
      sum++;
    }
    var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
    if (reg.test(registerPas)) {
      // 字符串符合规则
    } else {
      // 字符串不符合规则
      alert("密码不符合标准,请输入长度为4到16位且不包含-的特殊字符");
      registerPas = "";
      sum++;
    }
    //确认密码
    if (confirmPas == "") {
      Pas[1].placeholder = "请输入密码";
      Pas[1].classList.add("warning");
      sum++;
    }
    var reg = /^[^-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{4,16}$/;
    if (reg.test(confirmPas)) {
      // 字符串符合规则
    } else {
      // 字符串不符合规则
      alert("确认密码不符合标准,请输入长度为4到16位且不包含-的特殊字符");
      confirmPas = "";
      sum++;
    }
    //手机判断
    // newphone = Phone.value;
    // if (newphone == "") {
    //   Phone.placeholder = "请输入正确的手机号";
    //   Phone.classList.add("warning");
    //   sum++;
    // }
    // var reg =
    //   /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
    // if (reg.test(newphone)) {
    //   // 字符串符合规则
    // } else {
    //   // 字符串不符合规则
    //   alert("请输入正确的手机号");
    //   newphone = "";
    //   sum++;
    // }
    //判断确认密码 存入本地
    if (registerPas == confirmPas) {
      //获取本地数据
      var user = localStorage.user;
      let id = localStorage.id;
      if(id==''||id==undefined){
        id='1';
      }else{
        id=parseInt(id)+1
      }
      localStorage.id=id
      //数据加密
      // registerPas=hex_md5(registerPas)
      //获得性别
      var sex = sexs.value;
      //获取唯一id
      //拼接数据
      // var newuser = id+'-'+registerId + "-" + registerPas + "-" + newphone+'-'+sex+'-'+age+'-'+time();
     let json={
        id:id,
        user:registerId,
          password:registerPas,
      }
      $.ajax({
        type: "post",
        url: "api/logo",
        data: JSON.stringify(json),
        dataType: "JSON",
        success: function (response) {
        const result = confirm("注册成功是否登录");
          if (result) {
                // 用户点击了确认按钮
                // 执行相应的操作
                mask.style.left = "295px";
                maskBottom.style.zIndex = -1;
                Id.value='';
                Pas[0].value = "";
                Pas[1].value = "";
                Phone.value='';
              } else {
                // 用户点击了取消按钮
                // 取消操作
                window.location.reload();
              }
        if(response==false){
          alert('账号已经被注册')
          Id.value='';
          Pas[0].value = "";
          Pas[1].value = "";
          Phone.value='';
        }
        }
      });
      //判断本地数据是否为空
      // if (user == undefined || user == "") {
      //   if(Id.value==''|| Pas[0].value == "" ||Pas[1].value == ""||Phone.value==''){
      //     alert('请输入对应的信息')
      //     return
      //   }
      //   localStorage.user = JSON.stringify([json]);
      //   const result = confirm("注册成功是否登录");
      //   if (result) {
      //     // 用户点击了确认按钮
      //     // 执行相应的操作
      //     mask.style.left = "295px";
      //     maskBottom.style.zIndex = -1;
      //     Id.value='';
      //     Pas[0].value = "";
      //     Pas[1].value = "";
      //     Phone.value='';
      //   } else {
      //     // 用户点击了取消按钮
      //     // 取消操作
      //     window.location.reload();
      //   }
      //   return
      // }
      //不为空
      //遍历本地数据进行比较
      // userarr=user.split(',');
      // for(var i = 0 ; i < userarr.length ; i++){
      //   //再次分割比较
      //   user=userarr[i].split('-');
      //   if(registerId==user[0]){
      //     alert('账号已经被注册');
      //     Id.value='';
      //     Pas[0].value = "";
      //     Pas[1].value = "";
      //     Phone.value='';
      //     return false
      //   }else{
      //     if(Id.value==''|| Pas[0].value == "" ||Pas[1].value == ""||Phone.value==''){
      //       alert('请输入对应的信息')
      //       return
      //     }
      //     console.log(userarr);
      //     userarr.push(JSON.stringify(json));
      //     console.log(userarr);
      //     // localStorage.user=userarr
      //     const result = confirm("注册成功是否登录");
      //     if (result) {
      //       // 用户点击了确认按钮
      //       // 执行相应的操作
      //       mask.style.left = "295px";
      //       maskBottom.style.zIndex = -1;
      //       Id.value='';
      //       Pas[0].value = "";
      //       Pas[1].value = "";
      //       Phone.value='';
      //     } else {
      //       // 用户点击了取消按钮
      //       // 取消操作
      //       window.location.reload();
      //     }
      //   }
      //   return
      // }
    } else {
      alert("两次密码不同请重新输入");
      Pas[0].value = "";
      Pas[1].value = "";
      sum++;
    }
    //正则标记判断
    if(sum>=1){
      return false
    }else{
      return true
    }
})
$(()=>{
  //强制登录以及免密登录
  $.ajax({
    type: "post",
    url: "api/cookie",
    dataType: "JSON",
    data: JSON.stringify(),
    success: function (response) {
        if(response){
            window.location.href="index.html"
        }
    }
});
})