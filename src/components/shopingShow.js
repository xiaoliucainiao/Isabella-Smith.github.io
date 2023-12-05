//前端
// 获取回显区域
window.onload = () => {
   /** //强制登录以及免密登录
    $.ajax({
      type: "post",
      url: "api/cookie",
      dataType: "JSON",
      data: JSON.stringify(),
      success: function (response) {
          if(response==false){
              alert('请登录')
              window.location.href="login.html"
          }
      }
  });*/
  let tbody = document.querySelector("tbody");
  $.ajax({
    type: "post",
    url: "api/sho",
    dataType: "json",
    success: function (e) {
      if (e == false) {
        tbody.innerHTML = `
            <tr>
            <td colspan=7'>暂无数据</td>
            </tr>
            `;
        return;
      }
      for (let i = 0; i < e.length; i++) {
        tbody.innerHTML += `
                <tr>
                <td><input type="checkbox" value="${e[i].id}"></td>
                <td><img src = '../../public/images/picture/${e[i].img}'></td>
                <td>${e[i].name}</td>
                <td class="money">${e[i].money}</td>
                <td>
                <button class='reduce'>-</button>
                <input typle="text" value="1" disabled class="val"/>
                <button class='add'>+</button>
                </td>
                <td class="subtotal">${e[i].money}</td>
                <td onclick='dele(${e[i].id})' style="color:red; cursor: pointer;">删除</td>
                </tr>
                `;
      }
      batch();
      function batch() {
        let check = document.getElementById("check");
        //获得多选
        let checkall = document.querySelectorAll(
          'tbody input[type="checkbox"]'
        );
        check.addEventListener("click", function () {
          for (let i = 0; i < checkall.length; i++) {
            checkall[i].checked = this.checked;
          }
        });
        //多选添加点击事件
        for (let i = 0; i < checkall.length; i++) {
          //添加点击事件
          checkall[i].addEventListener("click", function () {
            //判断多选个数
            let sum = 0; //标记数据
            for (let j = 0; j < checkall.length; j++) {
              if (checkall[j].checked == true) {
                sum++;
              }
            }
            if (sum == checkall.length) {
              check.checked = true;
            } else {
              check.checked = false;
            }
          });
        }
        //批量删除
        let dele = document.getElementById("dele"); //获得删除
        dele.addEventListener("click", function () {
          let arr = []; //存储id
          //遍历选框
          for (let i = 0; i < checkall.length; i++) {
            if (checkall[i].checked == true) {
              arr.push(checkall[i].value);
            }
          }
          if (arr == "") {
            return;
          }
          $.ajax({
            type: "post",
            url: "/api/deleAfter",
            data: JSON.stringify(arr) ,
            dataType: "json",
            success: function () {
              alert("删除成功");
              window.location.reload();
            },
          });
        });
      }




      //购物车
      $(".add").click(function () {
        let value = $(this).siblings(".val").val();
        value++;
        $(this).siblings(".val").val(value);
        let money = $(this).parent().siblings(".money").html();
        $(this)
          .parent()
          .siblings(".subtotal")
          .html(money * value);
        sum();
      });
      $(".reduce").click(function () {
        let value = $(this).siblings(".val").val();
        if (value == 1) {
          return;
        }
        value--;
        $(this).siblings(".val").val(value);
        let money = $(this).parent().siblings(".money").html();
        $(this)
          .parent()
          .siblings(".subtotal")
          .html(money * value);
        sum();
      });
      sum();
      function sum() {
        let money = 0;
        let piece = 0;
        $(".val").each(function (i, e) {
          $(".num").text(i);
          piece += parseInt($(e).val());
        });
        $(".num").text(piece);
        $(".subtotal").each(function (i, e) {
          money += parseInt($(e).text());
        });
        $(".number").text(money);
      }
      //获取input的value值
      //    let input= document.querySelector('table input');
      //    let add= input.nextSibling;
      //    console.log(input)
      //    console.log(add);
      //    add.onclick=function(){
      //     alert(123)
      //    }
    },
  });
};
function dele(e) {
  $.ajax({
    type: "post",
    url: "api/de",
    data: JSON.stringify(e),
    dataType: "json",
    success: function () {
      alert("删除成功");
      window.location.reload();
    },
  });
}
//查询
look();
function look() {
  let tbody = document.querySelector("tbody");
  //查找页面
  //获取按钮
  let query = document.querySelector(".shop button");
  //获得输入框
  let neirong = document.querySelector(".shop input");
  //添加点击事件
  query.addEventListener("click", function () {
    $.ajax({
      type: "post",
      url: "/api/lookFor",
      data: JSON.stringify(neirong.value),
      dataType: "json",
      success: function (bol) {
        if (bol == 1) {
          alert("请输入查询内容");
          return;
        } else if (bol == 2) {
          alert("查无果");
          return;
        }
        // let i = bol[1];
        let data = bol[0];
        //回显
        tbody.innerHTML = `
        <tr>
        <td><input type="checkbox" value=${data.id}"></td>
        <td><img src = '../../public/images/picture/${data.img}'></td>
        <td>${data.name}</td>
        <td class="money">${data.money}</td>
        <td>
        <button class='reduce'>-</button>
        <input typle="text" value="1" disabled class="val"/>
        <button class='add'>+</button>
        </td>
        <td class="subtotal">${data.money}</td>
        <td onclick='dele(${data.id})' style="color:red; cursor: pointer;">删除</td>
        </tr>
         `;
        // batch();
      },
    });
  });
}
