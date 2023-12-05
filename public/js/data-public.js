//列表点击事件
let lif = document.querySelectorAll(".bottom >ul>li ");
let ulz = document.querySelectorAll(".bottom >ul  ul");
let liz = document.querySelectorAll(".bottom >ul  ul> li");
//给i遍历添加点击事件
let bol = false
for (let i = 0; i < lif.length; i++) {
  
  lif[i].addEventListener("click", function () {
    if (i == 1) {
      if(bol==false){
        ulz[0].style.display="block";
        bol=true
      }else{
        ulz[0].style.display="none";
        bol=false
      }
    }
    if (i == 2) {
      if(bol==false){
        ulz[1].style.display="block";
        bol=true
      }else{
        ulz[1].style.display="none";
        bol=false
      }
    }
    if (i == 3) {
      if(bol==false){
        ulz[2].style.display="block";
        bol=true
      }else{
        ulz[2].style.display="none";
        bol=false
      }
    }
    if (i == 4) {
      window.location.href = "login.html";
    }
  });
}
//给ul遍历添加点击事件
for (let i = 0; i < liz.length; i++) {
  liz[i].addEventListener("click", function () {
    if (i == 0) {
      window.location.href = "data-index.html";
    }
    if (i == 1) {
      window.location.href ="indexOur-data.html";
    }
    if (i == 2) {
      window.location.href ="indexHotSelling-data.html";
    }
    if (i == 3) {
      window.location.href ="indexHotSellingR-data.html";
    }
    if (i == 4) {
      window.location.href ="bglist-dataT.html";
    }
    if (i == 5) {
      window.location.href ="bglist-dataC.html";
    }
    if (i == 6) {
      window.location.href ="bglist-dataB.html";
    }
    if (i == 7) {
      window.location.href ="friendlink-data.html";
    }
    if (i == 8) {
      window.location.href ="allProductsShop-data.html";
    }
    if (i == 9) {
      window.location.href ="dynamic-data.html";
    }
  });
}
//新增版块
var button = document.querySelector("#add");
button.addEventListener("click", function () {
  document.querySelector(" .mask").style.display = "block";
});
var cancelBom = document.querySelector(
  ".mask .addwin  button:nth-of-type(1)"
);
var cancel = document.querySelector(".mask .addwin .right ");
// cancel.addEventListener("click", function () {
//   document.querySelector(".mask").style.display = "none";
// });
cancelBom.addEventListener("click", function () {
  document.querySelector(".mask").style.display = "none";
});
// //修改版块
// var button = document.querySelector("#modifys");
// button.addEventListener("click", function () {
//   document.querySelector(" .maskTwo").style.display = "block";
// });
var cancelBom = document.querySelector(
  ".maskTwo .addwin  button:nth-of-type(1)"
);
// var cancel = document.querySelector(".maskTwo .addwin .right ");
// cancel.addEventListener("click", function () {
//   document.querySelector(".maskTwo").style.display = "none";
// });
// cancelBom.addEventListener("click", function () {
//   document.querySelector(".maskTwo").style.display = "none";
// });
//登录显示
//获取标签
let user =  document.getElementById('user');
//获取本地临时数据
let tump = localStorage.tump
if(tump==''||tump==undefined){
  user.innerText=''
}else{
  user.innerText=tump
}